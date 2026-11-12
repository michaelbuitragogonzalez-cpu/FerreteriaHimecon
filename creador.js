/* =========================================================
   HIMECON - BOTÓN FLOTANTE DEL CREADOR (creador.js)
   "Conoce a quien creó esta página"
   - Siempre visible mientras se hace scroll, en la esquina
     inferior izquierda (arriba del botón 🛒 del pedido).
   - Normalmente es solo un círculo con el ícono 👨‍💻, para no
     estorbar la vista. Da una pulsación suave cada pocos segundos
     para que se note.
   - Se abre y muestra el texto: (1) unos segundos en la primera
     visita, (2) al pasar el mouse o con el teclado, (3) en celular,
     con el primer toque; el segundo toque abre la página.
   No modifica nada de lo que ya tienes.
   ========================================================= */
(function () {
    "use strict";

    // ⚙️ AJUSTES
    var URL_CREADOR = "https://michaelbuitragogonzalez-cpu.github.io/MichaelWebAndPCs/";
    var TEXTO = "Conoce a quien creó esta página";
    var TAMANO = 46;                 // diámetro del círculo en pixeles
    var AVISO_EN_PRIMERA_VISITA = true;   // muestra el texto unos segundos la primera vez
    var KEY_AVISO = "himecon-creador-aviso";

    function estilos() {
        var T = TAMANO;
        var sombra = "0 6px 18px rgba(30,136,229,.42),0 0 0 2px rgba(255,255,255,.9)";
        var sombraOscura = "0 6px 18px rgba(0,0,0,.5),0 0 0 2px rgba(30,30,30,.9)";
        var s = document.createElement("style");
        s.textContent =
            ".creador-link{position:fixed;left:24px;bottom:88px;z-index:800;display:flex;align-items:center;" +
            "height:" + T + "px;max-width:" + T + "px;overflow:hidden;border-radius:50px;" +
            "background:linear-gradient(135deg,#4db5ff,#2b98f0);color:#fff;text-decoration:none;cursor:pointer;" +
            "box-shadow:" + sombra + ";transition:max-width .35s ease;" +
            "animation:creadorOnda 8s ease-out infinite}" +
            ".creador-link::before,.creador-link::after{display:none!important}" +
            ".creador-icono{flex:0 0 " + T + "px;width:" + T + "px;height:" + T + "px;display:grid;place-items:center;font-size:" + Math.round(T * 0.48) + "px;line-height:1}" +
            ".creador-texto{white-space:nowrap;font-size:14px;font-weight:700;opacity:0;padding-right:0;transition:opacity .25s ease,padding .35s ease}" +
            ".creador-link.abierto,.creador-link:hover,.creador-link:focus-visible{max-width:340px;animation-play-state:paused}" +
            ".creador-link.abierto .creador-texto,.creador-link:hover .creador-texto,.creador-link:focus-visible .creador-texto{opacity:1;padding-right:18px}" +
            ".creador-link:hover{transform:none;color:#fff}" +
            ".creador-link:focus-visible{outline:3px solid rgba(57,169,255,.55);outline-offset:3px}" +
            "body.modo-oscuro .creador-link{box-shadow:" + sombraOscura + "}" +
            "@keyframes creadorOnda{" +
                "0%{box-shadow:" + sombra + ",0 0 0 0 rgba(57,169,255,.55)}" +
                "14%,100%{box-shadow:" + sombra + ",0 0 0 16px rgba(57,169,255,0)}}" +
            "@media (max-width:768px){.creador-link{left:16px;bottom:calc(80px + env(safe-area-inset-bottom,0px))}" +
                ".creador-link.abierto,.creador-link:hover,.creador-link:focus-visible{max-width:calc(100vw - 100px)}" +
                ".creador-texto{font-size:13px}}" +
            "@media (prefers-reduced-motion:reduce){.creador-link{animation:none;transition:none}.creador-texto{transition:none}}";
        document.head.appendChild(s);
    }

    function poner() {
        if (document.querySelector(".creador-link")) return;
        estilos();

        var a = document.createElement("a");
        a.className = "creador-link";
        a.href = URL_CREADOR;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", TEXTO);
        a.title = TEXTO;
        a.innerHTML = '<span class="creador-icono" aria-hidden="true">👨‍💻</span><span class="creador-texto"></span>';
        a.querySelector(".creador-texto").textContent = TEXTO;
        document.body.appendChild(a);

        var cierre = null;
        function abrir(ms) {
            a.classList.add("abierto");
            clearTimeout(cierre);
            cierre = setTimeout(function () { a.classList.remove("abierto"); }, ms);
        }

        // En celular (sin "hover"): el primer toque muestra el texto, el segundo abre la página
        a.addEventListener("click", function (e) {
            var sinHover = window.matchMedia && matchMedia("(hover: none)").matches;
            if (sinHover && !a.classList.contains("abierto")) {
                e.preventDefault();
                abrir(4500);
            }
        });

        // Aviso breve la primera vez, para que se entienda qué es
        if (AVISO_EN_PRIMERA_VISITA) {
            var visto = false;
            try { visto = sessionStorage.getItem(KEY_AVISO) === "1"; } catch (e) {}
            if (!visto) {
                setTimeout(function () {
                    abrir(4500);
                    try { sessionStorage.setItem(KEY_AVISO, "1"); } catch (e) {}
                }, 3000);
            }
        }
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", poner);
    else poner();
})();
