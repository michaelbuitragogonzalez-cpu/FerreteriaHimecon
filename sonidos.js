/* =========================================================
   HIMECON - SONIDOS SUAVES TIPO ASMR (sonidos.js)
   Solo suenan los momentos que importan: agregar/quitar del
   pedido, guardar un favorito y los "listo" (enviar por WhatsApp,
   terminar el tutorial). Nada al entrar, nada al hacer scroll,
   nada en cada botón.
   Los sonidos se generan con el navegador (Web Audio): no hay
   archivos de audio. Tienen textura suave (roce + tono cálido +
   un poquito de eco) y una variación mínima en cada toque para
   que nunca suenen idénticos ni cansen.
   Incluye un botón 🔊/🔇; se recuerda la elección.
   No modifica script.js, extras.js ni pulido.js.
   ========================================================= */
(function () {
    "use strict";

    // ⚙️ AJUSTES (puedes cambiarlos)
    var ACTIVO_POR_DEFECTO = true;   // false = empiezan apagados y el cliente los enciende con 🔊
    var VOLUMEN = 1;                 // 0.5 = más bajito, 1 = normal
    var ECO = 0.32;                  // 0 = sin eco, 0.5 = más "espacio"
    var KEY = "himecon-sonido";

    var Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;           // navegador sin audio: no hace nada

    var ctx = null, maestro = null, ruido = null;
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

    /* ---------- Preparación del audio ---------- */
    // Eco corto y cálido (ruido que se apaga solo) para dar sensación de espacio
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

        var suave = c.createBiquadFilter();      // quita lo "chillón"
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

        // Ruido blanco reutilizable para los "roces"
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
    // Tono cálido: seno con entrada suave y salida larga; opcional caída/subida de tono y un armónico
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

        if (o.armonico) {                         // un toque de brillo suave (como madera/marimba)
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

    // Roce: un golpecito de aire filtrado (la parte "táctil" del ASMR)
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
    // v = variación mínima de tono (±3 %) para que cada toque suene "vivo"
    var SONIDOS = {
        // Burbuja que sube + sonido de roce + destello suave
        agregar: function (c, t, v) {
            roce(c, t, 0.05, 0.05, 1400, 1.2);
            nota(c, 330 * v, t, 0.11, 0.09, { fin: 700 * v });
            nota(c, 1175 * v, t + 0.06, 0.25, 0.022, { ataque: 0.012 });
        },
        // Lo contrario: burbuja que baja, más bajita
        quitar: function (c, t, v) {
            roce(c, t, 0.05, 0.035, 800, 1);
            nota(c, 560 * v, t, 0.14, 0.06, { fin: 300 * v });
        },
        // Dos notas cálidas tipo marimba con cola larga
        fav: function (c, t, v) {
            nota(c, 659 * v, t, 0.38, 0.07, { armonico: 0.25, ataque: 0.01 });
            nota(c, 988 * v, t + 0.07, 0.55, 0.06, { armonico: 0.2, ataque: 0.012 });
        },
        // Arpegio suave de "listo"
        listo: function (c, t, v) {
            nota(c, 523 * v, t, 0.5, 0.06, { armonico: 0.2, ataque: 0.01 });
            nota(c, 659 * v, t + 0.09, 0.5, 0.06, { armonico: 0.2, ataque: 0.01 });
            nota(c, 784 * v, t + 0.18, 0.75, 0.06, { armonico: 0.2, ataque: 0.012 });
        },
        // Golpecito del interruptor al encender
        toque: function (c, t, v) {
            roce(c, t, 0.04, 0.04, 1100, 1.2);
            nota(c, 440 * v, t, 0.08, 0.05, { fin: 320 * v });
        }
    };

    function sonar(nombre) {
        if (!encendido || document.hidden) return;
        var ahora = Date.now();
        if (ahora - ultimo < 60) return;          // evita sonidos montados
        ultimo = ahora;
        var c = contexto();
        if (!c || !SONIDOS[nombre]) return;
        var v = 1 + (Math.random() - 0.5) * 0.06;
        SONIDOS[nombre](c, c.currentTime + 0.01, v);
        // Vibración mínima en Android (donde se pueda)
        if ((nombre === "agregar" || nombre === "fav") && navigator.vibrate) { try { navigator.vibrate(10); } catch (e) {} }
    }

    /* ---------- Qué toque dispara qué sonido ---------- */
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

        if (t.closest("#boton-enviar-pedido, .calc-btn-wa, .wa-menu-opciones a")) sonar("listo");
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
            if (encendido) sonar("toque");
        });
        document.body.appendChild(b);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ponerInterruptor);
    else ponerInterruptor();
})();
