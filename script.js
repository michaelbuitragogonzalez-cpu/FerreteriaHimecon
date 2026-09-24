/* =========================================================
   PRODUCTOS - FERRETERÍA HIMECON
   ---------------------------------------------------------
   ¿CÓMO AGREGAR UN PRODUCTO NUEVO?
   Copia uno de los bloques { ... } de la lista de abajo,
   pégalo antes del corchete final "];" y cambia los datos:

   {
       nombre: "Nombre del producto",
       precio: 25000,                 // solo números, sin puntos ni $
       imagen: "img/nombre-foto.jpg", // deja "" si aún no tienes la foto
       descripcion: "Descripción corta del producto.",
       categoria: "herramientas"      // herramientas | construccion | hogar
   },

   Si "imagen" está vacía o la foto no existe todavía,
   la página muestra automáticamente una imagen genérica,
   así la tarjeta nunca se ve rota.
========================================================= */

const numeroWhatsApp = "573206150674"; // Número de la ferretería

// Tu página ya publicada (sin "/" al final). Se usa para armar el link de la foto en WhatsApp.
const urlSitio = "https://michaelbuitragogonzalez-cpu.github.io/FerreteriaHimecon/";

// Imagen que se muestra cuando un producto todavía no tiene foto
const imagenRespaldo = "img/sin-imagen.png";

