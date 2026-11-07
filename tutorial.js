/* =========================================================
   HIMECON - TUTORIAL DE BIENVENIDA (tutorial.js)
   Recorrido guiado que aparece la primera vez que el cliente
   entra a productos.html. Se puede omitir en cualquier momento
   y volver a abrir con el botón "❓ ¿Cómo usar?".
   No modifica script.js ni extras.js.
   ========================================================= */
(function () {
    "use strict";

    var KEY_VISTO = "himecon-tutorial-visto";
    var sinMov = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var esCelular = function () { return window.innerWidth <= 600; };

    function yaLoVio() {
        try { return localStorage.getItem(KEY_VISTO) === "1"; } catch (e) { return false; }
    }
    function marcarVisto() {
        try { localStorage.setItem(KEY_VISTO, "1"); } catch (e) {}
    }
    function visible(el) {
        return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    }

    /* ------------------- PASOS -------------------
       objetivo: función que devuelve el elemento a resaltar
       (null = ventana centrada, sin resaltar nada). */
    function primeraTarjeta() { return document.querySelector("#productos .producto"); }

    function pasos() {
        var lista = [
            {
                titulo: "¡Bienvenido a Himecon! 👋",
                texto: "Te mostramos en menos de un minuto cómo encontrar tus materiales y pedirlos por WhatsApp.",
                objetivo: function () { return null; },
                siguiente: "Empezar recorrido"
            },
            {
                titulo: "1. Busca lo que necesitas",
                texto: "Escribe el nombre del producto y verás sugerencias. Si te equivocas al escribir, igual lo encontramos.",
                objetivo: function () { return document.getElementById("buscador"); }
            },
            {
                titulo: "2. Filtra por categoría",
                texto: "Pulsa «Filtros» para elegir entre tubos, hierros, eléctricos, pintura y más. Puedes mostrarlos u ocultarlos cuando quieras.",
                objetivo: function () { return document.getElementById("boton-filtros"); }
            },
            {
                titulo: "3. Mira cada producto",
                texto: function () {
                    var t = "Toca la foto para verla grande. «Solicitar por WhatsApp» pregunta por ese producto al instante.";
                    if (document.querySelector("#productos .pu-fav")) {
                        t = "Toca la foto para verla grande. El ❤ lo guarda en favoritos y el ícono de compartir lo envía por WhatsApp.";
                    }
                    return t;
                },
                objetivo: function () {
                    var t = primeraTarjeta();
                    if (!t) return null;
                    // En celular se resalta solo la foto para que no tape la explicación
                    return esCelular() ? (t.querySelector("img") || t) : t;
                }
            },
            {
                titulo: "4. Arma tu pedido",
                texto: "Con «Agregar al pedido» juntas varios productos y los envías todos en un solo mensaje. Te aparecerá un botón 🛒 que puedes arrastrar donde no estorbe.",
                objetivo: function () {
                    var t = primeraTarjeta();
                    return t ? t.querySelector(".boton-agregar-pedido") : null;
                }
            },
            {
                titulo: "5. ¿No sabes qué cantidad llevar?",
                texto: "Cuéntanos qué vas a construir y la calculadora te arma la lista de materiales. ¡Listo, ya sabes usar la página!",
                objetivo: function () { return document.querySelector("[data-abrir-calculadora]"); },
                siguiente: "¡Listo!"
            }
        ];
        // Si un elemento no existe en esta página, ese paso se salta
        return lista.filter(function (p, i) {
            if (i === 0) return true;
            var el = p.objetivo();
            return visible(el);
        });
    }

    /* ------------------- ESTADO Y ELEMENTOS ------------------- */
    var activo = false;
    var lista = [];
    var indice = 0;
    var capa, foco, caja, elTitulo, elTexto, elPuntos, bAnterior, bSiguiente, bOmitir, elContador;
    var focoPrevio = null;
    var pendiente = null;

    function crear() {
        capa = document.createElement("div");
        capa.className = "tu-capa";

        foco = document.createElement("div");
        foco.className = "tu-foco sin-objetivo";

        caja = document.createElement("div");
        caja.className = "tu-caja";
        caja.setAttribute("role", "dialog");
        caja.setAttribute("aria-modal", "true");
        caja.setAttribute("aria-labelledby", "tu-titulo");
        caja.innerHTML =
            '<button type="button" class="tu-cerrar" aria-label="Omitir tutorial">✕</button>' +
            '<p class="tu-contador"></p>' +
            '<h3 id="tu-titulo"></h3>' +
            '<p class="tu-texto"></p>' +
            '<div class="tu-puntos" aria-hidden="true"></div>' +
            '<div class="tu-botones">' +
                '<button type="button" class="tu-omitir">Omitir</button>' +
                '<span class="tu-espacio"></span>' +
                '<button type="button" class="tu-anterior">Anterior</button>' +
                '<button type="button" class="tu-siguiente">Siguiente</button>' +
            '</div>';

        elTitulo = caja.querySelector("h3");
        elTexto = caja.querySelector(".tu-texto");
        elPuntos = caja.querySelector(".tu-puntos");
        elContador = caja.querySelector(".tu-contador");
        bAnterior = caja.querySelector(".tu-anterior");
        bSiguiente = caja.querySelector(".tu-siguiente");
        bOmitir = caja.querySelector(".tu-omitir");

        caja.querySelector(".tu-cerrar").addEventListener("click", function () { terminar(true); });
        bOmitir.addEventListener("click", function () { terminar(true); });
        bAnterior.addEventListener("click", function () { ir(indice - 1); });
        bSiguiente.addEventListener("click", function () {
            if (indice >= lista.length - 1) terminar(false);
            else ir(indice + 1);
        });

        // La capa bloquea clics y el scroll con el dedo/rueda mientras dura el recorrido
        capa.addEventListener("wheel", function (e) { e.preventDefault(); }, { passive: false });
        capa.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });

        document.body.appendChild(capa);
        document.body.appendChild(foco);
        document.body.appendChild(caja);
    }

    function pintarPuntos() {
        var h = "";
        for (var i = 0; i < lista.length; i++) h += '<i class="' + (i === indice ? "activo" : "") + '"></i>';
        elPuntos.innerHTML = h;
    }

    /* ------------------- POSICIONES ------------------- */
    function colocar() {
        if (!activo) return;
        var paso = lista[indice];
        var el = paso.objetivo();
        var tieneObjetivo = visible(el);

        if (tieneObjetivo) {
            var r = el.getBoundingClientRect();
            var pad = 10;
            foco.classList.remove("sin-objetivo");
            foco.style.top = (r.top - pad) + "px";
            foco.style.left = (r.left - pad) + "px";
            foco.style.width = (r.width + pad * 2) + "px";
            foco.style.height = (r.height + pad * 2) + "px";
        } else {
            foco.classList.add("sin-objetivo");
            foco.style.top = "45%";
            foco.style.left = "50%";
            foco.style.width = "0px";
            foco.style.height = "0px";
        }

        if (esCelular()) {
            // En celular la explicación va fija abajo (lo define el CSS)
            caja.style.top = "";
            caja.style.left = "";
            return;
        }

        var w = caja.offsetWidth, h = caja.offsetHeight;
        var top, left;
        if (!tieneObjetivo) {
            top = (window.innerHeight - h) / 2;
            left = (window.innerWidth - w) / 2;
        } else {
            var rr = el.getBoundingClientRect();
            top = rr.bottom + 22;
            if (top + h > window.innerHeight - 12) top = rr.top - 22 - h;
            if (top < 12) top = Math.max(12, window.innerHeight - h - 16);
            left = rr.left + rr.width / 2 - w / 2;
        }
        left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
        caja.style.top = top + "px";
        caja.style.left = left + "px";
    }

    function pedirColocar() {
        if (pendiente) return;
        pendiente = requestAnimationFrame(function () { pendiente = null; colocar(); });
    }

    /* ------------------- NAVEGAR ------------------- */
    function ir(n) {
        if (n < 0 || n >= lista.length) return;
        indice = n;
        var paso = lista[n];
        var el = paso.objetivo();

        // Lleva el elemento a una zona cómoda de la pantalla (salto directo, sin deslizar)
        if (visible(el)) {
            var r = el.getBoundingClientRect();
            var destino = esCelular() ? 90 : (window.innerHeight - r.height) / 2;
            var y = window.scrollY + r.top - Math.max(destino, 80);
            window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
        }

        elTitulo.textContent = paso.titulo;
        elTexto.textContent = typeof paso.texto === "function" ? paso.texto() : paso.texto;
        elContador.textContent = n === 0 ? "" : "Paso " + n + " de " + (lista.length - 1);
        bAnterior.style.visibility = n === 0 ? "hidden" : "visible";
        bSiguiente.textContent = paso.siguiente || "Siguiente";
        pintarPuntos();

        colocar();
        // Un segundo ajuste por si el navegador terminó de mover la pantalla después
        setTimeout(colocar, 80);
        bSiguiente.focus({ preventScroll: true });
    }

    function alTeclear(e) {
        if (!activo) return;
        if (e.key === "Escape") { e.preventDefault(); terminar(true); }
        else if (e.key === "ArrowRight") { e.preventDefault(); if (indice < lista.length - 1) ir(indice + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); if (indice > 0) ir(indice - 1); }
        else if (e.key === "Tab") {
            // Mantiene el foco dentro del cuadro
            var botones = Array.prototype.filter.call(caja.querySelectorAll("button"), function (b) { return b.style.visibility !== "hidden"; });
            if (!botones.length) return;
            var primero = botones[0], ultimo = botones[botones.length - 1];
            if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
            else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
        }
    }

    function aviso(texto) {
        var a = document.createElement("div");
        a.className = "tu-aviso";
        a.setAttribute("role", "status");
        a.textContent = texto;
        document.body.appendChild(a);
        requestAnimationFrame(function () { a.classList.add("visible"); });
        setTimeout(function () {
            a.classList.remove("visible");
            setTimeout(function () { a.remove(); }, 400);
        }, 3600);
    }

    function terminar(omitido) {
        if (!activo) return;
        activo = false;
        marcarVisto();
        document.removeEventListener("keydown", alTeclear, true);
        window.removeEventListener("resize", pedirColocar);
        window.removeEventListener("scroll", pedirColocar);
        [capa, foco, caja].forEach(function (n) { if (n && n.parentNode) n.parentNode.removeChild(n); });
        window.scrollTo({ top: 0, behavior: "instant" });
        if (focoPrevio && focoPrevio.focus) { try { focoPrevio.focus({ preventScroll: true }); } catch (e) {} }
        if (omitido) aviso("Puedes volver a verlo cuando quieras con el botón ❓ ¿Cómo usar?");
    }

    function iniciar() {
        if (activo) return;
        lista = pasos();
        if (lista.length < 2) return;
        activo = true;
        focoPrevio = document.activeElement;
        crear();
        document.addEventListener("keydown", alTeclear, true);
        window.addEventListener("resize", pedirColocar);
        window.addEventListener("scroll", pedirColocar, { passive: true });
        ir(0);
    }

    /* ------------------- BOTÓN "¿CÓMO USAR?" ------------------- */
    function ponerBoton() {
        var banda = document.querySelector(".calc-banda");
        if (!banda || document.getElementById("tu-boton-ayuda")) return;
        var b = document.createElement("button");
        b.type = "button";
        b.id = "tu-boton-ayuda";
        b.className = "boton tu-ayuda";
        b.textContent = "❓ ¿Cómo usar?";
        b.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "instant" });
            iniciar();
        });
        var calc = banda.querySelector("[data-abrir-calculadora]");
        banda.insertBefore(b, calc ? calc.nextSibling : banda.firstChild);
    }

    /* ------------------- ARRANQUE ------------------- */
    function arrancar() {
        if (!document.getElementById("productos")) return;   // solo en productos.html
        ponerBoton();
        if (yaLoVio()) return;
        // Si llegó por un producto compartido, no se le interrumpe (puede abrirlo con el botón)
        var params = new URLSearchParams(location.search);
        if (params.get("q")) return;

        // Espera a que haya productos pintados (o 6 segundos como máximo)
        var intentos = 0;
        (function esperar() {
            if (primeraTarjeta() || intentos++ > 30) {
                setTimeout(iniciar, 500);
            } else {
                setTimeout(esperar, 200);
            }
        })();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar);
    else arrancar();
})();
