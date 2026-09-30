/* =========================================================
   FERRETERÍA HIMECON - FUNCIONAMIENTO DE LA PÁGINA
   ---------------------------------------------------------
   Aquí van: el número de WhatsApp, el horario de atención y
   toda la lógica (filtros, buscador, pedido, modo oscuro...).

   ⚠️ LOS PRODUCTOS YA NO ESTÁN AQUÍ: están en "productos-data.js".
   Para agregar o editar productos abre ESE archivo.
========================================================= */

const numeroWhatsApp = "573206150674"; // Número de la ferretería

// Tu página ya publicada (sin "/" al final). Se usa para armar el link de la foto en WhatsApp.
const urlSitio = "https://michaelbuitragogonzalez-cpu.github.io/FerreteriaHimecon/";

// Imagen que se muestra cuando un producto todavía no tiene foto
const imagenRespaldo = "img/sin-imagen.png";

// =====================================================================
// ⚠️ HORARIO DE ATENCIÓN — EDITA AQUÍ TUS HORAS REALES ⚠️
// (Los que hay ahora son de EJEMPLO.)
// Formato de 24 horas: ["07:00", "18:00"] = de 7:00 a. m. a 6:00 p. m.
// Si cierras al mediodía pon dos franjas: [["07:00","12:00"], ["14:00","18:00"]]
// Vacío [] = cerrado todo el día.  0 = domingo, 1 = lunes ... 6 = sábado.
// La hora se calcula siempre con la hora de Colombia (aunque el cliente esté en otro país).
// =====================================================================
const HORARIO_TIENDA = {
    0: [],                        // Domingo
    1: [["07:00", "18:00"]],      // Lunes
    2: [["07:00", "18:00"]],      // Martes
    3: [["07:00", "18:00"]],      // Miércoles
    4: [["07:00", "18:00"]],      // Jueves
    5: [["07:00", "18:00"]],      // Viernes
    6: [["07:00", "18:00"]]       // Sábado
};

// FESTIVOS O DÍAS ESPECIALES (opcional). Fecha "AAAA-MM-DD" y sus horas; [] = cerrado ese día.
// Ejemplos (quita las // para usarlos):
//   "2026-12-25": [],                        // Navidad: cerrado
//   "2026-12-24": [["07:00", "12:00"]],      // Nochebuena: solo hasta el mediodía
const HORARIO_ESPECIAL = {
};

/* =========================================================
   A PARTIR DE AQUÍ NO ES NECESARIO EDITAR NADA
========================================================= */

const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const subcategoriasContenedor = document.getElementById("subcategorias");
const subsubcategoriasContenedor = document.getElementById("subsubcategorias");

// ===== VISTA PREVIA DE IMAGEN (lightbox) =====
function abrirLightbox(rutaImagen, nombreProducto) {
    const caja = document.getElementById("lightbox-imagen");
    const img = document.getElementById("lightbox-imagen-img");
    if (!caja || !img) return;
    img.src = rutaImagen;
    img.alt = nombreProducto;
    caja.classList.add("lightbox-abierto");
}

function cerrarLightbox(e) {
    // Se cierra al tocar el fondo oscuro o el botón ✕, pero NO al tocar la imagen misma
    if (e && e.target && e.target.id === "lightbox-imagen-img") return;
    const caja = document.getElementById("lightbox-imagen");
    if (caja) caja.classList.remove("lightbox-abierto");
}

// ===== MODO OSCURO =====
function aplicarModoOscuro(activar) {
    document.body.classList.toggle("modo-oscuro", activar);
    const boton = document.getElementById("boton-modo-oscuro");
    if (boton) boton.textContent = activar ? "☀️" : "🌙";
}

function toggleModoOscuro() {
    const activar = !document.body.classList.contains("modo-oscuro");
    aplicarModoOscuro(activar);
    try {
        localStorage.setItem("himecon-modo-oscuro", activar ? "1" : "0");
    } catch (e) {}
}

