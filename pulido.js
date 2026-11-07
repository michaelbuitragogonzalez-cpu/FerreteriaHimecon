/* =========================================================
   HIMECON - PULIDO (pulido.js)
   Esqueletos de carga, animaciones al hacer scroll, favoritos,
   compartir por WhatsApp y sugerencias del buscador.
   No modifica script.js ni extras.js: se monta encima de ellos.
   ========================================================= */
(function () {
    "use strict";

    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var sinMov = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var tieneIO = "IntersectionObserver" in window;
    var KEY_FAV = "himecon-favoritos";

    /* -----------------------------------------------------
       1. ESQUELETOS DE CARGA
       Se dibujan al instante; script.js los borra solo cuando
       pinta los productos reales (hace contenedor.innerHTML = "").
    ----------------------------------------------------- */
    (function esqueletos() {
        var cont = document.getElementById("productos");
        if (!cont || cont.children.length) return;
        var n = window.innerWidth <= 768 ? 4 : 8, html = "";
        for (var i = 0; i < n; i++) {
            html += '<div class="producto-esqueleto" aria-hidden="true">' +
                '<div class="esq esq-img"></div><div class="esq esq-linea"></div>' +
                '<div class="esq esq-linea corta"></div><div class="esq esq-boton"></div></div>';
        }
        cont.innerHTML = html;
        // Por si el catálogo no llegara a cargar: no dejar esqueletos para siempre
        setTimeout(function () {
            if (cont.querySelector(".producto-esqueleto")) {
                cont.innerHTML = '<p class="pu-vacio">No pudimos cargar los productos. Recarga la página o escríbenos por WhatsApp.</p>';
            }
        }, 20000);
    })();

    function iniciar() {
        iniciarRevelarSecciones();
        iniciarFavoritosYTarjetas();
        iniciarSugerencias();
        abrirBusquedaCompartida();
    }

    /* -----------------------------------------------------
       2. ANIMACIONES AL HACER SCROLL (secciones de catalogo.html)
    ----------------------------------------------------- */
    function iniciarRevelarSecciones() {
        if (!tieneIO || sinMov) return;
        var objetivos = $$(".nosotros-contenido, .beneficios h2, .beneficios .cards, .catalogo:not(.pagina-productos), .contacto-contenido");
        if (!objetivos.length) return;
        var obs = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add("pu-visible"); obs.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        objetivos.forEach(function (el) {
            // Lo que ya se ve al abrir la página no se esconde (evita parpadeos)
            if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
            el.classList.add("pu-rv");
            obs.observe(el);
        });
    }

    /* -----------------------------------------------------
       3. FAVORITOS + COMPARTIR + BRILLO DE IMÁGENES + APARECER TARJETAS
    ----------------------------------------------------- */
    var favs = [];
    var soloFavs = false;

    function leerFavs() {
        try { var a = JSON.parse(localStorage.getItem(KEY_FAV)); return Array.isArray(a) ? a : []; }
        catch (e) { return []; }
    }
    function guardarFavs() { try { localStorage.setItem(KEY_FAV, JSON.stringify(favs)); } catch (e) {} }
    function esFav(nombre) { return favs.indexOf(nombre) !== -1; }

    var SVG_CORAZON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    var SVG_COMPARTIR = '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>';

    function baseSitio() {
        var b = (typeof urlSitio === "string" && urlSitio) ? urlSitio : location.href.replace(/[^\/]*([?#].*)?$/, "");
        return b.replace(/\/+$/, "") + "/";
    }

    function compartir(nombre) {
        var enlace = baseSitio() + "productos.html?q=" + encodeURIComponent(nombre);
        var texto = "Mira este producto en Ferretería Himecon:\n*" + nombre + "*\n" + enlace;
        window.open("https://wa.me/?text=" + encodeURIComponent(texto), "_blank", "noopener");
    }

    var toastTimer = null;
    function aviso(texto) {
        var t = document.getElementById("pu-toast");
        if (!t) {
            t = document.createElement("div");
            t.id = "pu-toast";
            t.setAttribute("role", "status");
            document.body.appendChild(t);
        }
        t.textContent = texto;
        t.classList.add("visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { t.classList.remove("visible"); }, 1800);
    }

    function actualizarBotonFavs() {
        var b = document.getElementById("pu-boton-favs");
        if (!b) return;
        b.innerHTML = "❤️ Mis favoritos (" + favs.length + ")";
        b.classList.toggle("activo", soloFavs);
        b.setAttribute("aria-pressed", soloFavs ? "true" : "false");
    }

    function pintarCorazon(btn) {
        var en = esFav(btn.dataset.nombre);
        btn.classList.toggle("activo", en);
        btn.setAttribute("aria-pressed", en ? "true" : "false");
        btn.setAttribute("aria-label", en ? "Quitar de favoritos" : "Guardar en favoritos");
    }

    function alternarFav(nombre, btn) {
        var i = favs.indexOf(nombre);
        if (i === -1) { favs.push(nombre); aviso("Guardado en favoritos ❤️"); }
        else { favs.splice(i, 1); aviso("Quitado de favoritos"); }
        guardarFavs();
        pintarCorazon(btn);
        actualizarBotonFavs();
        // En la vista de favoritos, al quitar uno se vuelve a armar la lista
        if (soloFavs && typeof filtrarLista === "function") filtrarLista();
    }

    var ioTarjetas = null;

    function decorar(tarjeta) {
        if (tarjeta.dataset.pu) return;
        tarjeta.dataset.pu = "1";
        var h3 = tarjeta.querySelector("h3");
        var nombre = h3 ? h3.textContent.trim() : "";

        if (nombre) {
            var caja = document.createElement("div");
            caja.className = "pu-acciones";

            var fav = document.createElement("button");
            fav.type = "button";
            fav.className = "pu-btn pu-fav";
            fav.dataset.nombre = nombre;
            fav.innerHTML = SVG_CORAZON;
            pintarCorazon(fav);

            var com = document.createElement("button");
            com.type = "button";
            com.className = "pu-btn pu-compartir";
            com.dataset.nombre = nombre;
            com.setAttribute("aria-label", "Compartir por WhatsApp");
            com.title = "Compartir por WhatsApp";
            com.innerHTML = SVG_COMPARTIR;

            caja.appendChild(fav);
            caja.appendChild(com);
            tarjeta.appendChild(caja);
        }

        // Brillo mientras la foto carga
        var img = tarjeta.querySelector("img");
        if (img && !img.complete) {
            img.classList.add("img-cargando");
            var quitar = function () { img.classList.remove("img-cargando"); };
            img.addEventListener("load", quitar, { once: true });
            img.addEventListener("error", quitar, { once: true });
        }

        // Aparece suave al entrar en pantalla (solo las que están debajo de lo visible)
        if (tieneIO && !sinMov && tarjeta.getBoundingClientRect().top > window.innerHeight) {
            if (!ioTarjetas) {
                ioTarjetas = new IntersectionObserver(function (entradas) {
                    entradas.forEach(function (en) {
                        if (en.isIntersecting) { en.target.classList.remove("pu-oculto"); ioTarjetas.unobserve(en.target); }
                    });
                }, { rootMargin: "0px 0px -30px 0px", threshold: 0.05 });
            }
            tarjeta.classList.add("pu-oculto");
            ioTarjetas.observe(tarjeta);
        }
    }

    function iniciarFavoritosYTarjetas() {
        var lista = document.getElementById("productos");
        if (!lista) return;

        favs = leerFavs();

        // Botón "Mis favoritos" junto a los de arriba
        var banda = $(".calc-banda");
        if (banda) {
            var b = document.createElement("button");
            b.type = "button";
            b.id = "pu-boton-favs";
            b.className = "boton pu-favs";
            b.addEventListener("click", function () {
                soloFavs = !soloFavs;
                actualizarBotonFavs();
                if (typeof filtrarLista === "function") filtrarLista();
            });
            var limpiar = document.getElementById("boton-limpiar-filtros");
            banda.insertBefore(b, limpiar || null);
            actualizarBotonFavs();
        }

        // Clics de corazón y compartir (un solo escuchador para todas las tarjetas)
        lista.addEventListener("click", function (e) {
            var f = e.target.closest(".pu-fav");
            if (f) { e.stopPropagation(); alternarFav(f.dataset.nombre, f); return; }
            var c = e.target.closest(".pu-compartir");
            if (c) { e.stopPropagation(); compartir(c.dataset.nombre); }
        });

        // Filtro de favoritos: se mete antes de dibujar la lista
        if (typeof mostrarProductos === "function") {
            var original = window.mostrarProductos;
            window.mostrarProductos = function (productosLista) {
                if (soloFavs) productosLista = productosLista.filter(function (p) { return esFav(p.nombre); });
                var r = original.call(this, productosLista);
                if (soloFavs && productosLista.length === 0) {
                    lista.innerHTML = '<p class="pu-vacio">Aún no tienes favoritos aquí. Toca el ❤ de cualquier producto para guardarlo.</p>';
                    var n = document.getElementById("cantidad-productos");
                    if (n) n.textContent = "0";
                }
                return r;
            };
        }

        // "Quitar filtros" también apaga la vista de favoritos
        if (typeof window.limpiarTodosLosFiltros === "function") {
            var limpiarOriginal = window.limpiarTodosLosFiltros;
            window.limpiarTodosLosFiltros = function () {
                soloFavs = false;
                actualizarBotonFavs();
                return limpiarOriginal.apply(this, arguments);
            };
        }

        // Cada tarjeta nueva (primera carga, filtros, "Mostrar más") se decora sola
        $$(".producto", lista).forEach(decorar);
        new MutationObserver(function (cambios) {
            cambios.forEach(function (c) {
                Array.prototype.forEach.call(c.addedNodes, function (n) {
                    if (n.nodeType === 1 && n.classList.contains("producto")) decorar(n);
                });
            });
        }).observe(lista, { childList: true });
    }

    /* -----------------------------------------------------
       4. SUGERENCIAS DEL BUSCADOR
       Usa el mismo buscador tolerante a errores de script.js
       ("tuvo pvc" encuentra "tubo pvc").
    ----------------------------------------------------- */
    function iniciarSugerencias() {
        var campo = document.getElementById("buscador");
        if (!campo || typeof buscarProductos !== "function" || typeof limpiarTexto !== "function") return;

        var padre = campo.parentElement;
        var caja = document.createElement("ul");
        caja.id = "pu-sugerencias";
        caja.setAttribute("role", "listbox");
        caja.hidden = true;
        padre.appendChild(caja);
        campo.setAttribute("autocomplete", "off");

        var activo = -1, espera = null;

        function opciones() { return $$("li[data-nombre]", caja); }
        function cerrar() { caja.hidden = true; activo = -1; }
        function marcar(i) {
            var ops = opciones();
            ops.forEach(function (li, k) { li.classList.toggle("activo", k === i); });
            activo = i;
        }
        function elegir(nombre) {
            campo.value = nombre;
            cerrar();
            campo.dispatchEvent(new Event("input", { bubbles: true }));
            campo.blur();
        }

        function sugerir() {
            var q = limpiarTexto(campo.value).trim();
            if (q.length < 2) { cerrar(); return; }

            var lista = buscarProductos(q);
            var exactos = [], aprox = [];
            for (var i = 0; i < lista.length && exactos.length < 6; i++) {
                var nom = lista[i].nombre;
                if (limpiarTexto(nom).indexOf(q) !== -1) { if (exactos.indexOf(nom) === -1) exactos.push(nom); }
                else if (aprox.length < 6 && aprox.indexOf(nom) === -1) aprox.push(nom);
            }
            var final = exactos.concat(aprox).slice(0, 6);
            if (!final.length) { cerrar(); return; }

            caja.innerHTML = "";
            if (!exactos.length) {
                var t = document.createElement("li");
                t.className = "pu-sug-titulo";
                t.textContent = "¿Quisiste decir…?";
                caja.appendChild(t);
            }
            final.forEach(function (nombre) {
                var li = document.createElement("li");
                li.setAttribute("role", "option");
                li.dataset.nombre = nombre;
                li.textContent = nombre;
                caja.appendChild(li);
            });

            caja.style.left = campo.offsetLeft + "px";
            caja.style.top = (campo.offsetTop + campo.offsetHeight + 6) + "px";
            caja.style.width = campo.offsetWidth + "px";
            activo = -1;
            caja.hidden = false;
        }

        campo.addEventListener("input", function () {
            clearTimeout(espera);
            espera = setTimeout(sugerir, 130);
        });
        campo.addEventListener("focus", function () { if (campo.value.trim().length >= 2) sugerir(); });
        campo.addEventListener("keydown", function (e) {
            if (caja.hidden) return;
            var ops = opciones();
            if (e.key === "ArrowDown") { e.preventDefault(); marcar((activo + 1) % ops.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); marcar((activo - 1 + ops.length) % ops.length); }
            else if (e.key === "Enter" && activo > -1) { e.preventDefault(); elegir(ops[activo].dataset.nombre); }
            else if (e.key === "Escape") { cerrar(); }
        });
        caja.addEventListener("click", function (e) {
            var li = e.target.closest("li[data-nombre]");
            if (li) elegir(li.dataset.nombre);
        });
        document.addEventListener("click", function (e) {
            if (e.target !== campo && !caja.contains(e.target)) cerrar();
        });
    }

    /* -----------------------------------------------------
       5. ENLACE COMPARTIDO: productos.html?q=nombre abre el buscador listo
    ----------------------------------------------------- */
    function abrirBusquedaCompartida() {
        var campo = document.getElementById("buscador");
        var q = new URLSearchParams(location.search).get("q");
        if (!campo || !q || typeof filtrarLista !== "function") return;
        campo.value = q;
        filtrarLista();
        var lista = document.getElementById("productos");
        if (lista) lista.scrollIntoView({ behavior: sinMov ? "auto" : "smooth", block: "start" });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
    else iniciar();
})();
