#!/usr/bin/env node
/* =========================================================
   LIMPIAR NOMBRES - FERRETERÍA HIMECON
   ---------------------------------------------------------
   Uso:
     node limpiar-nombres.js productos-data.js productos-data.limpio.js
     node limpiar-nombres.js productos-data.js productos-data.limpio.js --borrar-dudosos

   Qué hace:
   1. Corrige SOLO el campo "nombre" (abreviaturas, ortografía, tildes,
      mayúsculas, fracciones de galón, comillas de pulgadas, etc.).
   2. Elimina productos con nombres basura (vacíos, "Excluido", "5%",
      códigos raros como "Pines Tpa 10", una sola palabra suelta, etc.).
   3. Elimina duplicados exactos (mismo nombre + categoría + subcategoría).
   4. Corrige los filtros (subcategoriasPorCategoria): textos bien escritos,
      une duplicados mal escritos (draiwal/draywall...), ordena A-Z y
      quita filtros que quedaron sin productos.
   5. Genera reporte-limpieza.txt con todo lo eliminado y lo dudoso.

   NO toca: precio, imagen, descripcion, categoria, tipo.
   ========================================================= */

const fs = require('fs');
const vm = require('vm');

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const BORRAR_DUDOSOS = process.argv.includes('--borrar-dudosos');
const entrada = args[0] || 'productos-data.js';
const salida = args[1] || 'productos-data.limpio.js';

/* ---------- 1. Cargar el archivo original ---------- */
const src = fs.readFileSync(entrada, 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  src + '\n;globalThis.__p = productos; globalThis.__s = subcategoriasPorCategoria;',
  ctx
);
const productosOrig = ctx.__p;
const subcatsOrig = ctx.__s;
const idx = src.indexOf('const productos');
const encabezado = idx > 0 ? src.slice(0, idx) : '';

/* ---------- 2. Diccionarios ---------- */

