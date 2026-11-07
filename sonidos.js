/* =========================================================
   HIMECON - SONIDOS SUAVES TIPO ASMR (sonidos.js)
   Siempre activos (sin botón para apagarlos).
   Suenan: agregar/quitar del pedido, favoritos, los "listo",
   cualquier botón o enlace que se toque, y un roce muy suave
   al hacer scroll.
   Los sonidos se generan con el navegador (Web Audio): no hay
   archivos de audio.
   No modifica script.js, extras.js ni pulido.js.
   ========================================================= */
(function () {
    "use strict";

    // ⚙️ AJUSTES (puedes cambiarlos)
    var VOLUMEN = 1;                 // 0.5 = más bajito, 1 = normal
    var ECO = 0.32;                  // 0 = sin eco, 0.5 = más "espacio"
    var SCROLL_ACTIVO = true;        // false = sin sonido al hacer scroll
    var SCROLL_CADA_MS = 140;        // más alto = menos sonidos al desplazar
    var SCROLL_VOLUMEN = 0.03;       // volumen del roce al hacer scroll

    var Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;           // navegador sin audio: no hace nada

    var ctx = null, maestro = null, ruido = null;
    var ultimo = 0, ultimoScroll = 0;

    /* ---------- Preparación del audio ---------- */
    function impulso(c) {
        var n = Math.floor(c.sampleRate * 0.9);
        var b = c.createBuffer(2, n, c.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = b.getChannelData(ch);
            for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3.2);
        }
        return b;
    }

    function preparar(c) {
        if (maestro) return;
        maestro = c.createGain();
        maestro.gain.value = VOLUMEN;

        var suave = c.createBiquadFilter();
        suave.type = "lowpass";
        suave.frequency.value = 5200;
        suave.Q.value = 0.5;

        var seco = c.createGain();
        seco.gain.value = 0.85;
        var humedo = c.createGain();
        humedo.gain.value = ECO;
        var eco = c.createConvolver();
        eco.buffer = impulso(c);

        maestro.connect(suave);
        suave.connect(seco);
        seco.connect(c.destination);
        suave.connect(humedo);
        humedo.connect(eco);
        eco.connect(c.destination);

        var n = Math.floor(c.sampleRate * 0.25);
        ruido = c.createBuffer(1, n, c.sampleRate);
        var d = ruido.getChannelData(0);
        for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }

    function contexto() {
        if (!ctx) { try { ctx = new Contexto(); } catch (e) { return null; } }
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        preparar(ctx);
        return ctx;
    }

    /* ---------- Ladrillos del sonido ---------- */
    function nota(c, freq, t, dur, vol, o) {
        o = o || {};
        var ataque = o.ataque || 0.006;
        var osc = c.createOscillator(), g = c.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        if (o.fin) osc.frequency.exponentialRampToValueAtTime(o.fin, t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + ataque);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g);
        g.connect(maestro);
        osc.start(t);
        osc.stop(t + dur + 0.03);

        if (o.armonico) {
            var o2 = c.createOscillator(), g2 = c.createGain();
            o2.type = "sine";
            o2.frequency.setValueAtTime(freq * 2.01, t);
            g2.gain.setValueAtTime(0.0001, t);
            g2.gain.exponentialRampToValueAtTime(vol * o.armonico, t + ataque);
            g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);
            o2.connect(g2);
            g2.connect(maestro);
            o2.start(t);
            o2.stop(t + dur + 0.03);
        }
    }

    function roce(c, t, dur, vol, freq, q) {
        var src = c.createBufferSource();
        src.buffer = ruido;
        var f = c.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = freq;
        f.Q.value = q || 1;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f);
        f.connect(g);
        g.connect(maestro);
        src.start(t, Math.random() * 0.05);
        src.stop(t + dur + 0.02);
    }

    /* ---------- Los sonidos ---------- */
    var SONIDOS = {
        agregar: function (c, t, v) {
            roce(c, t, 0.05, 0.05, 1400, 1.2);
            nota(c, 330 * v, t, 0.11, 0.09, { fin: 700 * v });
            nota(c, 1175 * v, t + 0.06, 0.25, 0.022, { ataque: 0.012 });
        },
        quitar: function (c, t, v) {
            roce(c, t, 0.05, 0.035, 800, 1);
            nota(c, 560 * v, t, 0.14, 0.06, { fin: 300 * v });
        },
        fav: function (c, t, v) {
            nota(c, 659 * v, t, 0.38, 0.07, { armonico: 0.25, ataque: 0.01 });
            nota(c, 988 * v, t + 0.07, 0.55, 0.06, { armonico: 0.2, ataque: 0.01 });
        },
        listo: function (c, t, v) {
            nota(c, 523 * v, t, 0.5, 0.06, { armonico: 0.2, ataque: 0.01 });
            nota(c, 659 * v, t + 0.09, 0.5, 0.06, { armonico: 0.2, ataque: 0.01 });
            nota(c, 784 * v, t + 0.18, 0.75, 0.06, { armonico: 0.2, ataque: 0.012 });
        },
        // Toquecito suave: para cualquier botón o enlace
        toque: function (c, t, v) {
            roce(c, t, 0.04, 0.04, 1100, 1.2);
            nota(c, 440 * v, t, 0.08, 0.05, { fin: 320 * v });
        },
        // Roce muy suave al desplazar la página
        scroll: function (c, t, v) {
            roce(c, t, 0.07, SCROLL_VOLUMEN, 900 + Math.random() * 700, 0.8);
        }
    };

    function sonar(nombre) {
        if (document.hidden) return;
        var ahora = Date.now();
        if (ahora - ultimo < 60) return;          // evita sonidos montados
        ultimo = ahora;
        var c = contexto();
        if (!c || !SONIDOS[nombre]) return;
        var v = 1 + (Math.random() - 0.5) * 0.06;
        SONIDOS[nombre](c, c.currentTime + 0.01, v);
        if ((nombre === "agregar" || nombre === "fav") && navigator.vibrate) { try { navigator.vibrate(10); } catch (e) {} }
    }

    /* ---------- Despertar el audio con el primer toque ---------- */
    // Los navegadores no dejan sonar hasta que la persona toca algo;
    // así el audio queda listo y el primer clic ya suena sin retraso.
    function despertar() { contexto(); }
    document.addEventListener("pointerdown", despertar, { capture: true, passive: true });
    document.addEventListener("touchstart", despertar, { capture: true, passive: true });
    document.addEventListener("keydown", despertar, true);

    /* ---------- Qué toque dispara qué sonido ---------- */
    // Cualquier cosa "tocable" que haga un toque genérico
    var TOCABLES = "button, a[href], summary, select, label, [role='button'], [role='tab'], [role='menuitem'], " +
                   "input[type='button'], input[type='submit'], input[type='checkbox'], input[type='radio'], " +
                   "[onclick], [class*='boton'], [class*='btn']";

    // Se escucha en fase de captura: el estado del botón es el de ANTES de tocarlo
    document.addEventListener("click", function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        var fav = t.closest(".pu-fav");
        if (fav) return sonar(fav.classList.contains("activo") ? "quitar" : "fav");

        var agregar = t.closest(".boton-agregar-pedido");
        if (agregar) return sonar(agregar.classList.contains("agregado") ? "quitar" : "agregar");

        var siguiente = t.closest(".tu-siguiente");
        if (siguiente && /listo/i.test(siguiente.textContent)) return sonar("listo");

        if (t.closest("#boton-enviar-pedido, .calc-btn-wa, .wa-menu-opciones a")) return sonar("listo");

        // Todo lo demás que se pueda tocar: toquecito suave
        if (t.closest(TOCABLES)) sonar("toque");
    }, true);

    /* ---------- Sonido al hacer scroll ---------- */
    if (SCROLL_ACTIVO) {
        // capture:true también detecta el scroll dentro de menús o listas con su propio desplazamiento
        window.addEventListener("scroll", function () {
            if (document.hidden || !ctx || !maestro) return;   // aún no se despertó el audio
            var ahora = Date.now();
            if (ahora - ultimoScroll < SCROLL_CADA_MS) return;
            ultimoScroll = ahora;
            var c = contexto();
            if (!c) return;
            SONIDOS.scroll(c, c.currentTime + 0.01, 1);
        }, { capture: true, passive: true });
    }
})();