const productos = [

    {
        nombre: "Tuberia Electrica ½ Pulg",
        precio: 35000,
        imagen: "img/tuberiaelectricidad.jpeg",
        descripcion: "Tubo rígido de alta resistencia para proteger y enrutar conductores eléctricos",
        categoria: "tubospvc",
        subcategoria: "electricidad"
    },

    {
         nombre: "Tuberia Electrica ¾ Pulg",
        precio: 35000,
        imagen: "img/tuberiaelectricidad.jpeg",
        descripcion: "Tubo rígido de alta resistencia para proteger y enrutar conductores eléctricos",
        categoria: "tubospvc",
        subcategoria: "electricidad"
    },

    { nombre: "Tuberia Electrica 1 Pulg",
        precio: 35000,
        imagen: "img/tuberiaelectricidad.jpeg",
        descripcion: "Tubo rígido de alta resistencia para proteger y enrutar conductores eléctricos",
        categoria: "tubospvc",
        subcategoria: "electricidad"
    },
       {
         nombre: "Tuberia Electrica de 1 ½ Pulg",
        precio: 35000,
        imagen: "img/tuberiaelectricidad.jpeg",
        descripcion: "Tubo rígido de alta resistencia para proteger y enrutar conductores eléctricos",
        categoria: "tubospvc",
        subcategoria: "electricidad"
    },
       {
         nombre: "Tuberia Electrica 2 Pulg",
        precio: 35000,
        imagen: "img/tuberiaelectricidad.jpeg",
        descripcion: "Tubo rígido de alta resistencia para proteger y enrutar conductores eléctricos",
        categoria: "tubospvc",
        subcategoria: "electricidad"
    },



    
   {
         nombre: "Tuberia Sanitaria 1 ½ Pulg",
        precio: 35000,
        imagen: "img/tuberiasanitaria.jpeg",
        descripcion: "Ideal para sistemas de drenaje, ventilación y desagüe residencial o comercial",
        categoria: "tubospvc",
        subcategoria: "sanitaria"
    },
   {
         nombre: "Tuberia Sanitaria 3 Pulg",
        precio: 35000,
        imagen: "img/tuberiasanitaria.jpeg",
        descripcion: "Ideal para sistemas de drenaje, ventilación y desagüe residencial o comercial",
        categoria: "tubospvc",
        subcategoria: "sanitaria"
    },
    {
         nombre: "Tuberia Sanitaria 2 Pulg",
        precio: 35000,
        imagen: "img/tuberiasanitaria.jpeg",
        descripcion: "Ideal para sistemas de drenaje, ventilación y desagüe residencial o comercial",
        categoria: "tubospvc",
        subcategoria: "sanitaria"
    },
    {
         nombre: "Tuberia Sanitaria 4 Pulg",
        precio: 35000,
        imagen: "img/tuberiasanitaria.jpeg",
        descripcion: "Ideal para sistemas de drenaje, ventilación y desagüe residencial o comercial",
        categoria: "tubospvc",
        subcategoria: "sanitaria"
    },
        {
         nombre: "Tuberia Sanitaria 6 Pulg",
        precio: 35000,
        imagen: "img/tuberiasanitaria.jpeg",
        descripcion: "Ideal para sistemas de drenaje, ventilación y desagüe residencial o comercial",
        categoria: "tubospvc",
        subcategoria: "sanitaria"
    },
      {
         nombre: "Tuberia Ventilación 4 Pulg",
        precio: 35000,
        imagen: "img/tuberiaventilacion.jpeg",
        descripcion: "Ideal para garantizar el flujo de aire y evitar vacíos en desagües",
        categoria: "tubospvc",
        subcategoria: "ventilacion"
    },
    {
         nombre: "Tuberia Ventilación 3 Pulg",
        precio: 35000,
        imagen: "img/tuberiaventilacion.jpeg",
        descripcion: "Ideal para garantizar el flujo de aire y evitar vacíos en desagües",
        categoria: "tubospvc",
        subcategoria: "ventilacion"
    },
    {
         nombre: "Tuberia Ventilación 2 Pulg",
        precio: 35000,
        imagen: "img/tuberiaventilacion.jpeg",
        descripcion: "Ideal para garantizar el flujo de aire y evitar vacíos en desagües",
        categoria: "tubospvc",
        subcategoria: "ventilacion"
    },
     {
         nombre: "Tuberia NOVAFORT 6 Pulg",
        precio: 35000,
        imagen: "img/NOVAFORT.jpeg",
        descripcion: "Canalización hermética y ligera, ideal para recolectar aguas residuales y pluviales por gravedad",
        categoria: "tubospvc",
        subcategoria: "novafort"
    },
         {
         nombre: "Tuberia a Presión 3 Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
   {
         nombre: "Tuberia a Presión 2 Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
   {
         nombre: "Tuberia a Presión ½ Pulg ",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
   {
         nombre: "Tuberia a Presión 1 ¼ Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
   {
         nombre: "Tuberia a Presión 1 Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
   {
         nombre: "Tuberia a Presión ¾ Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
       {
         nombre: "Tuberia a Presión 1 ½ Pulg",
        precio: 35000,
        imagen: "img/peresion.jpeg",
        descripcion: "Tubería de pared gruesa para sistemas de riego, distribución de agua y bombeo",
        categoria: "tubospvc",
        subcategoria: "presion"
    },
  
   {
         nombre: "Tuberia CPVC ½ Pulg",
        precio: 35000,
        imagen: "img/CPVC.jpeg",
        descripcion: "Tubería resistente a la corrosión, ideal para la distribución de agua fría y caliente.",
        categoria: "tubospvc",
        subcategoria: "cpvc"
    },

    // ===== VARILLAS DE HIERRO (ejemplo, cambia precio/imagen por los reales) =====

    {
        nombre: "Varilla Grafilada ½ Pulg",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },
       {
        nombre: "Varilla Grafilada ⅜ Pulg",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada ¼ Pulg",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada ⅝ Pulg",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada 9mm",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada 11mm",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada 12mm",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada ¾ Pulg",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },   {
        nombre: "Varilla Grafilada 4.5mm ",
        precio: 28000,
        imagen: "img/grafilada.jpeg",
        descripcion: "Alambre corrugado de alta resistencia, ideal para refuerzo de concreto y fabricación de mallas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "grafiladas"
    },
 {
        nombre: "Varilla Cuadrada ½ Pulg",
        precio: 28000,
        imagen: "img/cuadrada.jpeg",
        descripcion: "Barra sólida de alta resistencia, ideal para herrería, rejas, protecciones y estructuras metálicas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "cuadradas"
    },
     {
        nombre: "Varilla Cuadrada 10.5mm",
        precio: 28000,
        imagen: "img/cuadrada.jpeg",
        descripcion: "Barra sólida de alta resistencia, ideal para herrería, rejas, protecciones y estructuras metálicas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "cuadradas"
    }, {
        nombre: "Varilla Cuadrada ⅝ Pulg",
        precio: 28000,
        imagen: "img/cuadrada.jpeg",
        descripcion: "Barra sólida de alta resistencia, ideal para herrería, rejas, protecciones y estructuras metálicas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "cuadradas"
    }, {
        nombre: "Varilla Cuadrada 11mm",
        precio: 28000,
        imagen: "img/cuadrada.jpeg",
        descripcion: "Barra sólida de alta resistencia, ideal para herrería, rejas, protecciones y estructuras metálicas",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "cuadradas"
    },
    {
        nombre: "Varilla Entorchada ½ Pulg",
        precio: 28000,
        imagen: "img/entorchada.webp",
        descripcion: "Acero macizo con acabado helicoidal que aporta alta resistencia estética y estructural a ventanas y pasamanos",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "entorchadas"
    },
    {
        nombre: "Varilla Entorchada 10mm",
        precio: 28000,
        imagen: "img/entorchada.webp",
        descripcion: "Acero macizo con acabado helicoidal que aporta alta resistencia estética y estructural a ventanas y pasamanos",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "entorchadas"
    },
   {
        nombre: "Varilla Entorchada 11mm",
        precio: 28000,
        imagen: "img/entorchada.webp",
        descripcion: "Acero macizo con acabado helicoidal que aporta alta resistencia estética y estructural a ventanas y pasamanos",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "entorchadas"
    },
   {
        nombre: "Varilla lisa ¼ Pulg",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },
   {
        nombre: "Varilla lisa 10.5mm",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },{
        nombre: "Varilla lisa 12.5mm",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },{
        nombre: "Varilla lisa 12mm",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },
    {
        nombre: "Varilla lisa ¾ Pulg",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },
    {
        nombre: "Varilla lisa ⅝ Pulg",
        precio: 28000,
        imagen: "img/lisa.jpeg",
        descripcion: "Barra cilíndrica de superficie uniforme, ideal para herrería, estructuras metálicas y refuerzos ligeros",
        categoria: "hierros",
        subcategoria: "varillas",
        tipo: "lisas"
    },

     {
        nombre: "TEE Sanitaria 6 Pulg",
        precio: 28000,
        imagen: "img/sanitaria.webp",
        descripcion: "Ideal para realizar derivaciones eficientes en sistemas de drenaje, desagüe y alcantarillado por gravedad",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
     {
        nombre: "TEE Sanitaria 4 Pulg",
        precio: 28000,
        imagen: "img/sanitaria.webp",
        descripcion: "Ideal para realizar derivaciones eficientes en sistemas de drenaje, desagüe y alcantarillado por gravedad",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
     {
        nombre: "TEE Sanitaria 3 Pulg",
        precio: 28000,
        imagen: "img/sanitaria.webp",
        descripcion: "Ideal para realizar derivaciones eficientes en sistemas de drenaje, desagüe y alcantarillado por gravedad",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
     {
        nombre: "TEE Sanitaria 2 Pulg",
        precio: 28000,
        imagen: "img/sanitaria.webp",
        descripcion: "Ideal para realizar derivaciones eficientes en sistemas de drenaje, desagüe y alcantarillado por gravedad",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
     {
        nombre: "TEE Sanitaria 1 ½ Pulg",
        precio: 28000,
        imagen: "img/sanitaria.webp",
        descripcion: "Ideal para realizar derivaciones eficientes en sistemas de drenaje, desagüe y alcantarillado por gravedad",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    }, 
    
    
    {
        nombre: "YEE Sanitaria 4 Pulg",
        precio: 28000,
        imagen: "img/YEE.webp",
        descripcion: "Pieza clave para unir ramales secundarios a colectores principales en sistemas de drenaje y desagüe",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
      {
        nombre: "YEE Sanitaria 3 Pulg",
        precio: 28000,
        imagen: "img/YEE.webp",
        descripcion: "Pieza clave para unir ramales secundarios a colectores principales en sistemas de drenaje y desagüe",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },  {
        nombre: "YEE Sanitaria 2 Pulg",
        precio: 28000,
        imagen: "img/YEE.webp",
        descripcion: "Pieza clave para unir ramales secundarios a colectores principales en sistemas de drenaje y desagüe",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },  {
        nombre: "YEE Sanitaria 1 ½ Pulg",
        precio: 28000,
        imagen: "img/YEE.webp",
        descripcion: "Pieza clave para unir ramales secundarios a colectores principales en sistemas de drenaje y desagüe",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
     {
        nombre: "Codos Sanitarios 90°  6 Pulg",
        precio: 28000,
        imagen: "img/Codossn.webp",
        descripcion: "Conexión diseñada para realizar giros precisos en ángulo recto y cambiar de dirección el flujo en las tuberías",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
        {
        nombre: "Codos Sanitarios 90°  4 Pulg",
        precio: 28000,
        imagen: "img/Codossn.webp",
        descripcion: "Conexión diseñada para realizar giros precisos en ángulo recto y cambiar de dirección el flujo en las tuberías",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },    {
        nombre: "Codos Sanitarios 90°  3 Pulg",
        precio: 28000,
        imagen: "img/Codossn.webp",
        descripcion: "Conexión diseñada para realizar giros precisos en ángulo recto y cambiar de dirección el flujo en las tuberías",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },    {
        nombre: "Codos Sanitarios 90°  2 Pulg",
        precio: 28000,
        imagen: "img/Codossn.webp",
        descripcion: "Conexión diseñada para realizar giros precisos en ángulo recto y cambiar de dirección el flujo en las tuberías",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },    {
        nombre: "Codos Sanitarios 90°  1 ½  Pulg",
        precio: 28000,
        imagen: "img/Codossn.webp",
        descripcion: "Conexión diseñada para realizar giros precisos en ángulo recto y cambiar de dirección el flujo en las tuberías",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
 {
        nombre: "Semicodos Sanitarios 45°  6 Pulg",
        precio: 28000,
        imagen: "img/semicodosn.jpg",
        descripcion: " Conexión de ángulo suave diseñada para cambiar la dirección de las tuberías de drenaje sin frenar el flujo",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Semicodos Sanitarios 45°  4 Pulg",
        precio: 28000,
        imagen: "img/semicodosn.jpg",
        descripcion: " Conexión de ángulo suave diseñada para cambiar la dirección de las tuberías de drenaje sin frenar el flujo",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Semicodos Sanitarios 45°  3 Pulg",
        precio: 28000,
        imagen: "img/semicodosn.jpg",
        descripcion: " Conexión de ángulo suave diseñada para cambiar la dirección de las tuberías de drenaje sin frenar el flujo",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Semicodos Sanitarios 45°  2 Pulg",
        precio: 28000,
        imagen: "img/semicodosn.jpg",
        descripcion: " Conexión de ángulo suave diseñada para cambiar la dirección de las tuberías de drenaje sin frenar el flujo",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Semicodos Sanitarios 45°  1 ½  Pulg",
        precio: 28000,
        imagen: "img/semicodosn.jpg",
        descripcion: " Conexión de ángulo suave diseñada para cambiar la dirección de las tuberías de drenaje sin frenar el flujo",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Uniones Sanitarias 6 Pulg",
        precio: 28000,
        imagen: "img/unionessn.webp",
        descripcion: "Accesorio recto diseñado para acoplar y extender tramos de tubería de drenaje de forma hermética",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
    {
        nombre: "Uniones Sanitarias 4 Pulg",
        precio: 28000,
        imagen: "img/unionessn.webp",
        descripcion: "Accesorio recto diseñado para acoplar y extender tramos de tubería de drenaje de forma hermética",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Uniones Sanitarias 3 Pulg",
        precio: 28000,
        imagen: "img/unionessn.webp",
        descripcion: "Accesorio recto diseñado para acoplar y extender tramos de tubería de drenaje de forma hermética",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Uniones Sanitarias 2 Pulg",
        precio: 28000,
        imagen: "img/unionessn.webp",
        descripcion: "Accesorio recto diseñado para acoplar y extender tramos de tubería de drenaje de forma hermética",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Uniones Sanitarias 1 ½ Pulg",
        precio: 28000,
        imagen: "img/unionessn.webp",
        descripcion: "Accesorio recto diseñado para acoplar y extender tramos de tubería de drenaje de forma hermética",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
    
    
    
    {
        nombre: "Tapón de Prueba Sanitario 6 Pulg",
        precio: 28000,
        imagen: "img/taponp.jpeg",
        descripcion: "Accesorio de alta resistencia diseñado para sellar temporalmente tuberías de drenaje durante pruebas de presión o fugas",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
    {
        nombre: "Tapón de Prueba Sanitario 4 Pulg",
        precio: 28000,
        imagen: "img/taponp.jpeg",
        descripcion: "Accesorio de alta resistencia diseñado para sellar temporalmente tuberías de drenaje durante pruebas de presión o fugas",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Tapón de Prueba Sanitario 3 Pulg",
        precio: 28000,
        imagen: "img/taponp.jpeg",
        descripcion: "Accesorio de alta resistencia diseñado para sellar temporalmente tuberías de drenaje durante pruebas de presión o fugas",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Tapón de Prueba Sanitario 2 Pulg",
        precio: 28000,
        imagen: "img/taponp.jpeg",
        descripcion: "Accesorio de alta resistencia diseñado para sellar temporalmente tuberías de drenaje durante pruebas de presión o fugas",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Tapón de Prueba Sanitario 1 ½ Pulg",
        precio: 28000,
        imagen: "img/taponp.jpeg",
        descripcion: "Accesorio de alta resistencia diseñado para sellar temporalmente tuberías de drenaje durante pruebas de presión o fugas",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
    {
        nombre: "Reducciones Sanitarias de 6 a 4 Pulg",
        precio: 28000,
        imagen: "img/reducsn.jpg",
        descripcion: "Conexión de superficie interna lisa que mantiene el flujo continuo de aguas residuales y evita acumulación de sólidos",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },   {
        nombre: "Reducciones Sanitarias de 4 a 3 Pulg",
        precio: 28000,
        imagen: "img/reducsn.jpg",
        descripcion: "Conexión de superficie interna lisa que mantiene el flujo continuo de aguas residuales y evita acumulación de sólidos",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },   {
        nombre: "Reducciones Sanitarias de 3 a 2 Pulg",
        precio: 28000,
        imagen: "img/reducsn.jpg",
        descripcion: "Conexión de superficie interna lisa que mantiene el flujo continuo de aguas residuales y evita acumulación de sólidos",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },   {
        nombre: "Reducciones Sanitarias de 2 a 1 ½ Pulg",
        precio: 28000,
        imagen: "img/reducsn.jpg",
        descripcion: "Conexión de superficie interna lisa que mantiene el flujo continuo de aguas residuales y evita acumulación de sólidos",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },


    
{
        nombre: "Sifones Sanitarios 4 Pulg",
        precio: 28000,
        imagen: "img/sifones.jpeg",
        descripcion: "Trampa de agua hidráulica diseñada para evitar el retorno de malos olores y gases del drenaje hacia el exterior",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
    {
        nombre: "Sifones Sanitarios 3 Pulg",
        precio: 28000,
        imagen: "img/sifones.jpeg",
        descripcion: "Trampa de agua hidráulica diseñada para evitar el retorno de malos olores y gases del drenaje hacia el exterior",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },
{
        nombre: "Sifones Sanitarios 2 Pulg",
        precio: 28000,
        imagen: "img/sifones1.jpeg",
        descripcion: "Trampa de agua hidráulica diseñada para evitar el retorno de malos olores y gases del drenaje hacia el exterior",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },{
        nombre: "Sifones Sanitarios 1 ½  Pulg",
        precio: 28000,
        imagen: "img/sifones1.jpeg",
        descripcion: "Trampa de agua hidráulica diseñada para evitar el retorno de malos olores y gases del drenaje hacia el exterior",
        categoria: "accesoriospvc",
        subcategoria: "sanitaria",
        tipo: "sanitaria"
    },



{
    nombre: "Codo de Presión 90° 3 Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° 2 Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° 1 ½ Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° 1 Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° ¾ Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Codo de Presión 90° ½ Pulg",
    precio: 28000,
    imagen: "img/codop.webp",
    descripcion: "Conexión de pared gruesa diseñada para realizar giros y soportar altas presiones de agua en redes hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},

    {
    nombre: "Semicodo de Presión 45° 3 Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° 2 Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° 1 ½ Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° 1 Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° ¾ Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Semicodo de Presión 45° ½ Pulg",
    precio: 28000,
    imagen: "img/semicodop.jpeg",
    descripcion: "Conexión hidráulica de pared gruesa diseñada para realizar desvíos suaves y seguros en redes de agua a alta presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "TEE de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/teepr.webp",
    descripcion: "Accesorio de PVC diseñado para conectar tres tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Unión de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/unionpr.jpeg",
    descripcion: "Accesorio de PVC diseñado para unir dos tramos de tubería en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Hembra de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/adaphp.webp",
    descripcion: "Accesorio de PVC con rosca interna para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Adaptador Macho de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/adapmp.webp",
    descripcion: "Accesorio de PVC con rosca externa para conectar tuberías de presión con conexiones roscadas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Roscado de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/taponrp.jpeg",
    descripcion: "Accesorio de PVC con rosca interna diseñado para cerrar y sellar tuberías en redes hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Macho de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/taponmp.webp",
    descripcion: "Accesorio de PVC con rosca exterior diseñado para cerrar extremos de tubería y facilitar conexiones seguras en sistemas hidráulicos",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},

{
    nombre: "Tapón Liso de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Tapón Liso de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/taponlp.jpeg",
    descripcion: "Accesorio de PVC diseñado para sellar de forma sencilla los extremos de tuberías en instalaciones hidráulicas",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Lisa de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/unilp.jpeg",
    descripcion: "Conexión de PVC diseñada para facilitar la unión y desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión 3 Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión 2 Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión 1 ½ Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión 1 Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión ¾ Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
{
    nombre: "Universal Roscada de Presión ½ Pulg",
    precio: 28000,
    imagen: "img/univrp.webp",
    descripcion: "Conexión de PVC con rosca diseñada para unir y facilitar el desmontaje de tuberías en instalaciones hidráulicas de presión",
    categoria: "accesoriospvc",
    subcategoria: "presion",
    tipo: "presion"
},
 {
    nombre: "Soldadura PVC Pavco 1/4 Gal",
    precio: 28000,
    imagen: "img/sold14.webp",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera ",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},   
    {
    nombre: "Soldadura PVC Pavco 1/8 Gal",
    precio: 28000,
    imagen: "img/sold18.webp",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},{
    nombre: "Soldadura PVC Pavco 1/16 Gal",
    precio: 28000,
    imagen: "img/sold116.jpeg",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},{
    nombre: "Soldadura PVC Pavco 1/32 Gal",
    precio: 28000,
    imagen: "img/sold132.webp",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},{
    nombre: "Soldadura PVC Pavco 1/64 Gal",
    precio: 28000,
    imagen: "img/sold164.webp",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},{
    nombre: "Soldadura PVC Pavco 1/28 Gal",
    precio: 28000,
    imagen: "img/sold128.webp",
    descripcion: "Pegamento líquido de alta resistencia diseñado para fusionar tuberías y conexiones de PVC de forma hermética y duradera",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldpvc",
    tipo: "soldpvc"
},{
    nombre: "Soldadura CPVC Pavco 1/32 Gal",
    precio: 28000,
    imagen: "img/soldp132.webp",
    descripcion: "Cemento solvente formulado especialmente para tuberías de agua caliente, capaz de soportar altas temperaturas y presiones",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldcpvc",
    tipo: "soldcpvc"
},{
    nombre: "Soldadura CPVC Pavco 1/64 Gal",
    precio: 28000,
    imagen: "img/soldp164.webp",
    descripcion: "Cemento solvente formulado especialmente para tuberías de agua caliente, capaz de soportar altas temperaturas y presiones",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldcpvc",
    tipo: "soldcpvc"
},{
    nombre: "Soldadura CPVC Pavco 1/28 Gal",
    precio: 28000,
    imagen: "img/soldp128.webp",
    descripcion: "Cemento solvente formulado especialmente para tuberías de agua caliente, capaz de soportar altas temperaturas y presiones",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "soldcpvc",
    tipo: "soldcpvc"
},{
    nombre: "Limpiador PVC Pavco 1/4 Gal",
    precio: 28000,
    imagen: "img/limp14.webp",
    descripcion: "Líquido removedor diseñado para limpiar y preparar la superficie de tuberías y conexiones, eliminando grasa y suciedad antes de soldar",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "limppvc",
    tipo: "limppvc"
},{
    nombre: "Limpiador PVC Pavco 1/32 Gal",
    precio: 28000,
    imagen: "img/limp132.jpeg",
    descripcion: "Líquido removedor diseñado para limpiar y preparar la superficie de tuberías y conexiones, eliminando grasa y suciedad antes de soldar",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "limppvc",
    tipo: "limppvc"
},{
    nombre: "Limpiador PVC Pavco 1/64 Gal",
    precio: 28000,
    imagen: "img/limp164.jpeg",
    descripcion: "Líquido removedor diseñado para limpiar y preparar la superficie de tuberías y conexiones, eliminando grasa y suciedad antes de soldar",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "limppvc",
    tipo: "limppvc"
},{
    nombre: "Limpiador PVC Pavco 1/28 Gal",
    precio: 28000,
    imagen: "img/limp128.jpeg",
    descripcion: "Líquido removedor diseñado para limpiar y preparar la superficie de tuberías y conexiones, eliminando grasa y suciedad antes de soldar",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "limppvc",
    tipo: "limppvc"
},{
    nombre: "Limpiador PVC Pavco 12 Onzas",
    precio: 28000,
    imagen: "img/limp12.jpg",
    descripcion: "Líquido removedor diseñado para limpiar y preparar la superficie de tuberías y conexiones, eliminando grasa y suciedad antes de soldar",
    categoria: "soldaduralimpiadorespvc",
    subcategoria: "limppvc",
    tipo: "limppvc"
},
{
    nombre: "Puntillas Puma Con Cabeza ¾ Pulg ",   
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},
{
    nombre: "Puntillas Puma Con Cabeza 1 Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},

{
    nombre: "Puntillas Puma Con Cabeza 1 ½ Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},

{
    nombre: "Puntillas Puma Con Cabeza 2 Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},

{
    nombre: "Puntillas Puma Con Cabeza 2 ½ Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},

{
    nombre: "Puntillas Puma Con Cabeza 3 Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},

{
    nombre: "Puntillas Puma Con Cabeza 3 ½ Pulg",
    precio: 28000,
    imagen: "img/puntillaspm500.jpg",
    descripcion: "Clavo de acero de alta resistencia con cabeza plana, ideal para fijaciones firmes en madera, cimbras y carpintería general",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "cabeza"
},
{
    nombre: "Puntillas Puma Sin Cabeza 1 Pulg",
    precio: 28000,
    imagen: "img/puntillasnc.jpeg",
    descripcion: "Clavo de acero fino y discreto, ideal para acabados de carpintería, molduras y trabajos donde la cabeza no debe notarse",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "sncabeza"
},{
    nombre: "Puntillas Puma Sin Cabeza  ¾ Pulg",
    precio: 28000,
    imagen: "img/puntillasnc.jpeg",
    descripcion: "Clavo de acero fino y discreto, ideal para acabados de carpintería, molduras y trabajos donde la cabeza no debe notarse",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "sncabeza"
},

{
    nombre: "Puntillas Puma Sin Cabeza 1 ½ Pulg",
    precio: 28000,
    imagen: "img/puntillasnc.jpeg",
    descripcion: "Clavo de acero fino y discreto, ideal para acabados de carpintería, molduras y trabajos donde la cabeza no debe notarse",
    categoria: "hierros",
    subcategoria: "puntillasm500",
    tipo: "sncabeza"
},
{
    nombre: "Puntillas Puma X 1000g 4 Pulg",
    precio: 28000,
    imagen: "img/puntillas1000.jpeg",
    descripcion: "Caja o empaque de 1 kilogramo de clavos de acero de alta resistencia, ideales para fijaciones firmes en madera y construcción en general",
    categoria: "hierros",
    subcategoria: "puntillas1000",
    tipo: "puntillas1000",
},{
    nombre: "Puntillas Puma X 1000g 5 Pulg",
    precio: 28000,
    imagen: "img/puntillas1000.jpeg",
    descripcion: "Caja o empaque de 1 kilogramo de clavos de acero de alta resistencia, ideales para fijaciones firmes en madera y construcción en general",
    categoria: "hierros",
    subcategoria: "puntillas1000",
    tipo: "puntillas1000",
},
{
    nombre: "Grapa Para Cerca X 1000g 1 Pulg",
    precio: 28000,
    imagen: "img/grapa1000.webp",
    descripcion: "Caja o empaque de 1 kilogramo de grapas de acero galvanizado en forma de (U), ideales para fijar alambre de púas o mallas a postes de madera",
    categoria: "hierros",
    subcategoria: "puntillas1000",
    tipo: "puntillas1000",
},
{
    nombre: "Grapa Para Cerca X 1000g 1 ¼ Pulg",
    precio: 28000,
    imagen: "img/grapa1000.webp",
    descripcion: "Caja o empaque de 1 kilogramo de grapas de acero galvanizado en forma de (U), ideales para fijar alambre de púas o mallas a postes de madera",
    categoria: "hierros",
    subcategoria: "puntillas1000",
    tipo: "puntillas1000",
},
{
    nombre: "Alambre Negro Calibre 18",
    precio: 28000,
    imagen: "img/alambren18.png",
    descripcion: "Alambre de acero recocido altamente maleable y flexible, ideal para amarres de varillas y estribos en la construcción de concreto armado",
    categoria: "alambres",
    subcategoria: "negro",
    tipo: "negro",
},{
    nombre: "Alambre Galvanizado Calibre 10",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},{
    nombre: "Alambre Galvanizado Calibre 12",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},{
    nombre: "Alambre Galvanizado Calibre 14",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},{
    nombre: "Alambre Galvanizado Calibre 8",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},{
    nombre: "Alambre Galvanizado Calibre 18",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},{
    nombre: "Alambre Galvanizado Calibre 16",
    precio: 28000,
    imagen: "img/alambreg.jpeg",
    descripcion: "Hilo de acero con recubrimiento de zinc de alta resistencia a la oxidación, ideal para amarres expuestos, manualidades y fijaciones",
    categoria: "alambres",
    subcategoria: "galvanizado",
    tipo: "galvanizado",
},
{
    nombre: "Angulos de hierro 2 X ⅛ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro",
},
{
    nombre: "Angulos de hierro 2 X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro 2 X ¼ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro 1 ½ X ⅛ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro 1 ½ X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro 1 X ⅛ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro 1 X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},

{
    nombre: "Angulos de hierro ¾ X ⅛ Pulg",
    precio: 28000,
    imagen: "img/angl.jpg",
    descripcion: "Perfil metálico estructural en forma de (L) de alta resistencia, ideal para la fabricación de puertas, ventanas, soportes y estructuras metálicas",
    categoria: "hierros",
    subcategoria: "anglhierro",
    tipo: "anglhierro"
},
{
    nombre: "Platinas de Hierro 2 X ⅛ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},{
    nombre: "Platinas de Hierro 2 X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 2 X ¼ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 ½ X ⅛ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 ½ X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 ½ X ¼ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 X ⅛ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro 1 X ¼ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro ¾ X ⅛ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro ¾ X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro ½ X ⅛ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},

{
    nombre: "Platinas de Hierro ½ X ³⁄₁₆ Pulg",
    precio: 28000,
    imagen: "img/platihierro.jpeg",
    descripcion: "Barra metálica plana y sólida de alta resistencia, ideal para la fabricación de rejas, soportes, uniones estructurales y trabajos de herrería general",
    categoria: "hierros",
    subcategoria: "platinas",
    tipo: "plahierro"
},
{
    nombre: "Riel Calibre 18, 2 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},

{
    nombre: "Riel Calibre 18, 2.40 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},

{
    nombre: "Riel Calibre 18, 3 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},

{
    nombre: "Riel Calibre 20, 2 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},

{
    nombre: "Riel Calibre 20, 2.40 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},

{
    nombre: "Riel Calibre 20, 3 Mts",
    precio: 28000,
    imagen: "img/riel.jpeg",
    descripcion: "Perfil liviano pero de excelente rigidez estructural, fácil de cortar e instalar en proyectos de construcción liviana y remodelación arquitectónica",
    categoria: "hierros",
    subcategoria: "riel",
    tipo: "rielhierro"
},
{ 
    nombre: "Tubo Rectangular Calibre 16, 4 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},
{ 
    nombre: "Tubo Rectangular Calibre 14, 4 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},{ 
    nombre: "Tubo Rectangular Calibre 16, 3 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},
{ 
    nombre: "Tubo Rectangular Calibre 14, 3 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},{ 
    nombre: "Tubo Rectangular Calibre 18, 3 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},{ 
    nombre: "Tubo Rectangular Calibre 20, 3 X 1 ½ Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},
{ 
    nombre: "Tubo Rectangular Calibre 18, 2 X 1  Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},{ 
    nombre: "Tubo Rectangular Calibre 20, 2 X 1  Pulg ",
    precio: 28000,
    imagen: "img/rectangular.jpeg",
    descripcion: "Tubo estructural hueco de alta resistencia, ideal para la fabricación de portones, marcos de puertas, postes y estructuras metálicas ligeras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "rectangular"
},
{ 
    nombre: "Tubo Cuadrado Calibre 18, 1 ½  Pulg ",
    precio: 28000,
    imagen: "img/cuadrado.jpeg",
    descripcion: " Perfil metálico macizo a la vista pero liviano y resistente, fácil de soldar y cortar para proyectos de cerrajería y construcción general",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "cuadrada"
},
{ 
    nombre: "Tubo Cuadrado Calibre 20, 1 ½  Pulg ",
    precio: 28000,
    imagen: "img/cuadrado.jpeg",
    descripcion: " Perfil metálico macizo a la vista pero liviano y resistente, fácil de soldar y cortar para proyectos de cerrajería y construcción general",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "cuadrada"
},
{ 
    nombre: "Tubo Cuadrado Calibre 18, 1  Pulg ",
    precio: 28000,
    imagen: "img/cuadrado.jpeg",
    descripcion: " Perfil metálico macizo a la vista pero liviano y resistente, fácil de soldar y cortar para proyectos de cerrajería y construcción general",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "cuadrada"
},
{ 
    nombre: "Tubo Cuadrado Calibre 20, 1  Pulg ",
    precio: 28000,
    imagen: "img/cuadrado.jpeg",
    descripcion: " Perfil metálico macizo a la vista pero liviano y resistente, fácil de soldar y cortar para proyectos de cerrajería y construcción general",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "cuadrada"
},
{ 
    nombre: "Tubo Cuadrado Calibre 20, ¾ Pulg ",
    precio: 28000,
    imagen: "img/cuadrado.jpeg",
    descripcion: " Perfil metálico macizo a la vista pero liviano y resistente, fácil de soldar y cortar para proyectos de cerrajería y construcción general",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "cuadrada"
},
{ 
    nombre: "Tubo Estructural 100X100 2mm ",
    precio: 28000,
    imagen: "img/estructural.jpeg",
    descripcion: " Elemento de alta resistencia mecánica y gran espesor, diseñado para soportar cargas pesadas en vigas, columnas y grandes estructuras",
    categoria: "hierros",
    subcategoria: "perfileria",
    tipo: "estructural"
},
{ 
    nombre: "Perlin Calibre 14, 6 X 2 Pulg ",
    precio: 28000,
    imagen: "img/perlin.jpeg",
    descripcion: "Correa metálica estructural diseñada para el soporte de cubiertas, techumbres y estructuras de galpones",
    categoria: "hierros",
    subcategoria: "perlineria",
    tipo: ""
},
{ 
    nombre: "Perlin Calibre 16, 6 X 2 Pulg ",
    precio: 28000,
    imagen: "img/perlin.jpeg",
    descripcion: "Correa metálica estructural diseñada para el soporte de cubiertas, techumbres y estructuras de galpones",
    categoria: "hierros",
    subcategoria: "perlineria",
    tipo: ""
},
{ 
    nombre: "Perlin Calibre 16, 4 X 2 Pulg ",
    precio: 28000,
    imagen: "img/perlin.jpeg",
    descripcion: "Correa metálica estructural diseñada para el soporte de cubiertas, techumbres y estructuras de galpones",
    categoria: "hierros",
    subcategoria: "perlineria",
    tipo: ""
},
{ 
    nombre: "Perlin Calibre 14, 4 X 2 Pulg ",
    precio: 28000,
    imagen: "img/perlin.jpeg",
    descripcion: "Correa metálica estructural diseñada para el soporte de cubiertas, techumbres y estructuras de galpones",
    categoria: "hierros",
    subcategoria: "perlineria",
    tipo: ""
},
{ 
    nombre: "Tubo Condui EMT 1 X 3 Mts Pulg",
    precio: 28000,
    imagen: "img/tubocondui.jpeg",
    descripcion: "Tubería metálica ligera de acero galvanizado, ideal para la protección y enrutamiento seguro de cableado eléctrico en interiores expuestos",
    categoria: "hierros",
    subcategoria: "",
    tipo: ""
},
{ 
    nombre: "Tubo Condui EMT ¾ X 3 Mts Pulg",
    precio: 28000,
    imagen: "img/tubocondui.jpeg",
    descripcion: "Tubería metálica ligera de acero galvanizado, ideal para la protección y enrutamiento seguro de cableado eléctrico en interiores expuestos",
    categoria: "hierros",
    subcategoria: "",
    tipo: ""
},{ 
    nombre: "Tubo Condui EMT ½ X 3 Mts Pulg",
    precio: 28000,
    imagen: "img/tubocondui.jpeg",
    descripcion: "Tubería metálica ligera de acero galvanizado, ideal para la protección y enrutamiento seguro de cableado eléctrico en interiores expuestos",
    categoria: "hierros",
    subcategoria: "",
    tipo: ""
},
{ 
    nombre: "Tubo Cortinero Dorado 1 Pulg",
    precio: 28000,
    imagen: "img/tubocortinerod.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},{ 
    nombre: "Tubo Cortinero Dorado ½ Pulg",
    precio: 28000,
    imagen: "img/tubocortinerod.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},{ 
    nombre: "Tubo Cortinero Dorado ¾ Pulg",
    precio: 28000,
    imagen: "img/tubocortinerod.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},
 { 
    nombre: "Tubo Cortinero Café 1 Pulg",
    precio: 28000,
    imagen: "img/tubocortineroc.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},{ 
    nombre: "Tubo Cortinero Café ¾ Pulg",
    precio: 28000,
    imagen: "img/tubocortineroc.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},{ 
    nombre: "Tubo Cortinero Café ½ Pulg",
    precio: 28000,
    imagen: "img/tubocortineroc.jpeg",
    descripcion: "Barra cilíndrica de alta resistencia diseñada para el soporte firme y estético de cortinas pesadas o ligeras en el hogar",
    categoria: "aluminios",
    subcategoria: "tubocortinero",
    tipo: ""
},
{ 
    nombre: "Malla Gallinero 1/80 X Mt, Rollo 36 Mts",
    precio: 28000,
    imagen: "img/mallagallinero.webp",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallagallinero",
    tipo: ""
},
{ 
    nombre: "Malla Gallinero 1/50 X Mt, Rollo 36 Mts",
    precio: 28000,
    imagen: "img/mallagallinero.webp",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallagallinero",
    tipo: ""
},
{ 
    nombre: "Malla Pajarito 1/80 X Mt, Rollo 30 Mts",
    precio: 28000,
    imagen: "img/mallapajarito.jpeg",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallapajarito",
    tipo: ""
},
{ 
    nombre: "Malla Pajarito 1Mt X Mt, Rollo 30 Mts",
    precio: 28000,
    imagen: "img/mallapajarito.jpeg",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallapajarito",
    tipo: ""
},
{ 
    nombre: "Malla Plastica 1/80 X Mt, Rollo 50 Mts",
    precio: 28000,
    imagen: "img/mallaplastic.jpeg",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallaplastica",
    tipo: ""
},
{ 
    nombre: "Malla Plastica Cuadrada X Mt, Rollo 30 Mts",
    precio: 28000,
    imagen: "img/mallaplasticac.jpeg",
    descripcion: "Malla de alta resistencia diseñada para el uso en gallineros y otras aplicaciones agrícolas",
    categoria: "mallas",
    subcategoria: "mallaplasticacuadrada",
    tipo: ""
},
];


/* =========================================================
   SUBCATEGORÍAS
   ---------------------------------------------------------
   Aquí defines qué subcategorías tiene cada categoría principal.
   El "valor" debe coincidir con el campo "subcategoria" que le
   pongas al producto arriba. El "texto" es lo que ve el cliente.

   Si una categoría no aparece aquí (como "hogar"), simplemente
   no muestra subcategorías, sin dañar nada.
========================================================= */

const subcategoriasPorCategoria = {

    hierros: [
        {
            valor: "varillas",
            texto: "Varillas",
            tipos: [
                { valor: "lisas", texto: "Lisas" },
                { valor: "cuadradas", texto: "Cuadradas" },
                { valor: "entorchadas", texto: "Entorchadas" },
                { valor: "grafiladas", texto: "Grafiladas" },]   
                
        },
        {
            valor: "puntillasm500",
            texto: "Puntilas Puma X 500g",
            tipos: [
                { valor: "cabeza", texto: "Con Cabeza" },
                { valor: "sncabeza", texto: "Sin Cabeza" },
                ]
            },       {
            valor: "puntillas1000",
            texto: "Puntilas Puma X 1000g",
             
            },  
            {valor: "anglhierro",
            texto: "Angulos de Hierro",
            tipos: [
                { valor: "anglhierro", texto: "Angulos de Hierro" },
                
                ]
                
            },
             {valor: "platinas",
            texto: "Platinas",
            tipos: [
                { valor: "plahierro", texto: "Platinas de Hierro" },
                
                ]
                
            },   
                  {valor: "riel",
            texto: "Rieles",
            tipos: [
                { valor: "rielhierro", texto: "Rieles de Hierro" },
                
                ]
                
                
            },  
              {valor: "perfileria",
            texto: "Perfilería",
            tipos: [
                { valor: "rectangular", texto: "Rectangular" },
                { valor: "estructural", texto: "Estructural" },
                { valor: "cuadrada", texto: "Cuadrada" },
                ]},

                {valor: "perlineria",
            texto: "Perlinería",
            tipos: [
               
                ]},

        // 👇 A futuro, agregas aquí más cosas de hierros, cada una con sus propios tipos:
        // {
        //     valor: "platinas",
        //     texto: "Platinas",
        //     tipos: [
        //         { valor: "lisa", texto: "Lisa" },
        //         { valor: "perforada", texto: "Perforada" },
        //     ]
        // },
    ],

    tubospvc: [
        { valor: "electricidad", texto: "Eléctricidad" },
        { valor: "sanitaria", texto: "Sanitaria" },
        { valor: "ventilacion", texto: "Ventilación" },
        { valor: "novafort", texto: "Novafort" },
        { valor: "presion", texto: "A Presión" },
        { valor: "cpvc", texto: "CPVC" },


    ],  accesoriospvc: [
        { valor: "sanitaria", texto: "Sanitaria" },
        { valor: "presion", texto: "De Presión" },


    ],
       soldaduralimpiadorespvc: [
        { valor: "soldpvc", texto: "Soldadura PVC" },
        { valor: "soldcpvc", texto: "Soldadura CPVC" },
        { valor: "limppvc", texto: "Limpiadores PVC" },

    ],
    
       alambres: [
        { valor: "negro", texto: "Alambre Negro" },
        { valor: "galvanizado", texto: "Alambre Galvanizado" },
        

    ],
       aluminios: [
        { valor: "tubocortinero", texto: "Tubo Cortinero" },

    ],
      mallas: [
        {valor: "mallagallinero", texto: "Malla Gallinero" },
         {valor: "mallapajarito", texto: "Malla Pajarito" },
          {valor: "mallaplastica", texto: "Malla Plástica" },
           {valor: "mallaplasticacuadrada", texto: "Malla Plástica Cuadrada" },
      ]
};



/* =========================================================
   A PARTIR DE AQUÍ NO ES NECESARIO EDITAR NADA
========================================================= */

const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const subcategoriasContenedor = document.getElementById("subcategorias");
const subsubcategoriasContenedor = document.getElementById("subsubcategorias");

let categoriaActual = "todos";
let subcategoriaActual = "todas";
let tipoActual = "todos";

// Formatea el precio como pesos colombianos: 35000 -> $35.000
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; grid-column:1/-1; color:#666;'>No se encontraron productos.</p>";
        return;
    }

    // Ordena alfabéticamente por nombre (A-Z), sin importar el orden en que se agregaron arriba
    const listaOrdenada = [...lista].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    listaOrdenada.forEach(producto => {

        const tieneImagenReal = producto.imagen && producto.imagen.trim() !== "";

        const lineaFoto = tieneImagenReal
            ? `📷 Ver foto: ${urlSitio}/${producto.imagen}\n\n`
            : "";

        const mensaje = encodeURIComponent(
            `Hola, estoy interesado en este producto:\n\n` +
            `🔧 ${producto.nombre}\n` +
            `💰 ${formatearPrecio(producto.precio)}\n\n` +
            lineaFoto +
            `¿Está disponible?`
        );

        const rutaImagen = tieneImagenReal
            ? producto.imagen
            : imagenRespaldo;

        contenedor.innerHTML += `
        <div class="producto">

            <img
                src="${rutaImagen}"
                alt="${producto.nombre}"
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

        </div>
        `;
    });
}

function filtrarLista() {

    const texto = buscador ? buscador.value.toLowerCase() : "";

    const filtrados = productos.filter(producto => {
        const coincideCategoria = categoriaActual === "todos" || producto.categoria === categoriaActual;
        const coincideSubcategoria = subcategoriaActual === "todas" || producto.subcategoria === subcategoriaActual;
        const coincideTipo = tipoActual === "todos" || producto.tipo === tipoActual;
        const coincideTexto = producto.nombre.toLowerCase().includes(texto);
        return coincideCategoria && coincideSubcategoria && coincideTipo && coincideTexto;
    });

    mostrarProductos(filtrados);
}

// Dibuja los botones de subcategoría según la categoría principal elegida
function mostrarSubcategorias(categoria) {

    if (!subcategoriasContenedor) return;

    const opciones = subcategoriasPorCategoria[categoria];

    // Si esa categoría no tiene subcategorías definidas, no se muestra nada
    if (!opciones || opciones.length === 0) {
        subcategoriasContenedor.innerHTML = "";
        return;
    }

    let html = `<button onclick="filtrarSubcategoria('todas')">Todas</button>`;

    opciones.forEach(opcion => {
        html += `<button onclick="filtrarSubcategoria('${opcion.valor}')">${opcion.texto}</button>`;
    });

    subcategoriasContenedor.innerHTML = html;
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
    buscador.addEventListener("keyup", filtrarLista);
}