// Palabra abreviada / mal escrita (minúscula, sin tilde) -> forma correcta
const MAPA = {
  // abreviaturas
  adap: 'Adaptador', adapt: 'Adaptador', abraz: 'Abrazadera', mang: 'Manguera', mangr: 'Manguera',
  mangu: 'Manguera', mangura: 'Manguera', hemb: 'Hembra', mach: 'Macho', cond: 'Conduit',
  inter: 'Interruptor', interr: 'Interruptor', bomb: 'Bombillo', bombill: 'Bombillo', lamp: 'Lámpara',
  econ: 'Económico', ecn: 'Económico', eco: 'Económico', econom: 'Económico', economico: 'Económico',
  fn: 'Fino', pq: 'Pequeño', peq: 'Pequeño', gr: 'Grande', grd: 'Grande',
  sanit: 'Sanitario', sant: 'Sanitario', san: 'Sanitario',
  lavp: 'Lavaplatos', lavpl: 'Lavaplatos', lavplat: 'Lavaplatos', lavapl: 'Lavaplatos',
  lavap: 'Lavaplatos', lavaplat: 'Lavaplatos', lavplm: 'Lavaplatos', lavaplm: 'Lavaplatos',
  lavam: 'Lavamanos', lavamn: 'Lavamanos', lavm: 'Lavamanos', lavamanos: 'Lavamanos',
  grv: 'Grival', grc: 'Gricol', boch: 'Bocherini', bocher: 'Bocherini', bocheri: 'Bocherini',
  bocherine: 'Bocherini', bocch: 'Bocherini', bocc: 'Bocherini', bochr: 'Bocherini',
  ng: 'Negro', ngr: 'Negro', ngra: 'Negra', bl: 'Blanco', bln: 'Blanco', bla: 'Blanco', blan: 'Blanco',
  bg: 'Beige', dord: 'Dorado', dor: 'Dorado', dord2: 'Dorado',
  anolk: 'Anolok', anolok: 'Anolok', nolk: 'Anolok', analok: 'Anolok',
  crom: 'Cromado', croma: 'Cromada', cromada: 'Cromada', alumn: 'Aluminio', alumno: 'Aluminio',
  alumino: 'Aluminio', alumnio: 'Aluminio', alum: 'Aluminio',
  plast: 'Plástico', plas: 'Plástico', cal: 'Calibre',
  mt: 'Mts', mts: 'Mts', lt: 'Lts', lts: 'Lts', kl: 'Kg', kls: 'Kg', kilo: 'Kg', gl: 'Galón',
  btlla: 'Botella', btll: 'Botella', bot: 'Botella', botell: 'Botella', bto: 'Bulto', blsa: 'Bolsa',
  und: 'Unidad', unid: 'Unidad', pz: 'Piezas', pzas: 'Piezas', pzs: 'Piezas', pcs: 'Piezas', pz: 'Piezas',
  univ: 'Universal', univer: 'Universal', met: 'Metálico', mad: 'Madera', mader: 'Madera', meder: 'Madera',
  pres: 'Presión', tp: 'Tipo', tel: 'Teléfono', telef: 'Teléfono',
  elect: 'Eléctrico', electr: 'Eléctrico', elec: 'Eléctrico', electri: 'Eléctrico',
  cer: 'Cerca', cerc: 'Cerca', term: 'Terminal', trans: 'Transparente', transp: 'Transparente',
  transpar: 'Transparente', transparaente: 'Transparente', transparente: 'Transparente',
  sencill: 'Sencillo', senc: 'Sencillo', sen: 'Sencillo', secillo: 'Sencillo', dobl: 'Doble',
  cuadr: 'Cuadrado', cuadrara: 'Cuadrada', comput: 'Computador', perf: 'Perforante',
  aisl: 'Aislante', prof: 'Profesional', inc: 'Incrustar', incrust: 'Incrustar', incr: 'Incrustar',
  mezc: 'Mezclador', mezcl: 'Mezclador', mezcla: 'Mezclador', brek: 'Breaker', breker: 'Breaker',
  brecker: 'Breaker', minibreker: 'Minibreaker', minibrecker: 'Minibreaker', swiche: 'Suiche',
  sweiche: 'Suiche', suiche: 'Suiche', pluk: 'Plug', spliter: 'Splitter', veteadopr: 'Veteador',
  fimugadora: 'Fumigadora', regualdor: 'Regulador', rodachin: 'Rodachina', rdachina: 'Rodachina',
  portacndado: 'Portacandado', refelctor: 'Reflector', asperor: 'Aspersor', filtor: 'Filtro',
  extencion: 'Extensión', exten: 'Extensión', excualizable: 'Ecualizable', lasser: 'Láser',
  alogeno: 'Halógeno', inmunisante: 'Inmunizante', eletricista: 'Electricista',
  senaizacion: 'Señalización', senalizacion: 'Señalización', interperie: 'Intemperie',
  intemper: 'Intemperie', interperi: 'Intemperie', cuñt: 'Cuñete', cuñet: 'Cuñete', cunete: 'Cuñete',
  cuñete: 'Cuñete', sifo: 'Sifón', sifon: 'Sifón', galon: 'Galón', galones: 'Galones',
  unin: 'Unión', lleve: 'Llave', tetero: 'Tetero', brillo: 'Brillo', cañamo: 'Cáñamo', canamo: 'Cáñamo',
  guadana: 'Guadaña', cañeria: 'Cañería', caneria: 'Cañería', cañabrava: 'Cañabrava',
  reforz: 'Reforzado', ant: 'Antiguo', inox: 'Inoxidable', comp: 'Completo', compl: 'Completo',
  galv: 'Galvanizado', cpvc: 'CPVC', pvc: 'PVC', upvc: 'UPVC', led: 'LED', mdf: 'MDF',
  gral: 'General', conm: 'Conmutable', conmt: 'Conmutable', incl: 'Incluido',
  // tildes (palabra sin tilde -> con tilde)
  lamina: 'Lámina', laminas: 'Láminas', valvula: 'Válvula', presion: 'Presión', electrico: 'Eléctrico',
  electrica: 'Eléctrica', electronica: 'Electrónica', electronico: 'Electrónico', ceramica: 'Cerámica',
  ceramico: 'Cerámico', griferia: 'Grifería', plastico: 'Plástico', plastica: 'Plástica',
  metalico: 'Metálico', metalica: 'Metálica', mecanico: 'Mecánico', telefono: 'Teléfono',
  bateria: 'Batería', lampara: 'Lámpara', union: 'Unión', tapon: 'Tapón', barreton: 'Barretón',
  aleman: 'Alemán', ducha: 'Ducha', conexion: 'Conexión', tuberia: 'Tubería', tuberias: 'Tuberías',
  nitrico: 'Nítrico', oxalico: 'Oxálico', acido: 'Ácido', alquitran: 'Alquitrán', estaño: 'Estaño',
  bañ: 'Baño', baño: 'Baño', señorita: 'Señorita', diamantado: 'Diamantado', caucho: 'Caucho',
  hidraulico: 'Hidráulico', hidraulica: 'Hidráulica', automatico: 'Automático', automatica: 'Automática',
  magnetico: 'Magnético', magnetica: 'Magnética', acrilico: 'Acrílico', acrilica: 'Acrílica',
  especial: 'Especial', aluminio: 'Aluminio', unidad: 'Unidad', polietileno: 'Polietileno',
  microfibra: 'Microfibra', carton: 'Cartón', camara: 'Cámara', digital: 'Digital',
  maquina: 'Máquina', tension: 'Tensión', proteccion: 'Protección', ventilacion: 'Ventilación',
  inalambrico: 'Inalámbrico', inalambrica: 'Inalámbrica', inalambr: 'Inalámbrico',
  reflectivo: 'Reflectivo', ajustable: 'Ajustable', protector: 'Protector', bronce: 'Bronce',
  cobre: 'Cobre', fibra: 'Fibra', cañon: 'Cañón', torpedo: 'Torpedo', dicroico: 'Dicroico',
  mercurio: 'Mercurio', sodio: 'Sodio', multiusos: 'Multiusos', espana: 'España', española: 'Española',
  espanola: 'Española', teleducha: 'Teleducha', lavadero: 'Lavadero', tubular: 'Tubular',
  cabeza: 'Cabeza', rapido: 'Rápido', rapida: 'Rápida', pequeña: 'Pequeña', pequena: 'Pequeña',
  maquinas: 'Máquinas', jardin: 'Jardín', pañete: 'Pañete', panete: 'Pañete', cuña: 'Cuña',
  fuente: 'Fuente', salida: 'Salida', entrada: 'Entrada', mediano: 'Mediano', pesado: 'Pesado',
  profesional: 'Profesional', reparacion: 'Reparación', reduccion: 'Reducción', limpieza: 'Limpieza',
  prueva: 'Prueba', señalizacion: 'Señalización', explosion: 'Explosión', seguridad: 'Seguridad',
  fijacion: 'Fijación', expansion: 'Expansión', expansivo: 'Expansivo', pasador: 'Pasador',
  cerradura: 'Cerradura', mecanica: 'Mecánica', garaje: 'Garaje', gaveta: 'Gaveta',
  estacion: 'Estación', iluminacion: 'Iluminación', conduccion: 'Conducción', conductor: 'Conductor',
  detector: 'Detector', sensor: 'Sensor', temporizador: 'Temporizador', transformador: 'Transformador',
  portatil: 'Portátil', carton2: 'Cartón', cañeria2: 'Cañería', galvanizado: 'Galvanizado',
  ladrillo: 'Ladrillo', calibrador: 'Calibrador', tornillo: 'Tornillo',
};

