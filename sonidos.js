/* =========================================================
   HIMECON - SONIDOS SUAVES (sonidos.js)
   Sonidos cortos al tocar botones, agregar al pedido y guardar
   favoritos. Se generan con el navegador (Web Audio): no hay
   archivos de audio que descargar.
   Incluye un botón 🔊/🔇 para apagarlos; se recuerda la elección.
   No modifica script.js, extras.js ni pulido.js.
   ========================================================= */
(function () {
    "use strict";

    // ⚙️ AJUSTES (puedes cambiarlos)
    var ACTIVO_POR_DEFECTO = true;   // false = empiezan apagados y el cliente los enciende con 🔊
    var VOLUMEN = 1;                 // 0.5 = más bajito, 1 = normal (ya son suaves)
    var KEY = "himecon-sonido";

    var Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;           // navegador sin audio: no hace nada

    var ctx = null;
    var ultimo = 0;

    function leer() {
        try {
            var v = localStorage.getItem(KEY);
            if (v === "1") return true;
            if (v === "0") return false;
        } catch (e) {}
        return ACTIVO_POR_DEFECTO;
    }
    function guardar(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {} }

    var encendido = leer();

    function contexto() {
        if (!ctx) { try { ctx = new Contexto(); } catch (e) { return null; } }
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        return ctx;
    }

    // Un tono corto con entrada y salida suave (para que no "truene")
    function tono(c, freq, inicio, dur, vol, freqFin) {
        var o = c.createOscillator(), g = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, inicio);
        if (freqFin) o.frequency.exponentialRampToValueAtTime(freqFin, inicio + dur);
        g.gain.setValueAtTime(0.0001, inicio);
        g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol * VOLUMEN), inicio + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, inicio + dur);
        o.connect(g);
        g.connect(c.destination);
        o.start(inicio);
        o.stop(inicio + dur + 0.03);
    }

    var SONIDOS = {
        clic:    function (c, t) { tono(c, 720, t, 0.05, 0.05, 520); },
        agregar: function (c, t) { tono(c, 523, t, 0.09, 0.07); tono(c, 784, t + 0.07, 0.13, 0.07); },
        quitar:  function (c, t) { tono(c, 660, t, 0.1, 0.05, 420); },
        fav:     function (c, t) { tono(c, 600, t, 0.1, 0.07, 900); tono(c, 1200, t + 0.07, 0.1, 0.035); },
        listo:   function (c, t) { tono(c, 523, t, 0.09, 0.06); tono(c, 659, t + 0.08, 0.09, 0.06); tono(c, 784, t + 0.16, 0.16, 0.06); }
    };

    function sonar(nombre) {
        if (!encendido || document.hidden) return;
        var ahora = Date.now();
        if (ahora - ultimo < 45) return;         // evita sonidos montados
        ultimo = ahora;
        var c = contexto();
        if (!c || !SONIDOS[nombre]) return;
        SONIDOS[nombre](c, c.currentTime + 0.01);
        // Vibración muy corta en celulares Android (donde se pueda)
        if ((nombre === "agregar" || nombre === "fav") && navigator.vibrate) { try { navigator.vibrate(10); } catch (e) {} }
    }

    /* ---------- Qué sonido corresponde a cada toque ---------- */
    // Se escucha en fase de captura: el estado del botón es el de ANTES de tocarlo
    document.addEventListener("click", function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        if (t.closest("#boton-sonido")) return;   // el interruptor tiene su propio sonido

        var fav = t.closest(".pu-fav");
        if (fav) return sonar(fav.classList.contains("activo") ? "quitar" : "fav");

        var agregar = t.closest(".boton-agregar-pedido");
        if (agregar) return sonar(agregar.classList.contains("agregado") ? "quitar" : "agregar");

        var siguiente = t.closest(".tu-siguiente");
        if (siguiente && /listo/i.test(siguiente.textContent)) return sonar("listo");

        var enviar = t.closest("#boton-enviar-pedido, .calc-btn-wa, .wa-menu-opciones a");
        if (enviar) return sonar("listo");

        if (t.closest("button, a.boton, .boton, .calc-opcion, #pu-sugerencias li[data-nombre]")) sonar("clic");
    }, true);

    /* ---------- Interruptor 🔊 / 🔇 ---------- */
    function estilos() {
        var s = document.createElement("style");
        s.textContent =
            "#boton-sonido{position:fixed;left:24px;bottom:88px;z-index:900;width:40px;height:40px;" +
            "display:grid;place-items:center;padding:0;border:1px solid #e6ecf3;border-radius:50%;" +
            "background:rgba(255,255,255,.95);color:#1c2430;font-size:18px;line-height:1;cursor:pointer;" +
            "box-shadow:0 4px 12px rgba(20,40,80,.14);transition:transform .2s ease}" +
            "#boton-sonido:hover{transform:scale(1.08)}" +
            "#boton-sonido.apagado{opacity:.75}" +
            "body.modo-oscuro #boton-sonido{background:rgba(38,38,38,.95);border-color:#3a3a3a;color:#e6e6e6}" +
            "@media (max-width:768px){#boton-sonido{left:16px;bottom:calc(80px + env(safe-area-inset-bottom,0px));width:38px;height:38px}}" +
            "@media (prefers-reduced-motion:reduce){#boton-sonido{transition:none}}";
        document.head.appendChild(s);
    }

    function pintar(b) {
        b.textContent = encendido ? "🔊" : "🔇";
        b.classList.toggle("apagado", !encendido);
        b.setAttribute("aria-pressed", encendido ? "true" : "false");
        b.setAttribute("aria-label", encendido ? "Apagar sonidos" : "Encender sonidos");
        b.title = encendido ? "Sonidos encendidos (toca para apagar)" : "Sonidos apagados (toca para encender)";
    }

    function ponerInterruptor() {
        if (document.getElementById("boton-sonido")) return;
        estilos();
        var b = document.createElement("button");
        b.type = "button";
        b.id = "boton-sonido";
        pintar(b);
        b.addEventListener("click", function () {
            encendido = !encendido;
            guardar(encendido);
            pintar(b);
            if (encendido) sonar("clic");
        });
        document.body.appendChild(b);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ponerInterruptor);
    else ponerInterruptor();
})();
