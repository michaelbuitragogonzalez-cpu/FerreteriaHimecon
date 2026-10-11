/* =========================================================
   FERRETERÍA HIMECON - EXTRAS INTERACTIVOS (extras.js)
   ---------------------------------------------------------
   1) Calculadora de materiales  (botones con data-abrir-calculadora)
   2) WhatsApp "Cotización Express" (convierte el botón flotante)
   3) Modo Obra: Todo / Maestro de Obra / Hogar

   Va DESPUÉS de script.js en cada página. No necesita editar nada
   más, salvo las fórmulas de la calculadora (sección 1).
========================================================= */
(function () {
    "use strict";

    var NUMERO = (typeof numeroWhatsApp !== "undefined") ? numeroWhatsApp : "573206150674";
    var sinMovimiento = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

    function $(sel, raiz) { return (raiz || document).querySelector(sel); }
    function linkWhatsApp(texto) { return "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(texto); }
    function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) {} }
    function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
    function fmt(n) { return Number(n).toLocaleString("es-CO", { maximumFractionDigits: 1 }); }

    /* =====================================================
       1) CALCULADORA DE MATERIALES
       -----------------------------------------------------
       Cada proyecto tiene sus medidas ("campos") y una función
       calc() que devuelve la lista de materiales.
       n = nombre, c = cantidad, u = unidad, paso = cuánto suman
       los botones + y − (por defecto 1).
       ⚠️ Son cantidades APROXIMADAS con reglas de uso común en
       obra. Ajusta los números si tu experiencia dice otra cosa.
    ===================================================== */
    var PROYECTOS = [
        {
            id: "techo", icono: "🏠", titulo: "Techar un cuarto",
            ayuda: "Mide el largo y el ancho del techo (si tiene pendiente, mide el largo inclinado).",
            campos: [
                { id: "largo", label: "Largo (m)", def: 4 },
                { id: "ancho", label: "Ancho (m)", def: 3 }
            ],
            calc: function (v) {
                var area = v.largo * v.ancho;
                return {
                    resumen: "techar un cuarto de " + fmt(v.largo) + " × " + fmt(v.ancho) + " m (" + fmt(area) + " m²)",
                    items: [
                        { n: "Teja Eternit 1.80 Mts", c: Math.ceil(area * 1.1 / 1.4), u: "unidades" },
                        { n: "Tornillos de fijación (autoperforantes)", c: Math.ceil(area * 5), u: "unidades" }
                    ]
                };
            }
        },
        {
            id: "electrica", icono: "💡", titulo: "Instalación eléctrica",
            ayuda: "Escribe los metros cuadrados de la vivienda o del local.",
            campos: [{ id: "m2", label: "Área (m²)", def: 50 }],
            calc: function (v) {
                var tomas = Math.ceil(v.m2 / 8);
                var swiches = Math.ceil(v.m2 / 15);
                var luces = Math.ceil(v.m2 / 10);
                return {
                    resumen: "una instalación eléctrica de " + fmt(v.m2) + " m²",
                    items: [
                        { n: "Tuberia Electrica ½ Pulg", c: Math.ceil(v.m2 * 0.8 / 3), u: "tubos de 3 m" },
                        { n: "Alambre N12 (tomas)", c: Math.ceil(v.m2 * 3), u: "metros" },
                        { n: "Alambre N14 (iluminación)", c: Math.ceil(v.m2 * 2.5), u: "metros" },
                        { n: "Toma Doble", c: tomas, u: "unidades" },
                        { n: "Swiche Balancin", c: swiches, u: "unidades" },
                        { n: "Plafón / portabombillo", c: luces, u: "unidades" },
                        { n: "Caja eléctrica", c: tomas + swiches + luces, u: "unidades" },
                        { n: "Breaker", c: Math.max(2, Math.ceil(v.m2 / 25)), u: "unidades" },
                        { n: "Cinta aislante", c: Math.max(1, Math.ceil(v.m2 / 30)), u: "rollos" }
                    ]
                };
            }
        },
        {
            id: "placa", icono: "🧱", titulo: "Placa o piso de concreto",
            ayuda: "Concreto 1:2:3 con malla electrosoldada. El espesor normal para un piso es de 8 a 10 cm.",
            campos: [
                { id: "m2", label: "Área (m²)", def: 20 },
                { id: "esp", label: "Espesor (cm)", def: 8 }
            ],
            calc: function (v) {
                var vol = v.m2 * v.esp / 100 * 1.05;
                return {
                    resumen: "una placa de " + fmt(v.m2) + " m² y " + fmt(v.esp) + " cm de espesor (" + fmt(vol) + " m³ de concreto)",
                    items: [
                        { n: "Cemento Gris Bto 50 Kl", c: Math.ceil(vol * 7), u: "bultos" },
                        { n: "Arena", c: Math.ceil(vol * 0.5 * 2) / 2, u: "m³", paso: 0.5 },
                        { n: "Triturado", c: Math.ceil(vol * 0.8 * 2) / 2, u: "m³", paso: 0.5 },
                        { n: "Malla Electrosoldada", c: Math.ceil(v.m2 * 1.1 / 14.1), u: "láminas" }
                    ]
                };
            }
        },
        {
            id: "muro", icono: "🧰", titulo: "Levantar un muro en bloque",
            ayuda: "Mide el largo y la altura del muro. Descuenta puertas y ventanas grandes.",
            campos: [
                { id: "largo", label: "Largo (m)", def: 5 },
                { id: "alto", label: "Alto (m)", def: 2.5 }
            ],
            calc: function (v) {
                var area = v.largo * v.alto;
                return {
                    resumen: "un muro en bloque de " + fmt(v.largo) + " × " + fmt(v.alto) + " m (" + fmt(area) + " m²)",
                    items: [
                        { n: "Bloque de muro (te confirmamos el tipo)", c: Math.ceil(area * 12.5 * 1.05), u: "unidades" },
                        { n: "Cemento Gris Bto 50 Kl", c: Math.ceil(area * 0.2), u: "bultos" },
                        { n: "Arena", c: Math.ceil(area * 0.03 * 2) / 2, u: "m³", paso: 0.5 }
                    ]
                };
            }
        },
        {
            id: "columnas", icono: "🏗️", titulo: "Fundir columnas",
            ayuda: "Columnas de 25 × 25 cm con 4 varillas de ½ pulgada y estribos cada 15 cm.",
            campos: [
                { id: "n", label: "Cantidad de columnas", def: 4, entero: true },
                { id: "h", label: "Altura de cada una (m)", def: 2.5 }
            ],
            calc: function (v) {
                var vol = v.n * 0.25 * 0.25 * v.h * 1.05;
                var estribos = v.n * Math.ceil(v.h / 0.15);
                return {
                    resumen: fmt(v.n) + " columna(s) de " + fmt(v.h) + " m de altura",
                    items: [
                        { n: "Varilla Grafilada ½ Pulg (6 m)", c: Math.ceil(v.n * 4 * v.h * 1.1 / 6), u: "varillas" },
                        { n: "Varilla Grafilada ¼ Pulg (estribos, 6 m)", c: Math.ceil(estribos * 0.95 / 6), u: "varillas" },
                        { n: "Alambre Negro Calibre 18 (amarre)", c: Math.max(1, Math.ceil(v.n * 0.25)), u: "kg" },
                        { n: "Cemento Gris Bto 50 Kl", c: Math.ceil(vol * 7), u: "bultos" },
                        { n: "Arena", c: Math.ceil(vol * 0.5 * 2) / 2, u: "m³", paso: 0.5 },
                        { n: "Triturado", c: Math.ceil(vol * 0.8 * 2) / 2, u: "m³", paso: 0.5 }
                    ]
                };
            }
        }
    ];

    var modal = null, abridor = null, estado = { proyecto: null, resultado: null };

    function crearModal() {
        if (modal) return;
        modal = document.createElement("div");
        modal.className = "calc-overlay";
        modal.innerHTML =
            '<div class="calc-modal" role="dialog" aria-modal="true" aria-labelledby="calc-titulo">' +
            '<button type="button" class="calc-cerrar" aria-label="Cerrar">✕</button>' +
            '<div class="calc-cuerpo"></div></div>';
        document.body.appendChild(modal);

        modal.addEventListener("click", function (e) { if (e.target === modal) cerrarCalculadora(); });
        $(".calc-cerrar", modal).addEventListener("click", cerrarCalculadora);
        modal.addEventListener("keydown", function (e) {
            if (e.key === "Escape") { cerrarCalculadora(); return; }
            if (e.key !== "Tab") return;
            var f = modal.querySelectorAll("button, a[href], input");
            if (!f.length) return;
            var primero = f[0], ultimo = f[f.length - 1];
            if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
            else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
        });
    }

    function abrirCalculadora(desde) {
        crearModal();
        abridor = desde || null;
        estado = { proyecto: null, resultado: null };
        pintarPaso1();
        modal.classList.add("abierto");
        document.body.classList.add("calc-bloquea");
    }

    function cerrarCalculadora() {
        if (!modal) return;
        modal.classList.remove("abierto");
        document.body.classList.remove("calc-bloquea");
        if (abridor && abridor.focus) abridor.focus();
    }

    function cuerpo() { return $(".calc-cuerpo", modal); }

    // Paso 1: ¿qué vas a hacer?
    function pintarPaso1() {
        cuerpo().innerHTML =
            '<h2 id="calc-titulo">¿Qué vas a hacer?</h2>' +
            '<p class="calc-sub">Elige tu proyecto, escribe las medidas y te armamos la lista de materiales.</p>' +
            '<div class="calc-opciones">' +
            PROYECTOS.map(function (p) {
                return '<button type="button" class="calc-opcion" data-id="' + p.id + '">' +
                    '<span class="calc-opcion-icono" aria-hidden="true">' + p.icono + '</span>' +
                    '<span>' + p.titulo + '</span></button>';
            }).join("") + '</div>';
        cuerpo().querySelectorAll(".calc-opcion").forEach(function (b) {
            b.addEventListener("click", function () {
                estado.proyecto = PROYECTOS.filter(function (p) { return p.id === b.dataset.id; })[0];
                pintarPaso2();
            });
        });
        var primero = $(".calc-opcion", modal); if (primero) primero.focus();
    }

    // Paso 2: medidas
    function pintarPaso2(error) {
        var p = estado.proyecto;
        cuerpo().innerHTML =
            '<h2 id="calc-titulo">' + p.icono + ' ' + p.titulo + '</h2>' +
            '<p class="calc-sub">' + p.ayuda + '</p>' +
            '<form class="calc-form" novalidate>' +
            p.campos.map(function (c) {
                return '<label class="calc-campo"><span>' + c.label + '</span>' +
                    '<input type="text" inputmode="decimal" name="' + c.id + '" value="' + c.def + '" autocomplete="off"></label>';
            }).join("") +
            '<p class="calc-error" role="alert">' + (error || "") + '</p>' +
            '<div class="calc-acciones">' +
            '<button type="button" class="calc-btn calc-btn-suave" data-accion="atras">Cambiar proyecto</button>' +
            '<button type="submit" class="calc-btn calc-btn-principal">Calcular materiales</button>' +
            '</div></form>';

        var form = $(".calc-form", modal);
        $('[data-accion="atras"]', form).addEventListener("click", pintarPaso1);
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var valores = {}, ok = true;
            p.campos.forEach(function (c) {
                var n = parseFloat(String(form.elements[c.id].value).replace(",", "."));
                if (!(n > 0) || n > 1000) ok = false;
                valores[c.id] = c.entero ? Math.round(n) : n;
            });
            if (!ok) { pintarPaso2("Escribe medidas mayores que cero (usa números, por ejemplo 3,5)."); return; }
            estado.resultado = p.calc(valores);
            pintarPaso3();
        });
        var f = $("input", form); if (f) { f.focus(); f.select(); }
    }

    // Paso 3: lista de materiales, lista para WhatsApp
    function textoPedido() {
        var r = estado.resultado;
        var lineas = r.items.filter(function (i) { return i.c > 0; }).map(function (i, k) {
            return (k + 1) + ". " + i.n + " — " + fmt(i.c) + " " + i.u;
        });
        return "Hola Himecon, quiero cotizar estos materiales para " + r.resumen + ":\n\n" +
            lineas.join("\n") +
            "\n\n(Cálculo aproximado hecho en la página.) ¿Me confirman disponibilidad y precio?";
    }

    function actualizarEnlace() {
        var a = $(".calc-enviar", modal);
        var hay = estado.resultado.items.some(function (i) { return i.c > 0; });
        a.href = hay ? linkWhatsApp(textoPedido()) : "#";
        a.classList.toggle("deshabilitado", !hay);
    }

    function pintarPaso3() {
        var r = estado.resultado;
        cuerpo().innerHTML =
            '<h2 id="calc-titulo">Tu lista de materiales</h2>' +
            '<p class="calc-sub">Para ' + r.resumen + '. Ajusta las cantidades si quieres.</p>' +
            '<ul class="calc-lista">' +
            r.items.map(function (i, k) {
                return '<li data-k="' + k + '"><div class="calc-item-nombre"><strong>' + i.n + '</strong><small>' + i.u + '</small></div>' +
                    '<div class="calc-cant">' +
                    '<button type="button" data-d="-1" aria-label="Quitar uno de ' + i.n + '">−</button>' +
                    '<output>' + fmt(i.c) + '</output>' +
                    '<button type="button" data-d="1" aria-label="Agregar uno de ' + i.n + '">+</button></div></li>';
            }).join("") + '</ul>' +
            '<p class="calc-nota">Son cantidades aproximadas; en la tienda te las confirmamos y te damos el precio.</p>' +
            '<div class="calc-acciones">' +
            '<button type="button" class="calc-btn calc-btn-suave" data-accion="atras">Cambiar medidas</button>' +
            '<a class="calc-btn calc-btn-wa calc-enviar" href="#" target="_blank" rel="noopener">Enviar por WhatsApp</a>' +
            '</div>';

        $('[data-accion="atras"]', modal).addEventListener("click", function () { pintarPaso2(); });
        cuerpo().querySelectorAll(".calc-cant button").forEach(function (b) {
            b.addEventListener("click", function () {
                var li = b.closest("li");
                var item = r.items[Number(li.dataset.k)];
                var paso = item.paso || 1;
                item.c = Math.max(0, Math.round((item.c + Number(b.dataset.d) * paso) * 10) / 10);
                $("output", li).textContent = fmt(item.c);
                li.classList.toggle("en-cero", item.c === 0);
                actualizarEnlace();
            });
        });
        actualizarEnlace();
        var enviar = $(".calc-enviar", modal); if (enviar) enviar.focus();
    }

    document.addEventListener("click", function (e) {
        var b = e.target.closest("[data-abrir-calculadora]");
        if (b) { e.preventDefault(); abrirCalculadora(b); }
    });

    /* =====================================================
       2) WHATSAPP "COTIZACIÓN EXPRESS"
    ===================================================== */
    var TEMAS = [
        ["Hierros", "hierros"],
        ["Eléctricos", "materiales eléctricos"],
        ["Cemento y Arena", "cemento y arena"]
    ];

    function iniciarWhatsapp() {
        var ancla = $(".whatsapp-flotante");
        if (!ancla || ancla.parentNode.classList.contains("wa-cot")) return;

        var cont = document.createElement("div");
        cont.className = "wa-cot";
        ancla.parentNode.insertBefore(cont, ancla);

        var menu = document.createElement("div");
        menu.className = "wa-menu";
        menu.id = "wa-menu";
        menu.innerHTML =
            '<p class="wa-menu-titulo">¿Qué deseas cotizar hoy?</p>' +
            '<div class="wa-menu-opciones">' +
            TEMAS.map(function (t) {
                return '<a href="' + linkWhatsApp("Hola Himecon, estoy interesado en cotizar " + t[1] + ", ¿me dan precios?") +
                    '" target="_blank" rel="noopener">' + t[0] + '</a>';
            }).join("") +
            '<a class="wa-otra" href="' + linkWhatsApp("Hola Himecon, quisiera hacer una consulta.") +
            '" target="_blank" rel="noopener">Otra consulta</a></div>';
        cont.appendChild(menu);
        cont.appendChild(ancla);

        ancla.setAttribute("aria-haspopup", "true");
        ancla.setAttribute("aria-controls", "wa-menu");
        ancla.setAttribute("aria-expanded", "false");

        var tocar = !(window.matchMedia && matchMedia("(hover: hover)").matches);
        var espera = null;

        function abrir() { clearTimeout(espera); cont.classList.add("abierto"); ancla.setAttribute("aria-expanded", "true"); }
        function cerrar() { clearTimeout(espera); cont.classList.remove("abierto"); ancla.setAttribute("aria-expanded", "false"); }

        if (!tocar) {
            cont.addEventListener("mouseenter", function () { clearTimeout(espera); espera = setTimeout(abrir, 120); });
            cont.addEventListener("mouseleave", function () { clearTimeout(espera); espera = setTimeout(cerrar, 250); });
        }
        cont.addEventListener("focusin", abrir);
        cont.addEventListener("focusout", function (e) { if (!cont.contains(e.relatedTarget)) cerrar(); });
        // En celular: el primer toque abre el menú (el chat general queda en "Otra consulta")
        ancla.addEventListener("click", function (e) {
            if (tocar) { e.preventDefault(); cont.classList.contains("abierto") ? cerrar() : abrir(); }
        });
        document.addEventListener("click", function (e) { if (!cont.contains(e.target)) cerrar(); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });

        if (sinMovimiento) return;

        // Efecto magnético: el botón se inclina hacia el cursor cuando está cerca
        document.addEventListener("pointermove", function (e) {
            if (e.pointerType !== "mouse") return;
            var r = ancla.getBoundingClientRect();
            var dx = e.clientX - (r.left + r.width / 2);
            var dy = e.clientY - (r.top + r.height / 2);
            var d = Math.sqrt(dx * dx + dy * dy), alcance = 130;
            if (d < alcance) {
                var f = (1 - d / alcance) * 0.3;
                ancla.style.setProperty("--mx", (dx * f).toFixed(1) + "px");
                ancla.style.setProperty("--my", (dy * f).toFixed(1) + "px");
            } else {
                ancla.style.setProperty("--mx", "0px");
                ancla.style.setProperty("--my", "0px");
            }
        }, { passive: true });

        // Al hacer scroll, el botón se mueve un poquito para llamar la atención
        var ultimoY = window.scrollY, quieto = null;
        window.addEventListener("scroll", function () {
            var d = window.scrollY - ultimoY;
            ultimoY = window.scrollY;
            if (Math.abs(d) < 2) return;
            ancla.style.setProperty("--nudge", Math.max(-9, Math.min(9, -d * 0.6)).toFixed(1) + "px");
            clearTimeout(quieto);
            quieto = setTimeout(function () { ancla.style.setProperty("--nudge", "0px"); }, 140);
        }, { passive: true });
    }

    /* =====================================================
       3) MODO OBRA (Todo / Maestro de Obra / Hogar)
    ===================================================== */
    var PERFILES = {
        maestro: {
            nombre: "Maestro de Obra",
            etiqueta: "Para obra",
            cats: ["hierros", "mallas", "mallasinventario", "cemento", "galvanizadoinventario", "tejas", "alambres", "maderas"],
            herr: /palustre|llana|plomada|cincel|pulidora|taladro|rotomartillo|mezclador|bugui|pala |pica |azadon|cizalla|dobladora|tronzadora|esmeril|nivel|flexometro|decametro|cortafrio|porra|barreton|tenaza|casco|botas|arnes|chaleco/i,
            hero: "Hierros, mallas, cemento y todo para la obra, con las cantidades listas para cotizar.",
            atajos: [["Hierros", "hierros"], ["Mallas", "mallas"], ["Cemento", "cemento"], ["Tejas", "tejas"]]
        },
        hogar: {
            nombre: "Hogar",
            etiqueta: "Para el hogar",
            cats: ["iluminacion", "pintura", "griferia", "cerrajeria", "ceramica", "electricos"],
            herr: /destornillador|martillo|alicate|pinza|brocha|rodillo|espatula|flexometro|escalera|linterna|cinta|llave|silicona|pegante|tijera|escoba|gafa|guante|segueta|serrucho|lima/i,
            hero: "Iluminación, pintura, grifería y herramientas livianas para arreglar y mejorar tu casa.",
            atajos: [["Iluminación", "iluminacion"], ["Pintura", "pintura"], ["Grifería", "griferia"], ["Eléctricos", "electricos"]]
        }
    };

    var perfil = leer("himecon-perfil");
    if (!PERFILES[perfil]) perfil = null;

    function esDestacado(p) {
        if (!perfil) return false;
        var cfg = PERFILES[perfil];
        if (cfg.cats.indexOf(p.categoria) !== -1) return true;
        return p.categoria === "herramienta" && cfg.herr.test(p.nombre);
    }

    function irACategoria(valor) {
        var botones = document.querySelectorAll(".categorias button");
        for (var i = 0; i < botones.length; i++) {
            if ((botones[i].getAttribute("onclick") || "").indexOf("'" + valor + "'") !== -1) { botones[i].click(); return true; }
        }
        return false;
    }

    function construirSwitch() {
        var nav = $("header nav");
        if (!nav || $(".perfil-switch")) return;
        var caja = document.createElement("div");
        caja.className = "perfil-switch";
        caja.setAttribute("role", "group");
        caja.setAttribute("aria-label", "Modo de la página");
        [
            ["", "Todo", "Mostrar el catálogo completo"],
            ["maestro", "🏗️ Obra", "Modo Maestro de Obra: resalta hierros, mallas y cemento"],
            ["hogar", "🏠 Hogar", "Modo Hogar: resalta iluminación, pintura y herramientas livianas"]
        ].forEach(function (o) {
            var b = document.createElement("button");
            b.type = "button";
            b.dataset.perfil = o[0];
            b.textContent = o[1];
            b.title = o[2];
            b.addEventListener("click", function () { aplicarPerfil(o[0] || null); });
            caja.appendChild(b);
        });
        var oscuro = $("#boton-modo-oscuro", nav);
        nav.insertBefore(caja, oscuro || null);
    }

    function adaptarHero() {
        var hero = $(".hero-text");
        var p = hero && $("p", hero);
        if (!p) return;
        if (!p.dataset.original) p.dataset.original = p.textContent;
        p.textContent = perfil ? PERFILES[perfil].hero : p.dataset.original;

        var at = $(".hero-atajos", hero);
        if (!perfil) { if (at) at.remove(); return; }
        if (!at) { at = document.createElement("div"); at.className = "hero-atajos"; hero.appendChild(at); }
        at.innerHTML = "<span>Atajos para ti:</span>" + PERFILES[perfil].atajos.map(function (a) {
            return '<a href="productos.html?cat=' + a[1] + '">' + a[0] + "</a>";
        }).join("");
    }

    function pintarAtajosProductos() {
        var campo = $("#buscador");
        if (!campo || !$("#panel-filtros")) return;
        var at = $("#atajos-perfil");
        if (!perfil) { if (at) at.remove(); return; }
        if (!at) { at = document.createElement("div"); at.id = "atajos-perfil"; campo.insertAdjacentElement("afterend", at); }
        at.innerHTML = "<span>" + PERFILES[perfil].nombre + ":</span>";
        PERFILES[perfil].atajos.forEach(function (a) {
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = a[0];
            b.addEventListener("click", function () {
                if (irACategoria(a[1])) {
                    var lista = document.getElementById("productos");
                    if (lista) lista.scrollIntoView({ behavior: sinMovimiento ? "auto" : "smooth", block: "start" });
                }
            });
            at.appendChild(b);
        });
    }

    function aplicarPerfil(nuevo) {
        perfil = PERFILES[nuevo] ? nuevo : null;
        guardar("himecon-perfil", perfil || "");
        document.body.classList.remove("perfil-maestro", "perfil-hogar");
        if (perfil) document.body.classList.add("perfil-" + perfil);
        document.querySelectorAll(".perfil-switch button").forEach(function (b) {
            var activo = (b.dataset.perfil || null) === perfil;
            b.classList.toggle("activo", activo);
            b.setAttribute("aria-pressed", activo ? "true" : "false");
        });
        adaptarHero();
        pintarAtajosProductos();
        if (typeof filtrarLista === "function" && document.getElementById("productos")) filtrarLista();
    }

    // Los productos del perfil salen primero (solo en la vista "Todos") y con su etiqueta
    if (typeof mostrarProductos === "function" && typeof construirTarjeta === "function") {
        var mostrarOriginal = mostrarProductos;
        var tarjetaOriginal = construirTarjeta;

        window.mostrarProductos = function (lista) {
            if (perfil && categoriaActual === "todos") {
                var primeros = [], resto = [];
                lista.forEach(function (p) { (esDestacado(p) ? primeros : resto).push(p); });
                lista = primeros.concat(resto);
            }
            return mostrarOriginal(lista);
        };
        window.construirTarjeta = function (producto, i) {
            var html = tarjetaOriginal(producto, i);
            return esDestacado(producto)
                ? html.replace('<div class="producto">', '<div class="producto producto-destacado">')
                : html;
        };
    }

    /* =====================================================
       ARRANQUE
    ===================================================== */
    iniciarWhatsapp();
    construirSwitch();
    aplicarPerfil(perfil);

    // Enlaces tipo productos.html?cat=hierros (vienen de los atajos del inicio)
    var cat = new URLSearchParams(location.search).get("cat");
    if (cat) irACategoria(cat);
})();