// Frases (se aplican antes que las palabras sueltas)
const FRASES = [
  [/^torn hex\b/i, 'Tornillo Hexagonal'],
  [/^tor hex\b/i, 'Tornillo Hexagonal'],
  [/^torn carrj\b/i, 'Tornillo Carruaje'],
  [/^torn brist\b/i, 'Tornillo Bristol'],
  [/^torn estf\b/i, 'Tornillo Estufa'],
  [/^torn neopr\w*/i, 'Tornillo Neopreno'],
  [/^tornillo neupreno\b/i, 'Tornillo Neopreno'],
  [/^torn niv\b/i, 'Tornillo Nivelador'],
  [/^torn nivelador\b/i, 'Tornillo Nivelador'],
  [/^torn estr\b/i, 'Tornillo Estructural'],
  [/^torn superb\b/i, 'Tornillo Superboard'],
  [/^torn panel\b/i, 'Tornillo Panel'],
  [/^torn autop\w* c plana\b/i, 'Tornillo Autoperforante Cabeza Plana'],
  [/^torn autp c plana\b/i, 'Tornillo Autoperforante Cabeza Plana'],
  [/^torn autopr c plana\b/i, 'Tornillo Autoperforante Cabeza Plana'],
  [/^torn autop\w* c p\b/i, 'Tornillo Autoperforante Cabeza Plana'],
  [/^torn autop\w*/i, 'Tornillo Autoperforante'],
  [/^torn cabeza plana p broca\b/i, 'Tornillo Cabeza Plana para Broca'],
  [/^torn\b/i, 'Tornillo'],
  [/^gols lamn?\b/i, 'Tornillo Golosa para Lámina'],
  [/^dra[iy]wa?l+\b/i, 'Tornillo Drywall'],
  [/^pasta pulidora\b/i, 'Pasta Pulidora'],
  [/^lamina cr\b/i, 'Lámina Cold Rolled'],
  [/^lamina gal\b/i, 'Lámina Galvanizada'],
  [/^lamina ballesta\b/i, 'Lámina Ballesta'],
  [/^electr (?=\d)/i, 'Electrodo '],
  [/^electr acero\b/i, 'Electrodo Acero'],
  [/^elect niquel\b/i, 'Electrodo Níquel'],
  [/^caja brek\b/i, 'Caja Breaker'],
  [/^caja d herramienta\b/i, 'Caja de Herramientas'],
  [/^caja de herramienta\b/i, 'Caja de Herramientas'],
  [/\bs p\b/gi, 'sin Placa'],
  [/\bc p\b/gi, 'con Placa'],
  [/\bs ades\b/gi, 'sin Adhesivo'],
  [/\bc ades\b/gi, 'con Adhesivo'],
  [/\bc ad\b/gi, 'con Adhesivo'],
  [/\bs ads\b/gi, 'sin Adhesivo'],
  [/\bs adesh\b/gi, 'sin Adhesivo'],
  [/\bc adesh\b/gi, 'con Adhesivo'],
  [/\bc r\b/gi, 'con Registro'],
  [/\bc amz\b/gi, 'Amazonas'],
  [/\bcerca electrico\b/gi, 'Cerca Eléctrica'],
  [/\bc electrica\b/gi, 'Cerca Eléctrica'],
  [/\bdewal\b/gi, 'DeWalt'], [/\bdewalt\b/gi, 'DeWalt'], [/\bdw\b/gi, 'DeWalt'],
  [/\btroper\b/gi, 'Truper'], [/\btrooper\b/gi, 'Truper'], [/\btrupper\b/gi, 'Truper'],
  [/\bstamley\b/gi, 'Stanley'], [/\bsegueta\b/gi, 'Segueta'], [/\bhopex\b/gi, 'Hopex'],
];