(function inicializarModoOscuro() {
    let guardado = null;
    try {
        guardado = localStorage.getItem("himecon-modo-oscuro");
    } catch (e) {}
    if (guardado === "1") aplicarModoOscuro(true);
})();

// ===== CATEGORÍAS Y SUBCATEGORÍAS COLAPSABLES EN CELULAR =====
function toggleCategoriasExpandidas() {
    const cont = document.querySelector(".categorias");
    const boton = document.getElementById("boton-mas-categorias");
    if (!cont) return;
    const expandido = cont.classList.toggle("categorias-expandida");
    if (boton) boton.textContent = expandido ? "Ver menos categorías ▴" : "Ver más categorías ▾";
}

function toggleSubcategoriasExpandidas() {
    if (!subcategoriasContenedor) return;
    const boton = document.getElementById("boton-mas-subcategorias");
    const expandido = subcategoriasContenedor.classList.toggle("subcategorias-expandida");
    if (boton) boton.textContent = expandido ? "Ver menos ▴" : "Ver más ▾";
}

// Oculta el botón "Ver más" de subcategorías cuando la categoría elegida
// tiene pocas y no hace falta desplegar nada
function actualizarBotonMasSubcategorias() {
    const boton = document.getElementById("boton-mas-subcategorias");
    if (!boton || !subcategoriasContenedor) return;
    subcategoriasContenedor.classList.remove("subcategorias-expandida");
    boton.textContent = "Ver más ▾";
    // Si el contenido no desborda la altura colapsada, no tiene caso mostrar el botón
    boton.style.display = subcategoriasContenedor.scrollHeight > 150 ? "" : "none";
}

// ===== LISTA DE PEDIDO =====
// Permite al cliente marcar varios productos y mandarlos en UN SOLO mensaje de WhatsApp,
// en vez de escribir uno por uno. Se guarda en localStorage para que no se pierda
// si el cliente recarga la página o sigue viendo más productos.
let listaPedido = [];

function cargarPedidoGuardado() {
    try {
        const guardado = localStorage.getItem("himecon-pedido");
        listaPedido = guardado ? JSON.parse(guardado) : [];
    } catch (e) {
        listaPedido = [];
    }
}

function guardarPedido() {
    try {
        localStorage.setItem("himecon-pedido", JSON.stringify(listaPedido));
    } catch (e) {
        // Si el navegador bloquea localStorage, el pedido sigue funcionando
        // durante la sesión, solo no se recuerda al recargar.
    }
}

function estaEnElPedido(nombre) {
    return listaPedido.includes(nombre);
}

function toggleProductoEnPedido(nombre) {
    const idx = listaPedido.indexOf(nombre);
    if (idx === -1) {
        listaPedido.push(nombre);
    } else {
        listaPedido.splice(idx, 1);
    }
    guardarPedido();
    actualizarBotonPedido();
    renderizarPanelPedido();
    // Solo se actualizan los botones (no se redibuja toda la lista ni se pierde el scroll)
    sincronizarBotonesPedido();
}

function sincronizarBotonesPedido() {
    document.querySelectorAll(".boton-agregar-pedido[data-nombre]").forEach(function (btn) {
        const en = estaEnElPedido(btn.dataset.nombre);
        btn.classList.toggle("agregado", en);
        btn.textContent = en ? "✅ En el pedido" : "➕ Agregar al pedido";
    });
}

function quitarDelPedido(nombre) {
    toggleProductoEnPedido(nombre);
}

function vaciarPedido() {
    listaPedido = [];
    guardarPedido();
    actualizarBotonPedido();
    renderizarPanelPedido();
    sincronizarBotonesPedido();
}

function actualizarBotonPedido() {
    const boton = document.getElementById("boton-pedido");
    const contador = document.getElementById("contador-pedido");
    if (!boton || !contador) return;
    contador.textContent = listaPedido.length;
    boton.style.display = listaPedido.length > 0 ? "block" : "none";
}

function togglePanelPedido() {
    const panel = document.getElementById("panel-pedido");
    if (!panel) return;
    panel.classList.toggle("panel-pedido-abierto");
}

// ===== ARRASTRAR EL BOTÓN DEL PEDIDO =====
// El botón 🛒 se puede arrastrar a cualquier parte de la pantalla para que no estorbe,
// y recuerda dónde quedó (por navegador) para la próxima visita.
(function habilitarArrastreBotonPedido() {
    const boton = document.getElementById("boton-pedido");
    if (!boton) return;

    let arrastrando = false;
    let movido = false;
    let offsetX = 0;
    let offsetY = 0;

    function posicionarEn(x, y) {
        const ancho = boton.offsetWidth || 140;
        const alto = boton.offsetHeight || 50;
        // No dejar que se salga de la pantalla
        x = Math.max(4, Math.min(x, window.innerWidth - ancho - 4));
        y = Math.max(4, Math.min(y, window.innerHeight - alto - 4));
        boton.style.left = x + "px";
        boton.style.top = y + "px";
        boton.style.bottom = "auto";
        boton.style.right = "auto";
    }

    function guardarPosicion(x, y) {
        try {
            localStorage.setItem("himecon-pos-boton-pedido", JSON.stringify({ x, y }));
        } catch (e) {}
    }

    function restaurarPosicion() {
        let pos = null;
        try {
            pos = JSON.parse(localStorage.getItem("himecon-pos-boton-pedido"));
        } catch (e) {}
        if (pos && typeof pos.x === "number" && typeof pos.y === "number") {
            posicionarEn(pos.x, pos.y);
        }
    }

    function empezar(clientX, clientY) {
        arrastrando = true;
        movido = false;
        const rect = boton.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        boton.classList.add("arrastrando");
    }

    function mover(clientX, clientY) {
        if (!arrastrando) return;
        movido = true;
        posicionarEn(clientX - offsetX, clientY - offsetY);
    }

    function terminar() {
        if (!arrastrando) return;
        arrastrando = false;
        boton.classList.remove("arrastrando");
        if (movido) {
            const rect = boton.getBoundingClientRect();
            guardarPosicion(rect.left, rect.top);
        }
    }

    // Mouse (computador)
    boton.addEventListener("mousedown", e => {
        empezar(e.clientX, e.clientY);
    });
    document.addEventListener("mousemove", e => mover(e.clientX, e.clientY));
    document.addEventListener("mouseup", terminar);

    // Táctil (celular)
    boton.addEventListener("touchstart", e => {
        const t = e.touches[0];
        empezar(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchmove", e => {
        if (!arrastrando) return;
        const t = e.touches[0];
        mover(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchend", terminar);

    // Si hubo arrastre real, no se abre el panel; si fue un toque/clic simple, sí
    boton.addEventListener("click", () => {
        if (!movido) {
            togglePanelPedido();
        }
        movido = false;
    });

    restaurarPosicion();
})();

function renderizarPanelPedido() {
    const contenedorLista = document.getElementById("panel-pedido-lista");
    const botonEnviar = document.getElementById("boton-enviar-pedido");
    if (!contenedorLista || !botonEnviar) return;

    if (listaPedido.length === 0) {
        contenedorLista.innerHTML = "<p style='color:#888; font-size:13px;'>Todavía no has agregado productos.</p>";
        botonEnviar.style.pointerEvents = "none";
        botonEnviar.style.opacity = "0.5";
        return;
    }

    contenedorLista.innerHTML = listaPedido.map(nombre => {
        const nombreEscapado = nombre.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
            <div class="item-pedido">
                <span>${nombre}</span>
                <button onclick="quitarDelPedido('${nombreEscapado}')" aria-label="Quitar">🗑️</button>
            </div>
        `;
    }).join("");

    botonEnviar.style.pointerEvents = "auto";
    botonEnviar.style.opacity = "1";

    const listaTexto = listaPedido.map((nombre, i) => `${i + 1}. ${nombre}`).join("\n");
    const mensajePedido = encodeURIComponent(
        `Hola, quiero pedir estos productos:\n\n${listaTexto}\n\n¿Me confirman disponibilidad y precio?`
    );
    botonEnviar.href = `https://wa.me/${numeroWhatsApp}?text=${mensajePedido}`;
}

cargarPedidoGuardado();
actualizarBotonPedido();
renderizarPanelPedido();

let categoriaActual = "todos";
let subcategoriaActual = "todas";
let tipoActual = "todos";

// Formatea el precio como pesos colombianos: "" -> $35.000
function formatearPrecio(valor) {
    if (!valor || valor === "") {
        return "Disponible";
    }
    return "$" + valor.toLocaleString("es-CO");
}


// ===== PAGINACIÓN =====
// Con miles de productos, dibujarlos todos de una vez cuelga el navegador
// (sobre todo en celular). Por eso se muestran de a POR_PAGINA en POR_PAGINA
// y se agrega un botón "Mostrar más" que va revelando el resto.
const POR_PAGINA = 60;
let listaOrdenadaActual = [];
let productosMostrados = 0;

function construirTarjeta(producto, indiceGlobal) {
    const tieneImagenReal = producto.imagen && producto.imagen.trim() !== "";

    const lineaFoto = tieneImagenReal
        ? ` Ver foto: ${urlSitio}/${producto.imagen}\n\n`
        : "";

    const mensaje = encodeURIComponent(
        `Hola, estoy interesado en este producto:\n\n` +
        ` ${producto.nombre}\n` +
        ` ${formatearPrecio(producto.precio)}\n\n` +
        lineaFoto +
        `¿Está disponible?`
    );

    const rutaImagen = tieneImagenReal
        ? producto.imagen
        : imagenRespaldo;

    const enElPedido = estaEnElPedido(producto.nombre);

    const nombreEscapado = producto.nombre
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;');
    const altEscapado = producto.nombre.replace(/"/g, '&quot;');

    const rutaImagenEscapada = rutaImagen.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

    return `
        <div class="producto">

            <img
                src="${rutaImagen}"
                alt="${altEscapado}"
                loading="lazy"
                decoding="async"
                onclick="abrirLightbox('${rutaImagenEscapada}', '${nombreEscapado}')"
                onerror="this.onerror=null; this.src='${imagenRespaldo}';">

            <h3>${producto.nombre}</h3>

            <p class="precio-producto">${formatearPrecio(producto.precio)}</p>

            <p>${producto.descripcion}</p>

            <a
                href="https://wa.me/${numeroWhatsApp}?text=${mensaje}"
                class="boton"
                target="_blank">
                Solicitar por WhatsApp
            </a>

            <button
                class="boton-agregar-pedido ${enElPedido ? 'agregado' : ''}"
                data-nombre="${altEscapado}"
                onclick="toggleProductoEnPedido('${nombreEscapado}')">
                ${enElPedido ? '✅ En el pedido' : '➕ Agregar al pedido'}
            </button>

        </div>
        `;
}

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; grid-column:1/-1; color:#666;'>No se encontraron productos.</p>";
        return;
    }

    // Se respeta el orden en que están cargados los productos (tus productos reales
    // primero, y luego los del inventario en el mismo orden del PDF por categoría),
    // en vez de reordenarlos alfabéticamente.
    listaOrdenadaActual = [...lista];

    productosMostrados = 0;
    renderizarSiguientePagina();
    actualizarContador();
}

function renderizarSiguientePagina() {
    const siguienteLote = listaOrdenadaActual.slice(productosMostrados, productosMostrados + POR_PAGINA);

    // Se arma todo el HTML del lote en un solo string (un solo array.join)
    // y se inserta UNA sola vez, en vez de ir sumando con += en cada vuelta
    // (eso último es lo que colgaba la página con miles de productos).
    const htmlLote = siguienteLote.map(construirTarjeta).join("");

    // Quita el botón "Mostrar más" anterior si existía, para volver a ponerlo al final
    const botonViejo = document.getElementById("boton-mostrar-mas");
    if (botonViejo) botonViejo.remove();

    contenedor.insertAdjacentHTML("beforeend", htmlLote);
    productosMostrados += siguienteLote.length;

    if (productosMostrados < listaOrdenadaActual.length) {
        const restantes = listaOrdenadaActual.length - productosMostrados;
        contenedor.insertAdjacentHTML(
            "afterend",
            `<div style="text-align:center; grid-column:1/-1; margin-top:25px;">
                <button id="boton-mostrar-mas" class="boton" onclick="renderizarSiguientePagina()">
                    Mostrar más (${restantes} restantes)
                </button>
            </div>`
        );
    }
}

// Función auxiliar para quitar tildes, diéresis y dejar todo en minúsculas
function limpiarTexto(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Remueve todos los acentos
}

// Función para verificar si un término es "similar" a otro (Distancia Levenshtein simplificada)
function esSimilar(busqueda, objetivo) {
    // Si el objetivo contiene la palabra directamente, es un acierto inmediato
    if (objetivo.includes(busqueda)) return true;
    
    // Si la búsqueda es muy corta, no aplicamos tolerancia para evitar falsos positivos masivos
    if (busqueda.length < 3) return false;

    // Permitimos una tolerancia de error basada en el tamaño de la palabra
    let erroresPermitidos = busqueda.length > 5 ? 2 : 1; 

    // Atajo: si el largo es muy distinto, la distancia ya supera el límite (no hace falta calcularla)
    if (Math.abs(objetivo.length - busqueda.length) > erroresPermitidos) return false;
    let filaAnterior = Array.from({ length: objetivo.length + 1 }, (_, i) => i);

    for (let i = 0; i < busqueda.length; i++) {
        let filaActual = [i + 1];
        for (let j = 0; j < objetivo.length; j++) {
            let costo = busqueda[i] === objetivo[j] ? 0 : 1;
            filaActual.push(Math.min(
                filaActual[j] + 1,        // Inserción
                filaAnterior[j + 1] + 1,  // Eliminación
                filaAnterior[j] + costo   // Sustitución
            ));
        }
        filaAnterior = filaActual;
    }

    // Si el costo de transformar la palabra está dentro del límite, lo damos por válido
    return filaAnterior[filaAnterior.length - 1] <= erroresPermitidos;
}

// Los nombres "limpios" (sin tildes ni mayúsculas) se calculan UNA sola vez,
// en vez de recalcularlos para todos los productos en cada tecla.
let _nombresLimpios = null;
function obtenerNombresLimpios() {
    if (!_nombresLimpios) {
        _nombresLimpios = productos.map(function (p) {
            const limpio = limpiarTexto(p.nombre);
            return { completo: limpio, palabras: limpio.split(/\s+/) };
        });
    }
    return _nombresLimpios;
}

function buscarProductos(textoBuscado) {
    // Dividimos la búsqueda en palabras por si buscan cosas como "tubo presion"
    const palabrasBuscadas = textoBuscado.split(/\s+/).filter(Boolean);
    const limpios = palabrasBuscadas.length > 0 ? obtenerNombresLimpios() : null;

    return productos.filter(function (producto, i) {
        // Primero lo barato: categoría, subcategoría y tipo
        if (categoriaActual !== "todos" && producto.categoria !== categoriaActual) return false;
        if (subcategoriaActual !== "todas" && producto.subcategoria !== subcategoriaActual) return false;
        if (tipoActual !== "todos" && producto.tipo !== tipoActual) return false;

        // Buscador vacío: coincide automáticamente
        if (!limpios) return true;

        // Cada palabra buscada debe coincidir (o ser muy parecida) con el nombre completo o con alguna de sus palabras
        const nombre = limpios[i];
        return palabrasBuscadas.every(function (palabra) {
            return esSimilar(palabra, nombre.completo) ||
                   nombre.palabras.some(function (pProd) { return esSimilar(palabra, pProd); });
        });
    });
}

function filtrarLista() {
    const textoBuscado = buscador ? limpiarTexto(buscador.value) : "";
    mostrarProductos(buscarProductos(textoBuscado));
}



// Dibuja los botones de subcategoría según la categoría principal elegida
function mostrarSubcategorias(categoria) {

    if (!subcategoriasContenedor) return;

    const opciones = subcategoriasPorCategoria[categoria];

    // Si esa categoría no tiene subcategorías definidas, no se muestra nada
    if (!opciones || opciones.length === 0) {
        subcategoriasContenedor.innerHTML = "";
        actualizarBotonMasSubcategorias();
        return;
    }

    let html = `<button onclick="filtrarSubcategoria('todas')">Todas</button>`;

    opciones.forEach(opcion => {
        html += `<button onclick="filtrarSubcategoria('${opcion.valor}')">${opcion.texto}</button>`;
    });

    subcategoriasContenedor.innerHTML = html;
    actualizarBotonMasSubcategorias();
}

// Dibuja los botones de tipo (tercer nivel) según la subcategoría elegida
function mostrarTipos(categoria, subcategoria) {

    if (!subsubcategoriasContenedor) return;

    const opciones = subcategoriasPorCategoria[categoria];
    const subcategoriaInfo = opciones ? opciones.find(op => op.valor === subcategoria) : null;
    const tipos = subcategoriaInfo ? subcategoriaInfo.tipos : null;

    // Si esa subcategoría no tiene tipos definidos, no se muestra nada
    if (!tipos || tipos.length === 0) {
        subsubcategoriasContenedor.innerHTML = "";
        return;
    }

    let html = `<button onclick="filtrarTipo('todos')">Todos</button>`;

    tipos.forEach(tipo => {
        html += `<button onclick="filtrarTipo('${tipo.valor}')">${tipo.texto}</button>`;
    });

    subsubcategoriasContenedor.innerHTML = html;
}

// Llamada desde los botones de categoría principal en productos.html
function filtrarCategoria(categoria) {
    categoriaActual = categoria;
    subcategoriaActual = "todas";
    tipoActual = "todos";
    mostrarSubcategorias(categoria);
    if (subsubcategoriasContenedor) subsubcategoriasContenedor.innerHTML = "";
    filtrarLista();
}

// Llamada desde los botones de subcategoría (generados por JavaScript)
function filtrarSubcategoria(subcategoria) {
    subcategoriaActual = subcategoria;
    tipoActual = "todos";
    mostrarTipos(categoriaActual, subcategoria);
    filtrarLista();
}

// Llamada desde los botones de tipo, tercer nivel (generados por JavaScript)
function filtrarTipo(tipo) {
    tipoActual = tipo;
    filtrarLista();
}

if (contenedor) {
    mostrarProductos(productos);
}

if (buscador) {
    let esperaBusqueda = null;
    buscador.addEventListener("input", function () {
        clearTimeout(esperaBusqueda);
        esperaBusqueda = setTimeout(filtrarLista, 200);
    });
}
function actualizarContador() {
    const elementoContador = document.getElementById('cantidad-productos');
    if (elementoContador) {
        elementoContador.textContent = listaOrdenadaActual.length;
    }
}
document.addEventListener("DOMContentLoaded", actualizarContador);

// Muestra/oculta TODOS los filtros
function toggleFiltros() {
    const panel = document.getElementById("panel-filtros");
    const flecha = document.getElementById("flecha-filtros");
    if (!panel) return;
    panel.classList.toggle("panel-filtros-oculto");
    if (flecha) {
        flecha.textContent = panel.classList.contains("panel-filtros-oculto") ? "▾" : "▴";
    }
    ocultarTipFiltros();
}

// El texto "Pulsa aquí para ver más o menos filtros..." solo se ve hasta que
// el cliente use el botón por primera vez (o pasen unos segundos), y ya no
// vuelve a salir en futuras visitas del mismo navegador.
function ocultarTipFiltros() {
    const tip = document.getElementById("tip-filtros");
    if (tip) tip.classList.add("tip-filtros-oculto");
    try {
        localStorage.setItem("himecon-tip-filtros-visto", "1");
    } catch (e) {}
}

document.addEventListener("DOMContentLoaded", function () {
    let yaVisto = false;
    try {
        yaVisto = localStorage.getItem("himecon-tip-filtros-visto") === "1";
    } catch (e) {}
    if (yaVisto) {
        ocultarTipFiltros();
    } else {
        setTimeout(ocultarTipFiltros, 8000); // se esconde solo a los 8 seg si no lo tocan
    }
});

// Al cargar: ocultos en celular, visibles en computador
document.addEventListener("DOMContentLoaded", function () {
    const panel = document.getElementById("panel-filtros");
    const flecha = document.getElementById("flecha-filtros");
    if (panel && window.innerWidth <= 768) {
        panel.classList.add("panel-filtros-oculto");
    }
    if (panel && flecha) {
        flecha.textContent = panel.classList.contains("panel-filtros-oculto") ? "▾" : "▴";
    }
});

// ===== MEJORAS VISUALES =====
// Marca el filtro elegido (categoría / subcategoría / tipo) con la clase "activo"
(function () {
    function marcarPrimero(id) {
        const b = document.querySelector('#' + id + ' button');
        if (b) b.classList.add('activo');
    }
    const primeraCategoria = document.querySelector('.categorias button');
    if (primeraCategoria) primeraCategoria.classList.add('activo');

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.categorias button, #subcategorias button, #subsubcategorias button');
        if (!btn) return;
        const grupo = btn.parentElement;
        grupo.querySelectorAll('button').forEach(function (b) { b.classList.remove('activo'); });
        btn.classList.add('activo');
        // Al cambiar de nivel, el de abajo se vuelve a dibujar: se marca su primer botón
        if (grupo.classList.contains('categorias')) marcarPrimero('subcategorias');
        if (grupo.id === 'subcategorias') marcarPrimero('subsubcategorias');
        // En celular, deja el chip elegido a la vista
        if (btn.scrollIntoView) btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });
})();

// Sombra suave en el encabezado al hacer scroll
(function () {
    const header = document.querySelector('header');
    if (!header) return;
    const actualizar = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
})();


// =====================================================================
// ===== HORARIO Y "ABIERTO AHORA" (hora de Colombia) =====
// =====================================================================
(function () {
    const etiquetas = document.querySelectorAll('[data-estado-tienda]');
    const lista = document.getElementById('horario-lista');
    if (!etiquetas.length && !lista) return;

    const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const ORDEN = [1, 2, 3, 4, 5, 6, 0];

    function aMin(h) { const p = h.split(':'); return Number(p[0]) * 60 + Number(p[1]); }
    function fmt(h) {
        const p = h.split(':').map(Number);
        const suf = p[0] >= 12 ? 'p. m.' : 'a. m.';
        return (p[0] % 12 || 12) + ':' + String(p[1]).padStart(2, '0') + ' ' + suf;
    }

    // Fecha y hora actuales en Colombia
    function ahoraColombia() {
        const partes = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        }).formatToParts(new Date());
        const get = function (t) { return Number(partes.find(function (p) { return p.type === t; }).value); };
        let h = get('hour'); if (h === 24) h = 0;
        return { y: get('year'), m: get('month'), d: get('day'), min: h * 60 + get('minute') };
    }

    // Franjas de un día: primero se mira si es un día especial; si no, el horario normal
    function franjasDelDia(ahora, sumaDias) {
        const f = new Date(Date.UTC(ahora.y, ahora.m - 1, ahora.d + sumaDias));
        const iso = f.toISOString().slice(0, 10);
        const dow = f.getUTCDay();
        const franjas = (HORARIO_ESPECIAL[iso] !== undefined) ? HORARIO_ESPECIAL[iso] : (HORARIO_TIENDA[dow] || []);
        return { dow: dow, franjas: franjas };
    }

    // LA REGLA: compara el día y la hora de ahora con la tabla de horarios
    function calcular() {
        const ahora = ahoraColombia();
        const hoy = franjasDelDia(ahora, 0);

        // 1) ¿Estamos dentro de alguna franja de hoy?  -> ABIERTO
        for (let i = 0; i < hoy.franjas.length; i++) {
            if (ahora.min >= aMin(hoy.franjas[i][0]) && ahora.min < aMin(hoy.franjas[i][1])) {
                return { dia: hoy.dow, abierto: true, texto: 'Abierto ahora · Cierra a las ' + fmt(hoy.franjas[i][1]) };
            }
        }
        // 2) Si no, se busca la próxima vez que abre  -> CERRADO
        for (let s = 0; s <= 7; s++) {
            const dia = franjasDelDia(ahora, s);
            for (let i = 0; i < dia.franjas.length; i++) {
                if (s === 0 && aMin(dia.franjas[i][0]) <= ahora.min) continue;   // esa franja de hoy ya pasó
                const cuando = s === 0 ? 'hoy' : s === 1 ? 'mañana' : 'el ' + DIAS[dia.dow].toLowerCase();
                return { dia: hoy.dow, abierto: false, texto: 'Cerrado · Abre ' + cuando + ' a las ' + fmt(dia.franjas[i][0]) };
            }
        }
        return { dia: hoy.dow, abierto: false, texto: 'Cerrado' };
    }

    if (lista) {
        lista.innerHTML = ORDEN.map(function (d) {
            const franjas = HORARIO_TIENDA[d] || [];
            const horas = franjas.length
                ? franjas.map(function (f) { return fmt(f[0]) + ' – ' + fmt(f[1]); }).join(' · ')
                : 'Cerrado';
            return '<li data-dia="' + d + '"' + (franjas.length ? '' : ' class="cerrado-dia"') + '><span>' + DIAS[d] + '</span><span>' + horas + '</span></li>';
        }).join('');
    }

    function pintar() {
        const e = calcular();
        etiquetas.forEach(function (el) {
            el.textContent = e.texto;
            el.classList.toggle('abierto', e.abierto);
            el.classList.toggle('cerrado', !e.abierto);
        });
        if (lista) {
            lista.querySelectorAll('li').forEach(function (li) {
                li.classList.toggle('hoy', Number(li.dataset.dia) === e.dia);
            });
        }
    }
    pintar();
    setInterval(pintar, 60000);   // se actualiza solo cada minuto
})();

// =====================================================================
// ===== NÚMEROS QUE SUBEN SOLOS (+25 años, productos, categorías) =====
// =====================================================================
(function () {
    const numeros = document.querySelectorAll('.stat-numero');
    if (!numeros.length) return;
    const sinMovimiento = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function poner(el, valor) {
        el.textContent = (el.dataset.prefijo || '') + Math.round(valor).toLocaleString('es-CO');
    }

    numeros.forEach(function (el) {
        let meta = el.dataset.target;
        if (meta === 'productos') {
            const total = (typeof productos !== 'undefined') ? productos.length : 0;
            meta = total >= 100 ? Math.floor(total / 100) * 100 : total;   // ej: 10.847 -> +10.800
        }
        el.dataset.meta = Number(meta) || 0;
        if (!sinMovimiento && 'IntersectionObserver' in window) poner(el, 0);
        else poner(el, el.dataset.meta);
    });

    function animar(el) {
        const meta = Number(el.dataset.meta);
        const dur = 1600, ini = performance.now();
        (function paso(t) {
            const p = Math.min(Math.max((t - ini) / dur, 0), 1);
            poner(el, meta * (1 - Math.pow(1 - p, 3)));   // arranca rápido y frena suave
            if (p < 1) requestAnimationFrame(paso);
        })(ini);
    }

    if (sinMovimiento || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
            if (en.isIntersecting) { animar(en.target); obs.unobserve(en.target); }
        });
    }, { threshold: 0.4 });
    numeros.forEach(function (el) { obs.observe(el); });
})();