const MAYUSCULAS = new Set(['pvc', 'cpvc', 'upvc', 'led', 'mdf', 'uv', 'tdt', 'hdmi', 'usb', 'utp', 'rj', 'rg',
  'gfci', 'sds', 'npt', 'tv', 'lcd', 'ph', 'dc', 'ac', 'pp', 'wpc', 'hp', 'psi', 'rgb', 'hd', 'abs']);
const MINUSCULAS = new Set(['de', 'del', 'y', 'con', 'para', 'en', 'a', 'sin', 'x', 'la', 'el', 'por', 'o']);
const UNIDADES_MIN = new Set(['mm', 'cm', 'ml', 'lb', 'kg', 'gr', 'grm']);

/* ---------- 3. Función que limpia un nombre ---------- */
function limpiarNombre(nombre, categoria) {
  let s = String(nombre || '').replace(/\s+/g, ' ').trim();
  if (!s) return '';

  // Comillas de pulgada: 1" -> 1 Pulg
  s = s.replace(/(\d(?:\s?\d)?(?:\/\d+)?)\s*["”“]\s*/g, '$1 Pulg ');
  s = s.replace(/["”“]/g, ' ');

  // "T ,2" / "t,1" -> Tipo 2 / Tipo 1
  s = s.replace(/\bT\s?,\s?(\d)\b/gi, 'Tipo $1');
  // "g2---g5" -> Grado 2 y Grado 5
  s = s.replace(/\bg(\d)\b/gi, 'Grado $1');
  // rangos con guiones dobles -> " y "
  s = s.replace(/\s*-{2,}\s*/g, ' y ');
  // 1-1/2 -> 1 1/2
  s = s.replace(/(\d)\s*-\s*(\d\/\d)/g, '$1 $2');
  // typo: 1/28 galón es 1/128
  s = s.replace(/\b1\/28\b/g, '1/128');

  // Separar abreviaturas con / o . entre letras: torn/hex -> torn hex
  for (let i = 0; i < 3; i++) s = s.replace(/([A-Za-zñÑáéíóú])[\/.]([A-Za-zñÑáéíóú])/g, '$1 $2');

  // separar número de letras pegadas: "10mts" -> "10 mts" (después de la x)
  s = s.replace(/(\d)\s*[xX]\s*(?=\d)/g, '$1 x ');
  s = s.replace(/(\d)([A-Za-zñÑ]{1,})\b/g, '$1 $2');
  s = s.replace(/(\d)\s*(?:gal)\b/gi, '$1 Galón');
  s = s.replace(/\s+/g, ' ').trim();

  // Frases
  for (const [re, rep] of FRASES) s = s.replace(re, rep);

  // Palabras sueltas
  s = s.replace(/[A-Za-zÁÉÍÓÚÑáéíóúñü]+/g, (w) => {
    const l = w.toLowerCase();
    if (l === 'cal' && categoria === 'cemento') return 'Cal';
    if (l === 'gal') return 'Galvanizado';
    if (l === 'ec' || l === 'dicol') return w; // se revisa abajo
    const m = MAPA[l];
    return m !== undefined ? m : w;
  });

  // Fracciones de galón (pintura y similares)
  const esPintura = categoria === 'pintura' ||
    /^(Soldadura|Limpiador|Pegaucho|Emulsion|Emulsión|Paternit)\b/i.test(s);
  if (esPintura) {
    s = s.replace(/\b1\/1\b/g, 'Galón').replace(/\b5\/1\b/g, '5 Galones');
    s = s.replace(/\b1\/(?:2|4|8|16|32|64|128)(?: y 1\/(?:2|4|8|16|32|64|128))*(?!\d)(?!\s*(?:de )?Gal)/g,
      (m) => m + ' de Galón');
  }

  // Mayúsculas / minúsculas
  s = s.replace(/[A-Za-zÁÉÍÓÚÑáéíóúñü]+/g, (w, off, full) => {
    const l = w.toLowerCase();
    const prev = full.slice(0, off);
    if (MAYUSCULAS.has(l)) return w.toUpperCase();
    if (off > 0 && MINUSCULAS.has(l)) return l;
    if (UNIDADES_MIN.has(l) && /\d\s*$/.test(prev)) return l;
    if ((l === 'w' || l === 'v') && /\d\s*$/.test(prev)) return l.toUpperCase();
    if (l === 'a' && /\d\s*$/.test(prev)) return 'A';
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });

  // Género básico
  s = s.replace(/\bCerca Eléctrico\b/g, 'Cerca Eléctrica')
       .replace(/\bPulg Pulg\b/g, 'Pulg')
       .replace(/\bAmazonas Amazonas\b/g, 'Amazonas');

  return s.replace(/\s+/g, ' ').replace(/\s+y\s*$/i, '').trim();
}

/* ---------- 4. Reglas para ELIMINAR productos ---------- */
const PALABRAS_SUELTAS_BASURA = new Set(['marketing', 'auto', 'barr', 'adap', 'adaptador', 'canast', 'mercancia',
  'mercancía', 'electrodomesticos', 'electrodomésticos', 'despador']);

function motivoEliminar(original, limpio) {
  if (!original || !original.trim()) return 'nombre vacío';
  if (limpio.length < 4) return 'nombre demasiado corto';
  if (/excluido/i.test(original)) return 'marcado como "Excluido"';
  if (/\b5%/.test(original)) return 'nombre con "5%" (no es un producto real)';
  if (/mercanc/i.test(original)) return 'nombre genérico "Mercancía"';
  if (/despador/i.test(original)) return 'nombre ininteligible';
  if (/^pines (tpa|ri|rs)\b/i.test(original)) return 'código raro ("Pines Tpa/Ri/Rs")';
  if (/^\w+$/.test(limpio.replace(/\s/g, '')) && !/\s/.test(limpio) &&
      PALABRAS_SUELTAS_BASURA.has(limpio.toLowerCase())) return 'palabra suelta sin significado de producto';
  return null;
}

const PERMITIDAS_CORTAS = new Set(['de', 'y', 'a', 'x', 'en', 'el', 'la', 'tv', 'ph', 'hp', 'w', 'v', 'cm', 'mm',
  'ml', 'kg', 'lb', 'pp', 'uv', 'rj', 'dc', 'ac', 'm', 'o', 'con', 'sin']);
const DUDOSAS = new Set(['lx', 'sp', 'ave', 'galica', 'induma', 'fl', 'ec', 'tpa', 'plp', 'rf', 'ro', 'nal',
  'dn', 'cent', 'mf', 'tgi', 'sata', 'idea', 'ideage', 'cpvc3']);

function esDudoso(limpio) {
  const palabras = limpio.match(/[A-Za-zñÑáéíóúÁÉÍÓÚ]+/g) || [];
  return palabras.some(p => {
    const l = p.toLowerCase();
    if (PERMITIDAS_CORTAS.has(l)) return false;
    if (DUDOSAS.has(l)) return true;
    return l.length <= 2;
  });
}

/* ---------- 5. Procesar productos ---------- */
const eliminados = [];
const dudosos = [];
const renombrados = [];
const vistos = new Set();
let duplicados = 0;
const sinCategoria = [];

// alias de subcategorías mal escritas -> valor correcto
const ALIAS_SUB = {
  draiwall: 'draiwal', draywal: 'draiwal', draywall: 'draiwal', inmunizante: 'inmunisante',
  tornneopr: 'tornneopreno', portacndado: 'portacandado', rdachina: 'rodachina', rodachin: 'rodachina',
  unin: 'union', lleve: 'llave', regualdor: 'regulador', sweiche: 'swiche', minibrecker: 'minibreker',
  clavijas: 'clavija', condufles: 'conduflex', asperor: 'aspersor', alumino: 'aluminio', sifo: 'sifon',
  filtor: 'filtro', adapt: 'adap', empaq: 'empaque', extension: 'extencion', refelctor: 'reflector',
  bombill: 'bombillo', bomb: 'bombillo', dilatac: 'dilatacion', angul: 'angulo', tor: 'tornhex',
  tapaboca: 'tapa', gafacareta: 'gafas', mezclavm: 'mezclavm', veteadopr: 'veteador',
  fimugadora: 'fumigadora', inmunizante2: 'inmunisante', mini: 'mini', mercancia: 'mercancia',
};

const resultado = [];
for (const p of productosOrig) {
  const original = p.nombre;
  if (!p.categoria) {
    sinCategoria.push(original);
    if (/pintura|acabado/i.test(p.descripcion || '')) p.categoria = 'pintura';
  }
  const limpio = limpiarNombre(original, p.categoria);
  const motivo = motivoEliminar(original, limpio);
  if (motivo) { eliminados.push(`${original || '(vacío)'}  →  ${motivo}`); continue; }

  if (esDudoso(limpio)) {
    dudosos.push(`${original}  →  ${limpio}`);
    if (BORRAR_DUDOSOS) { eliminados.push(`${original}  →  nombre dudoso (--borrar-dudosos)`); continue; }
  }

  const sub = p.subcategoria !== undefined ? (ALIAS_SUB[p.subcategoria] || p.subcategoria) : p.subcategoria;
  const clave = [limpio.toLowerCase(), p.categoria, sub, p.tipo || ''].join('|');
  if (vistos.has(clave)) { duplicados++; eliminados.push(`${original}  →  duplicado de "${limpio}"`); continue; }
  vistos.add(clave);

  if (limpio !== original.trim()) renombrados.push(`${original}  →  ${limpio}`);
  const nuevo = { ...p, nombre: limpio };
  if (p.subcategoria !== undefined) nuevo.subcategoria = sub;
  resultado.push(nuevo);
}

/* ---------- 6. Filtros (subcategorías) ---------- */
const TEXTO_FILTRO = {
  inter: 'Interruptores', abraz: 'Abrazaderas', alam: 'Alambres Encauchetados', alamencauc: 'Alambres Encauchetados',
  adap: 'Adaptadores', gall: 'Gallos', torn: 'Tornillos', tornhex: 'Tornillos Hexagonales',
  torncarrj: 'Tornillos Carruaje', tornbrist: 'Tornillos Bristol', tornestf: 'Tornillos Estufa',
  tornneopreno: 'Tornillos Neopreno', gols: 'Tornillos Golosa para Lámina', draiwal: 'Tornillos Drywall',
  tornillo: 'Tornillos', mang: 'Mangueras', mangpisc: 'Mangueras de Piscina', acopl: 'Acoples Macho',
  acople: 'Acoples', toma: 'Tomas', caja: 'Cajas', cable: 'Cables', bombillo: 'Bombillos',
  clavija: 'Clavijas', alambre: 'Alambres', capacitor: 'Capacitores', extencion: 'Extensiones',
  terminal: 'Terminales', tubo: 'Tubos', panel: 'Paneles', linterna: 'Linternas', canaleta: 'Canaletas',
  cinta: 'Cintas', tapa: 'Tapas', spliter: 'Splitters', swiche: 'Suiches', aislador: 'Aisladores',
  reflector: 'Reflectores', balasta: 'Balastos', cuchilla: 'Cuchillas', curva: 'Curvas', conector: 'Conectores',
  plafon: 'Plafones', tee: 'Tees', amarra: 'Amarras', timbre: 'Timbres', multitoma: 'Multitomas',
  probador: 'Probadores', driver: 'Drivers', breaker: 'Breakers', breakers: 'Breakers', minibreker: 'Minibreakers',
  minibreaker: 'Minibreakers', fusible: 'Fusibles', sonda: 'Sondas', pinza: 'Pinzas', bala: 'Balas',
  regulador: 'Reguladores', resorte: 'Resortes', resistencia: 'Resistencias', ducha: 'Duchas',
  gancho: 'Ganchos', cheque: 'Válvulas Cheque', valvula: 'Válvulas', llave: 'Llaves', rejilla: 'Rejillas',
  granada: 'Granadas', empaque: 'Empaques', sifon: 'Sifones', arbol: 'Árboles', regadera: 'Regaderas',
  torre: 'Torres', acople2: 'Acoples', registro: 'Registros', manija: 'Manijas', desague: 'Desagües',
  flanche: 'Flanches', flotador: 'Flotadores', pomo: 'Pomos', conj: 'Conjuntos', griferia: 'Grifería',
  tapon: 'Tapones', tornillo2: 'Tornillos', silicona: 'Siliconas', bebedero: 'Bebederos', manguera: 'Mangueras',
  filtro: 'Filtros', jabonera: 'Jaboneras', racor: 'Racores', toallero: 'Toalleros', barra: 'Barras',
  brazo: 'Brazos', buje: 'Bujes', canast: 'Canastillas', chupa: 'Chupas', juego: 'Juegos', broca: 'Brocas',
  copa: 'Copas', disco: 'Discos', escobilla: 'Escobillas', sierra: 'Sierras', guante: 'Guantes',
  espatula: 'Espátulas', pistola: 'Pistolas', lima: 'Limas', brocha: 'Brochas', destorn: 'Destornilladores',
  destornillador: 'Destornilladores', porra: 'Porras', machuelo: 'Machuelos', taladro: 'Taladros',
  corta: 'Cortadores', polea: 'Poleas', tijera: 'Tijeras', rodillo: 'Rodillos', nivel: 'Niveles',
  pulidora: 'Pulidoras', manila: 'Manilas', serrucho: 'Serruchos', punta: 'Puntas', martillo: 'Martillos',
  macho: 'Machos', cincel: 'Cinceles', careta: 'Caretas', compresor: 'Compresores', buril: 'Buriles',
  cadena: 'Cadenas', pala: 'Palas', llanta: 'Llantas', mandril: 'Mandriles', rodachina: 'Rodachinas',
  alicate: 'Alicates', segueta: 'Seguetas', cabo: 'Cabos', barreton: 'Barretones', prensa: 'Prensas',
  llana: 'Llanas', platacho: 'Plataches', soldador: 'Soldadores', hembra: 'Hembras', marco: 'Marcos',
  cautin: 'Cautines', cepillo: 'Cepillos', grata: 'Gratas', mosqueton: 'Mosquetones', rache: 'Ratchets',
  cruzeta: 'Cruzetas', pie: 'Pie Amigo', gozne: 'Goznes', hacha: 'Hachas', azadon: 'Azadones',
  guaya: 'Guayas', hidrolavadora: 'Hidrolavadoras', chazo: 'Chazos', formon: 'Formones', mango: 'Mangos',
  gato: 'Gatos', tensor: 'Tensores', palustre: 'Palustres', plomada: 'Plomadas', perro: 'Perros',
  grapadora: 'Grapadoras', lijadora: 'Lijadoras', tenaza: 'Tenazas', cizalla: 'Cizallas', escoba: 'Escobas',
  calibrador: 'Calibradores', escuadra: 'Escuadras', escalera: 'Escaleras', flexometro: 'Flexómetros',
  inserto: 'Insertos', union: 'Uniones', cloro: 'Cloros', teja: 'Tejas', ladrillo: 'Ladrillos',
  media: 'Media Luna', bloquelon: 'Bloquelón', bolsa: 'Bolsas', lamina: 'Láminas', laca: 'Lacas',
  pintura: 'Pinturas', esmalte: 'Esmaltes', masilla: 'Masillas', barniz: 'Barnices', vinilo: 'Vinilos',
  estuco: 'Estucos', aerosol: 'Aerosoles', sellador: 'Selladores', base: 'Bases', cromo: 'Cromos',
  catalizador: 'Catalizadores', anticorrosivo: 'Anticorrosivos', pasta: 'Pastas', pincel: 'Pinceles',
  lijas: 'Lijas', washprimer: 'Wash Primer', removedor: 'Removedores', vinilico: 'Vinílicos', thiner: 'Thinner',
  electr: 'Electrodos', electrodos: 'Electrodos', pegaucho: 'Pegaucho', paternit: 'Paternit',
  limpiador: 'Limpiadores', caballete: 'Caballetes', cortagoteras: 'Cortagoteras', sika: 'Sika',
  mdf: 'MDF', claraboya: 'Claraboyas', superboard: 'Superboard', niple: 'Niples', codo: 'Codos',
  semicodo: 'Semicodos', yee: 'Yees', universal: 'Universales', univer: 'Universales', tanque: 'Tanques',
  cepillo2: 'Cepillos', acido: 'Ácidos', carro: 'Carros', nasa: 'Nasas', sulfato: 'Sulfatos',
  angulo: 'Ángulos', angulanolok: 'Ángulos Anolok', alumino: 'Aluminio', aluminio: 'Aluminio',
  piragua: 'Piraguas', platina: 'Platinas', dilatacion: 'Dilatación', dilatacbronc: 'Dilatación Bronce',
  margarita: 'Margaritas', canal: 'Canales', wing: 'Wing', machacas: 'Machacas', soporte: 'Soportes',
  argolla: 'Argollas', protector: 'Protectores', inmunisante: 'Inmunizantes', cuarton: 'Cuartones',
  liston: 'Listones', vigueta: 'Viguetas', vareta: 'Varetas', tabla: 'Tablas', pilar: 'Pilares',
  viga: 'Vigas', malla: 'Mallas', angeo: 'Angeos', plastico: 'Plásticos', polisombra: 'Polisombra',
  tela: 'Telas', sierracopa: 'Sierracopas', ceramica: 'Cerámica', combo: 'Combos', porcelanato: 'Porcelanato',
  sanitario: 'Sanitarios', cenefa: 'Cenefas', lavamanos: 'Lavamanos', lavaplatos: 'Lavaplatos',
  chapa: 'Chapas', bisagra: 'Bisagras', candado: 'Candados', riel: 'Rieles', pasador: 'Pasadores',
  portacandado: 'Portacandados', boca: 'Bocachapas', cancamo: 'Cáncamos', remache: 'Remaches',
  tiradera: 'Tiraderas', tope: 'Topes', aplicacion: 'Aplicaciones', balinera: 'Balineras',
  avellanador: 'Avellanadores', falleba: 'Fallebas', boton: 'Botones', cantonera: 'Cantoneras',
  tuerca: 'Tuercas', arandela: 'Arandelas', guaza: 'Guazas', pines: 'Pines', varilla: 'Varillas',
  tornillos: 'Tornillos',
};

function limpiarTextoFiltro(f) {
  if (TEXTO_FILTRO[f.valor]) return TEXTO_FILTRO[f.valor];
  return limpiarNombre(f.texto, '') || f.texto;
}

const cuenta = {};
for (const p of resultado) {
  const k = p.categoria + '|' + p.subcategoria;
  cuenta[k] = (cuenta[k] || 0) + 1;
}

const subcatsNuevas = {};
const filtrosQuitados = [];
const filtrosAgregados = [];
for (const [cat, lista] of Object.entries(subcatsOrig)) {
  const mapa = new Map();
  for (const f of lista) {
    const valor = ALIAS_SUB[f.valor] || f.valor;
    const copia = { ...f, valor };
    if (f.tipos) copia.tipos = f.tipos.map(t => ({ ...t, texto: limpiarNombre(t.texto, '') || t.texto }));
    if (!mapa.has(valor)) mapa.set(valor, copia);
    else if (copia.tipos && !mapa.get(valor).tipos) mapa.get(valor).tipos = copia.tipos;
  }
  // subcategorías que usan los productos y no existen en el filtro
  for (const p of resultado.filter(x => x.categoria === cat && x.subcategoria)) {
    if (!mapa.has(p.subcategoria)) {
      mapa.set(p.subcategoria, { valor: p.subcategoria, texto: p.subcategoria });
      filtrosAgregados.push(`${cat}: ${p.subcategoria}`);
    }
  }
  const final = [];
  for (const f of mapa.values()) {
    if (!cuenta[cat + '|' + f.valor] && !f.tipos) { filtrosQuitados.push(`${cat}: ${f.valor}`); continue; }
    final.push({ ...f, texto: limpiarTextoFiltro(f) });
  }
  final.sort((a, b) => a.texto.localeCompare(b.texto, 'es'));
  subcatsNuevas[cat] = final;
}

/* ---------- 7. Escribir resultados ---------- */
function objetoJS(p) {
  const orden = ['nombre', 'precio', 'imagen', 'descripcion', 'categoria', 'subcategoria', 'tipo'];
  const claves = [...orden.filter(k => k in p), ...Object.keys(p).filter(k => !orden.includes(k))];
  return '    {\n' + claves.map(k => `        ${k}: ${JSON.stringify(p[k])}`).join(',\n') + '\n    }';
}

const salidaJS =
  encabezado +
  'const productos = [\n' + resultado.map(objetoJS).join(',\n') + '\n];\n\n' +
  '/* Subcategorías (filtros) - texto corregido y ordenado A-Z */\n' +
  'const subcategoriasPorCategoria = ' + JSON.stringify(subcatsNuevas, null, 4) + ';\n';

fs.writeFileSync(salida, salidaJS, 'utf8');

const reporte = [
  `RESUMEN`,
  `Productos originales: ${productosOrig.length}`,
  `Productos finales:    ${resultado.length}`,
  `Eliminados:           ${eliminados.length} (de ellos ${duplicados} duplicados)`,
  `Nombres corregidos:   ${renombrados.length}`,
  `Nombres dudosos (revisar a mano): ${dudosos.length}${BORRAR_DUDOSOS ? ' (ya eliminados)' : ''}`,
  `Productos sin categoría: ${sinCategoria.length}${sinCategoria.length ? ' -> ' + sinCategoria.join(', ') : ''}`,
  `Filtros sin productos quitados: ${filtrosQuitados.length}`,
  `Filtros agregados por faltar: ${filtrosAgregados.length}`,
  '', '=== ELIMINADOS ===', ...eliminados,
  '', '=== NOMBRES DUDOSOS (todavía contienen siglas que no pude interpretar) ===', ...dudosos,
  '', '=== FILTROS QUITADOS ===', ...filtrosQuitados,
  '', '=== FILTROS AGREGADOS ===', ...filtrosAgregados,
  '', '=== CAMBIOS DE NOMBRE (antes → después) ===', ...renombrados,
].join('\n');
fs.writeFileSync('reporte-limpieza.txt', reporte, 'utf8');

console.log(reporte.split('\n').slice(0, 9).join('\n'));
console.log(`\nListo: ${salida} y reporte-limpieza.txt`);
