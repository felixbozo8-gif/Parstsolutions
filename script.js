/* =========================================================
   PARTSOLUTIONS - SCRIPT PRINCIPAL
   Catálogo + buscador de repuestos Ford + Cashea + Carrito
========================================================= */

"use strict";

/* =========================================================
   CONFIGURACIÓN PRINCIPAL Y TASAS
========================================================= */

const ARCHIVO_CATALOGO_EXCEL = "PARTSOLUTIONS_CATALOGO_MASTER.xlsx";
const NUMERO_WHATSAPP_PARTSOLUTIONS = "584122520412";
const MENSAJE_WHATSAPP_PARTSOLUTIONS =
    "SALUDOS MUY BUENAS TARDES QUIERO CONSULTAR DISPONIBILIDAD DE MI PEDIDO";

// Tasas de cambio y parámetros de financiamiento Cashea
const TASA_CASHEA = 882;
const TASA_DOLAR = 1020;
const CASHEA_LEVEL_PERCENTAGES = {
    1: 0.60,
    2: 0.50,
    3: 0.40,
    4: 0.30,
    5: 0.25,
    6: 0.20
};

const CATALOGO_POR_PAGINA = 12;

/* =========================================================
   CATEGORÍAS DEL PROYECTO
========================================================= */

const categorias = {
    motor: "Motor y Relacionados",
    "kit-tiempo": "Kit de Tiempo",
    inyeccion: "Inyección de Combustible",
    suspension: "Suspensión y Dirección",
    frenos: "Frenos",
    carroceria: "Carrocería",
    ignicion: "Ignición",
    electrico: "Sistema Eléctrico, Sensores y Conectores",
    correas: "Correas y Mangueras",
    transmision: "Transmisión"
};

/* =========================================================
   ESTADO GLOBAL
========================================================= */

const vehiculosFord = {};
let productos = crearCatalogoVacio();

let catalogCategoriaActual = "todos";
let catalogTextoActual = "";
let catalogLimite = CATALOGO_POR_PAGINA;

let modoPrecioActual = "contado";
let nivelCasheaActual = 6;
let carritoPedido = cargarCarritoPedido();

function crearCatalogoVacio() {
    return {
        motor: [],
        "kit-tiempo": [],
        inyeccion: [],
        suspension: [],
        frenos: [],
        carroceria: [],
        ignicion: [],
        electrico: [],
        correas: [],
        transmision: []
    };
}

/* =========================================================
   UTILIDADES Y NORMALIZACIÓN
========================================================= */

function normalizarTexto(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();
}

function normalizarCodigo(valor) {
    return normalizarTexto(valor).replace(/[\s.-]/g, "");
}

function convertirArray(valor) {
    if (Array.isArray(valor)) return valor;
    if (valor === undefined || valor === null || valor === "") return [];
    return [valor];
}

function contieneValor(lista, valor) {
    const objetivo = normalizarTexto(valor);
    return convertirArray(lista).some(item => normalizarTexto(item) === objetivo);
}

function obtenerTodosLosProductos() {
    return Object.values(productos).flat();
}

function obtenerNombreCategoria(clave) {
    return categorias[clave] || clave || "";
}

function obtenerEtiquetas(lista) {
    return convertirArray(lista).filter(Boolean).join(", ");
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   PRECIOS Y CÁLCULOS CASHEA
========================================================= */

function obtenerPrecioNumero(producto) {
    if (!producto) return null;
    if (typeof producto.precio === "number" && Number.isFinite(producto.precio)) {
        return producto.precio;
    }
    const texto = String(producto.precio ?? "")
        .replace(/[^0-9.,-]/g, "")
        .replace(/,(?=\d{3}(?:\D|$))/g, "")
        .replace(",", ".");
    const numero = Number(texto);
    return Number.isFinite(numero) ? numero : null;
}

function formatearPrecio(producto) {
    const precio = obtenerPrecioNumero(producto);
    if (precio === null) return "Precio a consultar";
    return `$${precio.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function formatearMonto(monto) {
    const numero = Number(monto) || 0;
    return `$${numero.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function subtotalProducto(producto, cantidad) {
    const precio = obtenerPrecioNumero(producto);
    if (precio === null) return null;
    return precio * Number(cantidad || 0);
}

function calculateCasheaDetails(
    precio,
    tasaDolar = TASA_DOLAR,
    tasaCashea = TASA_CASHEA,
    nivel = nivelCasheaActual
) {
    const precioEnDivisas = Number(precio) || 0;
    const precioConAumento = precioEnDivisas / 0.92;
    const precioConAumentoBs = precioConAumento * Number(tasaDolar || 1);
    const divisorTasa = Number(tasaCashea || 1);
    const precioTotalCashea = Math.ceil(precioConAumentoBs / divisorTasa);
    const porcentajeInicial = CASHEA_LEVEL_PERCENTAGES[nivel] ?? 0.20;
    const inicialDeCashea = precioTotalCashea * porcentajeInicial;
    const totalCuotas = precioTotalCashea - inicialDeCashea;
    const cuotasQuincenales = totalCuotas / 3;

    return {
        precioTotalCashea,
        inicialDeCashea,
        cuotasQuincenales,
        porcentajeInicial
    };
}

function obtenerDetalleCashea(producto, nivel = nivelCasheaActual) {
    const precio = obtenerPrecioNumero(producto);
    if (precio === null) return null;
    return calculateCasheaDetails(precio, TASA_DOLAR, TASA_CASHEA, nivel);
}

function actualizarControlesPrecio() {
    document.querySelectorAll("[data-price-mode]").forEach(button => {
        button.classList.toggle("active", button.dataset.priceMode === modoPrecioActual);
    });

    const control = document.querySelector("[data-cashea-level-control]");
    if (control) {
        control.hidden = modoPrecioActual === "contado";
    }

    const select = document.getElementById("casheaLevel");
    if (select) {
        select.value = String(nivelCasheaActual);
    }
}

function refrescarPreciosCatalogo() {
    renderizarCatalogoPrincipal();
}

function inicializarSelectorPrecios() {
    document.querySelectorAll("[data-price-mode]").forEach(button => {
        button.addEventListener("click", () => {
            modoPrecioActual = button.dataset.priceMode || "contado";
            actualizarControlesPrecio();
            refrescarPreciosCatalogo();
        });
    });

    const select = document.getElementById("casheaLevel");
    select?.addEventListener("change", () => {
        nivelCasheaActual = Math.min(6, Math.max(1, Number(select.value) || 6));
        refrescarPreciosCatalogo();
    });

    actualizarControlesPrecio();
}

function crearBloquePreciosHTML(producto, clase = "catalog") {
    const precio = obtenerPrecioNumero(producto);
    const cashea = obtenerDetalleCashea(producto);

    const contadoHTML = precio !== null
        ? `
            <div class="price-mode-line">
                <span>Precio de contado</span>
                <strong>${escaparHTML(formatearMonto(precio))}</strong>
            </div>
        `
        : `
            <div class="price-mode-line">
                <span>Precio de contado</span>
                <strong>Consultar</strong>
            </div>
        `;

    const casheaHTML = cashea
        ? `
            <div class="price-mode-line price-mode-cashea">
                <span>Cashea · Nivel ${nivelCasheaActual}</span>
                <strong>${escaparHTML(formatearMonto(cashea.precioTotalCashea))}</strong>
            </div>
            <div class="cashea-mini-details">
                <div>
                    <span>Inicial (${Math.round(cashea.porcentajeInicial * 100)}%)</span>
                    <strong>${escaparHTML(formatearMonto(cashea.inicialDeCashea))}</strong>
                </div>
                <div>
                    <span>3 cuotas quincenales</span>
                    <strong>${escaparHTML(formatearMonto(cashea.cuotasQuincenales))}</strong>
                </div>
            </div>
        `
        : `
            <div class="price-mode-line price-mode-cashea">
                <span>Cashea</span>
                <strong>Consultar</strong>
            </div>
        `;

    let contenido = contadoHTML;
    if (modoPrecioActual === "cashea") {
        contenido = casheaHTML;
    } else if (modoPrecioActual === "ambos") {
        contenido = contadoHTML + casheaHTML;
    }

    return `
        <div class="${clase}-price-options">
            ${contenido}
        </div>
    `;
}

/* =========================================================
   LECTURA Y PARSEO DEL EXCEL MAESTRO (SheetJS)
========================================================= */

function convertirListaExcel(valor) {
    if (valor === undefined || valor === null || valor === "") return [];
    if (Array.isArray(valor)) {
        return valor.map(item => String(item).trim()).filter(Boolean);
    }
    const texto = String(valor).trim();
    if (!texto || texto === "[]") return [];
    return texto.split(/[;,|]/).map(item => item.trim()).filter(Boolean);
}

function convertirAniosExcel(valor) {
    if (valor === undefined || valor === null || valor === "") return [];
    const texto = String(valor).trim();

    // Rango: ej. 2012-2018
    const rango = texto.match(/^(20\d{2})\s*-\s*(20\d{2})$/);
    if (rango) {
        const inicio = Number(rango[1]);
        const fin = Number(rango[2]);
        if (fin >= inicio && fin - inicio <= 25) {
            return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
        }
        return [];
    }

    return texto
        .split(/[;,|]/)
        .map(item => Number(item.trim()))
        .filter(num => Number.isFinite(num));
}

function convertirPrecioExcel(valor) {
    if (valor === undefined || valor === null || valor === "") return null;
    if (typeof valor === "number" && Number.isFinite(valor)) return valor;

    let texto = String(valor).trim().replace(/[^0-9,.-]/g, "");
    if (texto.includes(",") && texto.includes(".")) {
        texto = texto.replace(/,/g, "");
    } else if (texto.includes(",")) {
        texto = texto.replace(",", ".");
    }
    const numero = Number(texto);
    return Number.isFinite(numero) ? numero : null;
}

function convertirDisponibilidadExcel(valor) {
    const texto = normalizarTexto(valor);
    return ["SI", "SÍ", "TRUE", "1", "DISPONIBLE", "YES"].includes(texto);
}

function convertirCategoriaExcel(valor) {
    const texto = normalizarTexto(valor);
    if (!texto) return "";

    const aliasCategorias = {
        "INYECCCION": "inyeccion",
        "INYECCION": "inyeccion",
        "SUSPENSION": "suspension",
        "SUSPENSION Y DIRECCION": "suspension",
        "CORREAS": "correas",
        "ELECTRICO": "electrico",
        "FRENOS": "frenos",
        "MOTOR": "motor"
    };

    if (aliasCategorias[texto]) return aliasCategorias[texto];

    const encontrada = Object.entries(categorias).find(([clave, nombre]) => {
        return normalizarTexto(clave) === texto || normalizarTexto(nombre) === texto;
    });

    return encontrada ? encontrada[0] : "";
}

function actualizarConteosCategorias() {
    document.querySelectorAll("[data-category-count]").forEach(elemento => {
        const cat = elemento.dataset.categoryCount;
        const total = (productos[cat] || []).length;
        elemento.textContent = `${total} ${total === 1 ? "producto" : "productos"}`;
    });
}

async function cargarCatalogoDesdeExcel() {
    if (typeof XLSX === "undefined") {
        throw new Error("No se pudo cargar la librería de lectura de Excel (SheetJS).");
    }

    const respuesta = await fetch(ARCHIVO_CATALOGO_EXCEL, { cache: "no-store" });
    if (!respuesta.ok) {
        throw new Error(`No se pudo encontrar el archivo ${ARCHIVO_CATALOGO_EXCEL}.`);
    }

    const buffer = await respuesta.arrayBuffer();
    const libro = XLSX.read(buffer, { type: "array" });

    if (!libro.SheetNames.length) {
        throw new Error("El archivo Excel no contiene hojas de datos.");
    }

    const nombreHoja = libro.SheetNames.find(n => normalizarTexto(n) === "CATALOGO") || libro.SheetNames[0];
    const hoja = libro.Sheets[nombreHoja];
    const filas = XLSX.utils.sheet_to_json(hoja, { defval: "" });

    const nuevoCatalogo = crearCatalogoVacio();
    const idsUtilizados = new Set();

    filas.forEach(fila => {
        const id = String(fila["ID"] || "").trim();
        const nombre = String(fila["Nombre"] || "").trim();

        if (!id || !nombre) return;
        if (idsUtilizados.has(id)) return;

        idsUtilizados.add(id);

        const categoria = convertirCategoriaExcel(fila["Categoría"] || fila["Categoria"]);
        if (!categoria) return;

        const producto = {
            id,
            nombre,
            marca: String(fila["Marca"] || "").trim(),
            modelo: convertirListaExcel(fila["Modelo"]),
            motor: convertirListaExcel(fila["Motor"]),
            anios: convertirAniosExcel(fila["Años"] || fila["Anos"]),
            categoria,
            numeroParteFord: convertirListaExcel(fila["Número de Parte Ford"] || fila["Numero de Parte Ford"]),
            codigoMotorcraft: convertirListaExcel(fila["Código Motorcraft"] || fila["Codigo Motorcraft"]),
            codigoOEM: convertirListaExcel(fila["Código OEM"] || fila["Codigo OEM"]),
            codigoInterno: id,
            precio: convertirPrecioExcel(fila["Precio"]),
            tipo: String(fila["Tipo"] || "ORIGINAL FORD").trim(),
            descripcion: String(fila["Descripción"] || fila["Descripcion"] || "").trim(),
            imagen: String(fila["Imagen"] || "").trim(),
            disponibilidad: convertirDisponibilidadExcel(fila["Disponibilidad"])
        };

        nuevoCatalogo[categoria].push(producto);
    });

    productos = nuevoCatalogo;
    construirCatalogoVehiculos();

    if (typeof actualizarConteosCategorias === "function") {
        actualizarConteosCategorias();
    }

    actualizarCarrito();
    return idsUtilizados.size;
}

/* =========================================================
   COMPATIBILIDAD FORD Y BÚSQUEDA POR VEHÍCULO
========================================================= */

function crearClaveVehiculo(valor) {
    return normalizarTexto(valor)
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "vehiculo";
}

function dividirValoresCompatibilidad(valor) {
    return convertirArray(valor)
        .flatMap(item => String(item ?? "").split(","))
        .map(item => item.trim())
        .filter(Boolean);
}

function etiquetaModelo(valor) {
    let texto = String(valor ?? "").trim().replace(/[-_]+/g, " ");
    texto = texto.replace(/\bF 150\b/gi, "F-150");
    texto = texto.replace(/\bSUPER DUTY\b/gi, "Super Duty");
    return texto.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

function etiquetaMotor(valor) {
    const texto = String(valor ?? "").trim();
    if (!texto) return "";
    return /L$/i.test(texto) ? texto : `${texto}L`;
}

function construirCatalogoVehiculos() {
    Object.keys(vehiculosFord).forEach(key => delete vehiculosFord[key]);

    obtenerTodosLosProductos().forEach(producto => {
        if (normalizarTexto(producto.marca) !== "FORD") return;

        const modelos = dividirValoresCompatibilidad(producto.modelo);
        const motores = dividirValoresCompatibilidad(producto.motor);
        const anios = convertirArray(producto.anios).map(Number).filter(Boolean);

        modelos.forEach(modeloProducto => {
            const modeloKey = crearClaveVehiculo(modeloProducto);
            if (!vehiculosFord[modeloKey]) {
                vehiculosFord[modeloKey] = {
                    nombre: etiquetaModelo(modeloProducto),
                    motores: {}
                };
            }

            motores.forEach(motorProducto => {
                const motorKey = crearClaveVehiculo(motorProducto);
                if (!vehiculosFord[modeloKey].motores[motorKey]) {
                    vehiculosFord[modeloKey].motores[motorKey] = {
                        nombre: etiquetaMotor(motorProducto),
                        anios: []
                    };
                }

                vehiculosFord[modeloKey].motores[motorKey].anios = [
                    ...new Set([...vehiculosFord[modeloKey].motores[motorKey].anios, ...anios])
                ].sort((a, b) => a - b);
            });
        });
    });
}

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const motor = document.getElementById("motor");
const ano = document.getElementById("ano");
const categoria = document.getElementById("categoria");
const buscarBtn = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");

const searchTabs = document.querySelectorAll(".search-tab");
const vehicleSearch = document.getElementById("vehicleSearch");
const partSearch = document.getElementById("partSearch");
const partNumber = document.getElementById("partNumber");
const searchPartBtn = document.getElementById("searchPartBtn");

const catalogSearch = document.getElementById("catalogSearch");
const catalogProducts = document.getElementById("catalogProducts");
const catalogCount = document.getElementById("catalogCount");
const catalogEmpty = document.getElementById("catalogEmpty");
const catalogLoadMore = document.getElementById("catalogLoadMore");
const catalogFilters = document.getElementById("catalogFilters");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function resetSelect(select, texto) {
    if (!select) return;
    select.innerHTML = "";
    select.appendChild(new Option(texto, ""));
    select.disabled = true;
}

function cargarCategorias() {
    if (!categoria) return;
    resetSelect(categoria, "Selecciona una categoría");
    Object.entries(categorias).forEach(([key, nombre]) => {
        categoria.appendChild(new Option(nombre, key));
    });
    categoria.disabled = false;
}

function cargarMarcas() {
    if (!marca) return;
    resetSelect(marca, "Selecciona una marca");
    marca.appendChild(new Option("Ford", "ford"));
    marca.disabled = false;
}

function cargarModelos() {
    if (!marca || !modelo) return;
    resetSelect(modelo, "Selecciona un modelo");
    if (marca.value !== "ford") return;

    Object.entries(vehiculosFord).forEach(([key, vehiculo]) => {
        modelo.appendChild(new Option(vehiculo.nombre, key));
    });
    modelo.disabled = false;
}

function cargarMotores() {
    if (!modelo || !motor) return;
    resetSelect(motor, "Selecciona un motor");
    const vehiculo = vehiculosFord[modelo.value];
    if (!vehiculo) return;

    Object.entries(vehiculo.motores).forEach(([key, datosMotor]) => {
        motor.appendChild(new Option(datosMotor.nombre, key));
    });
    motor.disabled = false;
}

function cargarAnios() {
    if (!modelo || !motor || !ano) return;
    resetSelect(ano, "Selecciona un año");
    const vehiculo = vehiculosFord[modelo.value];
    const motorSeleccionado = vehiculo?.motores?.[motor.value];
    if (!motorSeleccionado) return;

    motorSeleccionado.anios.forEach(year => {
        ano.appendChild(new Option(String(year), String(year)));
    });
    ano.disabled = false;
}

function prepararCategoria() {
    if (!categoria) return;
    resetSelect(categoria, "Selecciona una categoría");
    if (ano?.value) {
        Object.entries(categorias).forEach(([key, nombre]) => {
            categoria.appendChild(new Option(nombre, key));
        });
        categoria.disabled = false;
    }
}

marca?.addEventListener("change", () => {
    cargarModelos();
    resetSelect(motor, "Selecciona un motor");
    resetSelect(ano, "Selecciona un año");
    resetSelect(categoria, "Selecciona una categoría");
});

modelo?.addEventListener("change", () => {
    cargarMotores();
    resetSelect(ano, "Selecciona un año");
    resetSelect(categoria, "Selecciona una categoría");
});

motor?.addEventListener("change", () => {
    cargarAnios();
    resetSelect(categoria, "Selecciona una categoría");
});

ano?.addEventListener("change", () => {
    prepararCategoria();
});

function normalizarCompatibilidad(valor) {
    return normalizarTexto(valor)
        .replace(/[._-]/g, " ")
        .replace(/\s*L\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function valoresCompatibilidad(lista) {
    return dividirValoresCompatibilidad(lista).map(normalizarCompatibilidad);
}

function productoCompatible(producto) {
    const modeloSeleccionado = vehiculosFord[modelo?.value]?.nombre;
    const motorSeleccionado = vehiculosFord[modelo?.value]?.motores?.[motor?.value]?.nombre;
    const anioSeleccionado = Number(ano?.value);
    const categoriaSeleccionada = categoria?.value;

    if (!producto) return false;
    if (producto.marca && normalizarTexto(producto.marca) !== "FORD") return false;

    function compatibilidadCoincide(valores, objetivo) {
        const objetivoNormalizado = normalizarCompatibilidad(objetivo);
        if (!objetivoNormalizado) return true;

        return valores.some(valor => {
            const valorNormalizado = normalizarCompatibilidad(valor);
            return (
                valorNormalizado === objetivoNormalizado ||
                valorNormalizado.startsWith(`${objetivoNormalizado} `) ||
                objetivoNormalizado.startsWith(`${valorNormalizado} `)
            );
        });
    }

    if (modeloSeleccionado && !compatibilidadCoincide(valoresCompatibilidad(producto.modelo), modeloSeleccionado)) {
        return false;
    }

    if (motorSeleccionado && !compatibilidadCoincide(valoresCompatibilidad(producto.motor), motorSeleccionado)) {
        return false;
    }

    if (anioSeleccionado && convertirArray(producto.anios).length > 0) {
        if (!producto.anios.map(Number).includes(anioSeleccionado)) {
            return false;
        }
    }

    if (categoriaSeleccionada && producto.categoria !== categoriaSeleccionada) {
        return false;
    }

    return true;
}

function buscarPorVehiculo() {
    if (!marca?.value || !modelo?.value || !motor?.value || !ano?.value || !categoria?.value) {
        if (resultado) {
            resultado.innerHTML = `
                <div class="search-result-box">
                    ⚠️ Completa todos los campos:
                    <strong>Marca, Modelo, Motor, Año y Categoría.</strong>
                </div>
            `;
        }
        return;
    }

    const vehiculo = vehiculosFord[modelo.value];
    const datosMotor = vehiculo?.motores?.[motor.value];

    if (!vehiculo || !datosMotor) {
        mostrarMensajeResultado("⚠️ No se pudo identificar correctamente el vehículo seleccionado.");
        return;
    }

    const productosEncontrados = (productos[categoria.value] || []).filter(productoCompatible);
    mostrarResultadosVehiculo(
        productosEncontrados,
        vehiculo.nombre,
        datosMotor.nombre,
        ano.value,
        categoria.value
    );
}

function mostrarResultadosVehiculo(encontrados, nombreModelo, nombreMotor, anioSeleccionado, categoriaSeleccionada) {
    if (!resultado) return;
    const nombreCategoria = obtenerNombreCategoria(categoriaSeleccionada);

    let html = `
        <div class="search-result-box">
            <strong>Vehículo seleccionado</strong>
            <br><br>
            <strong>Ford</strong> ${escaparHTML(nombreModelo)}
            · <strong>${escaparHTML(nombreMotor)}</strong>
            · <strong>${escaparHTML(anioSeleccionado)}</strong>
            <br><br>
            Categoría: <strong>${escaparHTML(nombreCategoria)}</strong>
        </div>
    `;

    if (encontrados.length === 0) {
        html += `
            <div class="search-result-box" style="margin-top:15px;">
                <strong>No encontramos productos registrados.</strong>
                <br><br>
                Actualmente no tenemos productos cargados que coincidan con esta selección.
                <br><br>
                Puedes buscar directamente por número de parte o contactarnos para verificar disponibilidad.
            </div>
        `;
        resultado.innerHTML = html;
        return;
    }

    html += `
        <div class="search-result-box" style="margin-top:15px;">
            <strong>${encontrados.length} producto(s) encontrado(s)</strong>
        </div>
        <div class="modal-products" style="margin-top:20px;">
            ${encontrados.map(crearProductoHTML).join("")}
        </div>
    `;
    resultado.innerHTML = html;
}

function mostrarMensajeResultado(mensaje) {
    if (!resultado) return;
    resultado.innerHTML = `
        <div class="search-result-box">
            ${mensaje}
        </div>
    `;
}

buscarBtn?.addEventListener("click", buscarPorVehiculo);

/* =========================================================
   BÚSQUEDA PONDERADA POR NÚMERO DE PARTE / PALABRAS
========================================================= */

function buscarNumeroParte() {
    const textoOriginal = String(partNumber?.value || "").trim();
    const busqueda = normalizarTexto(textoOriginal);
    const codigoBuscado = normalizarCodigo(textoOriginal);

    if (!busqueda) {
        mostrarMensajeResultado("⚠️ Escribe un número de parte, código, modelo o nombre del repuesto.");
        return;
    }

    const productosTodos = obtenerTodosLosProductos();
    const resultados = productosTodos
        .map(producto => {
            const codigosProducto = [
                ...convertirArray(producto.numeroParteFord),
                ...convertirArray(producto.codigoMotorcraft),
                ...convertirArray(producto.codigoOEM),
                producto.codigoInterno,
                producto.id
            ].filter(Boolean);

            const codigosNormalizados = codigosProducto.map(normalizarCodigo);
            const textoProducto = [
                producto.nombre,
                producto.descripcion,
                ...convertirArray(producto.modelo),
                ...convertirArray(producto.motor),
                ...convertirArray(producto.anios),
                producto.tipo
            ].map(normalizarTexto).join(" ");

            let puntuacion = 0;

            if (codigosNormalizados.some(codigo => codigo === codigoBuscado)) {
                puntuacion += 100;
            } else if (codigosNormalizados.some(codigo => codigo.includes(codigoBuscado))) {
                puntuacion += 85;
            }

            const palabras = busqueda.split(/\s+/).filter(Boolean);
            palabras.forEach(palabra => {
                const codigoPalabra = normalizarCodigo(palabra);
                if (codigoPalabra.length >= 3 && codigosNormalizados.some(c => c.includes(codigoPalabra))) {
                    puntuacion += 45;
                }
                if (textoProducto.includes(palabra)) {
                    puntuacion += 20;
                }
            });

            if (normalizarTexto(producto.nombre).includes(busqueda)) puntuacion += 60;
            if (normalizarTexto(producto.modelo).includes(busqueda)) puntuacion += 40;
            if (normalizarTexto(producto.motor).includes(busqueda)) puntuacion += 35;
            if (String(producto.anios || "").includes(textoOriginal)) puntuacion += 30;

            return { producto, puntuacion };
        })
        .filter(res => res.puntuacion > 0)
        .sort((a, b) => b.puntuacion - a.puntuacion);

    mostrarResultadosInteligentes(resultados, textoOriginal);
}

function mostrarResultadosInteligentes(resultados, textoBuscado) {
    if (!resultado) return;

    if (!resultados.length) {
        resultado.innerHTML = `
            <div class="search-result-box">
                <strong>No encontramos coincidencias.</strong>
                <br><br>
                No encontramos un repuesto relacionado con:
                <strong>${escaparHTML(textoBuscado)}</strong>
                <br><br>
                Puedes probar con un número de parte, modelo, motor o nombre del repuesto.
            </div>
        `;
        return;
    }

    const productosEncontrados = resultados.map(item => item.producto);
    resultado.innerHTML = `
        <div class="search-result-box">
            <strong>${productosEncontrados.length} coincidencia(s) encontrada(s)</strong>
            <br>
            Búsqueda: <strong>${escaparHTML(textoBuscado)}</strong>
        </div>
        <div class="modal-products" style="margin-top:20px;">
            ${productosEncontrados.map(crearProductoHTML).join("")}
        </div>
    `;
}

partNumber?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarNumeroParte();
    }
});

searchPartBtn?.addEventListener("click", buscarNumeroParte);

/* =========================================================
   CATÁLOGO DIRECTO EN PÁGINA (RENDERIZADO Y FILTRADO)
========================================================= */

function crearProductoHTML(producto) {
    const categoriaProducto = obtenerNombreCategoria(producto.categoria);
    const ford = obtenerEtiquetas(producto.numeroParteFord);
    const motorcraft = obtenerEtiquetas(producto.codigoMotorcraft);
    const oem = obtenerEtiquetas(producto.codigoOEM);

    return `
        <div class="modal-product">
            <div class="modal-product-image">
                <img
                    src="${escaparHTML(producto.imagen)}"
                    alt="${escaparHTML(producto.nombre)}"
                    class="zoomable-product-image"
                    data-image="${escaparHTML(producto.imagen)}"
                    data-name="${escaparHTML(producto.nombre)}"
                    loading="lazy"
                    title="Haz clic para ampliar"
                    onerror="this.style.display='none';"
                >
            </div>

            <div class="modal-product-info">
                <h4>${escaparHTML(producto.nombre)}</h4>
                <p>${escaparHTML(producto.descripcion)}</p>
                <p><strong>Marca:</strong> ${escaparHTML(producto.marca)}</p>
                <p><strong>Modelo:</strong> ${escaparHTML(obtenerEtiquetas(producto.modelo))}</p>
                <p><strong>Motor:</strong> ${escaparHTML(obtenerEtiquetas(producto.motor))}</p>
                <p><strong>Años:</strong> ${escaparHTML(obtenerEtiquetas(producto.anios))}</p>
                <p><strong>Categoría:</strong> ${escaparHTML(categoriaProducto)}</p>
                ${ford ? `<p><strong>Ford:</strong> ${escaparHTML(ford)}</p>` : ""}
                ${motorcraft ? `<p><strong>Motorcraft:</strong> ${escaparHTML(motorcraft)}</p>` : ""}
                ${oem ? `<p><strong>OEM:</strong> ${escaparHTML(oem)}</p>` : ""}
                ${producto.codigoInterno ? `<p><strong>Código PartSolutions:</strong> ${escaparHTML(producto.codigoInterno)}</p>` : ""}
                <p><strong>Tipo:</strong> ${escaparHTML(producto.tipo)}</p>
                <p><strong>Disponibilidad:</strong> ${producto.disponibilidad ? "Disponible" : "Consultar disponibilidad"}</p>

                ${crearBloquePreciosHTML(producto, "modal")}

                <div class="product-actions">
                    <button
                        type="button"
                        class="add-to-cart-button"
                        data-product-id="${escaparHTML(producto.id)}"
                    >
                        🛒 Agregar al pedido
                    </button>

                    <button
                        type="button"
                        class="product-detail-button"
                        data-product-detail="${escaparHTML(producto.id)}"
                    >
                        Ver ficha completa →
                    </button>

                    <a
                        href="#contacto"
                        class="consult-button"
                        onclick="cerrarModal()"
                    >
                        Consultar disponibilidad
                    </a>
                </div>
            </div>
        </div>
    `;
}

function obtenerProductosCatalogoFiltrados() {
    let lista = obtenerTodosLosProductos();

    if (catalogCategoriaActual !== "todos") {
        lista = lista.filter(p => p.categoria === catalogCategoriaActual);
    }

    const texto = normalizarTexto(catalogTextoActual);
    if (!texto) return lista;

    return lista.filter(producto => {
        const datosBuscables = [
            producto.nombre,
            producto.descripcion,
            producto.marca,
            producto.tipo,
            producto.codigoInterno,
            producto.precio,
            ...convertirArray(producto.modelo),
            ...convertirArray(producto.motor),
            ...convertirArray(producto.anios),
            ...convertirArray(producto.numeroParteFord),
            ...convertirArray(producto.codigoMotorcraft),
            ...convertirArray(producto.codigoOEM)
        ];

        return datosBuscables.some(valor => normalizarTexto(valor).includes(texto));
    });
}

function crearTarjetaCatalogoHTML(producto) {
    const categoriaProducto = obtenerNombreCategoria(producto.categoria);
    const modelo = obtenerEtiquetas(producto.modelo);
    const motorProducto = obtenerEtiquetas(producto.motor);
    const ford = obtenerEtiquetas(producto.numeroParteFord);
    const codigo = producto.codigoInterno || producto.id;

    return `
        <article class="catalog-product-card">
            <div class="catalog-product-image-wrap">
                <span class="catalog-product-category">${escaparHTML(categoriaProducto)}</span>
                <img
                    src="${escaparHTML(producto.imagen)}"
                    alt="${escaparHTML(producto.nombre)}"
                    class="catalog-product-image zoomable-product-image"
                    data-image="${escaparHTML(producto.imagen)}"
                    data-name="${escaparHTML(producto.nombre)}"
                    loading="lazy"
                    title="Haz clic para ampliar"
                    onerror="this.style.display='none';"
                >
            </div>

            <div class="catalog-product-content">
                <span class="catalog-product-code">${escaparHTML(codigo)}</span>
                <h3>${escaparHTML(producto.nombre)}</h3>

                <div class="catalog-product-meta">
                    ${modelo ? `<span>🚗 ${escaparHTML(modelo)}</span>` : ""}
                    ${motorProducto ? `<span>⚙ ${escaparHTML(motorProducto)}</span>` : ""}
                </div>

                ${ford ? `<div class="catalog-product-part"><small>Ford</small><strong>${escaparHTML(ford)}</strong></div>` : ""}

                ${crearBloquePreciosHTML(producto, "catalog")}

                <div class="catalog-product-bottom">
                    <span class="catalog-product-status ${producto.disponibilidad ? "is-available" : "is-consult"}">
                        ${producto.disponibilidad ? "Disponible" : "Consultar"}
                    </span>
                </div>

                <div class="catalog-product-actions">
                    <button
                        type="button"
                        class="catalog-add-button add-to-cart-button"
                        data-product-id="${escaparHTML(producto.id)}"
                    >
                        🛒 Agregar al pedido
                    </button>

                    <button
                        type="button"
                        class="catalog-detail-button"
                        data-product-detail="${escaparHTML(producto.id)}"
                    >
                        Ver detalles
                    </button>
                </div>
            </div>
        </article>
    `;
}

function actualizarFiltrosCatalogo() {
    document.querySelectorAll("[data-catalog-category]").forEach(button => {
        button.classList.toggle("active", button.dataset.catalogCategory === catalogCategoriaActual);
    });
}

function renderizarCatalogoPrincipal() {
    if (!catalogProducts) return;

    const filtrados = obtenerProductosCatalogoFiltrados();
    const visibles = filtrados.slice(0, catalogLimite);

    catalogProducts.innerHTML = visibles.map(crearTarjetaCatalogoHTML).join("");

    if (catalogCount) {
        catalogCount.textContent = String(filtrados.length);
    }

    if (catalogEmpty) {
        catalogEmpty.hidden = filtrados.length > 0;
    }

    if (catalogLoadMore) {
        const hayMas = filtrados.length > visibles.length;
        catalogLoadMore.hidden = !hayMas;
    }

    actualizarFiltrosCatalogo();
}

function seleccionarCategoriaCatalogo(categoriaSeleccionada) {
    catalogCategoriaActual = categoriaSeleccionada || "todos";
    catalogLimite = CATALOGO_POR_PAGINA;
    renderizarCatalogoPrincipal();

    document.getElementById("catalogo")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function abrirCategoria(category) {
    seleccionarCategoriaCatalogo(category);
}

function cerrarModal() {
    // Compatibilidad retroactiva para enlaces antiguos
}

catalogSearch?.addEventListener("input", event => {
    catalogTextoActual = event.target.value || "";
    catalogLimite = CATALOGO_POR_PAGINA;
    renderizarCatalogoPrincipal();
});

catalogFilters?.addEventListener("click", event => {
    const button = event.target.closest("[data-catalog-category]");
    if (!button) return;
    seleccionarCategoriaCatalogo(button.dataset.catalogCategory);
});

catalogLoadMore?.addEventListener("click", () => {
    catalogLimite += CATALOGO_POR_PAGINA;
    renderizarCatalogoPrincipal();
});

/* =========================================================
   MENÚ MÓVIL Y ACCESOS RÁPIDOS
========================================================= */

menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("active");
    });
});

searchTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        searchTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tipo = tab.dataset.search;
        if (tipo === "vehicle") {
            vehicleSearch.style.display = "grid";
            partSearch.style.display = "none";
        } else {
            vehicleSearch.style.display = "none";
            partSearch.style.display = "block";
        }
    });
});

document.querySelector("[data-quick-part]")?.addEventListener("click", () => {
    const partTab = document.querySelector('.search-tab[data-search="part"]');
    partTab?.click();
});

/* =========================================================
   CARRUSEL DE CATEGORÍAS
========================================================= */

function inicializarCarruselCategorias() {
    const carousel = document.querySelector("[data-category-carousel]");
    const track = document.querySelector("[data-category-track]");
    const botonAnterior = document.querySelector("[data-category-prev]");
    const botonSiguiente = document.querySelector("[data-category-next]");

    if (!carousel || !track) return;
    if (carousel.dataset.carouselInitialized === "true") return;

    carousel.dataset.carouselInitialized = "true";

    const originales = Array.from(track.querySelectorAll(".category-card"));
    if (!originales.length) {
        carousel.dataset.carouselInitialized = "false";
        return;
    }

    // Duplicar tarjetas para efecto continuo
    originales.forEach(card => {
        const clon = card.cloneNode(true);
        clon.setAttribute("aria-hidden", "true");
        clon.setAttribute("tabindex", "-1");
        track.appendChild(clon);
    });

    let pausa = false;
    let arrastre = false;
    let inicioX = 0;
    let scrollInicio = 0;
    let anchoOriginal = 0;
    let ultimoTiempo = performance.now();

    function medirCarrusel() {
        const primera = originales[0];
        const ultima = originales[originales.length - 1];
        if (!primera || !ultima) return;

        const estilos = getComputedStyle(track);
        const gap = parseFloat(estilos.columnGap || estilos.gap) || 0;
        anchoOriginal = (ultima.offsetLeft + ultima.offsetWidth) - primera.offsetLeft + gap;
    }

    function normalizarCarrusel() {
        if (!anchoOriginal) medirCarrusel();
        if (carousel.scrollLeft >= anchoOriginal) {
            carousel.scrollLeft -= anchoOriginal;
        }
        if (carousel.scrollLeft < 0) {
            carousel.scrollLeft += anchoOriginal;
        }
    }

    function animar(tiempoActual) {
        const delta = Math.min(32, tiempoActual - ultimoTiempo);
        ultimoTiempo = tiempoActual;

        if (!pausa && !arrastre && anchoOriginal) {
            carousel.scrollLeft += delta * 0.75;
            normalizarCarrusel();
        }
        requestAnimationFrame(animar);
    }

    function moverCarrusel(direccion) {
        medirCarrusel();
        const primeraTarjeta = originales[0];
        if (!primeraTarjeta) return;

        const estilos = getComputedStyle(track);
        const gap = parseFloat(estilos.columnGap || estilos.gap) || 0;
        const paso = primeraTarjeta.getBoundingClientRect().width + gap;

        pausa = true;

        if (direccion < 0 && carousel.scrollLeft < paso) {
            carousel.scrollLeft = anchoOriginal + carousel.scrollLeft;
        }

        if (direccion > 0 && carousel.scrollLeft > (carousel.scrollWidth - carousel.clientWidth - paso)) {
            carousel.scrollLeft -= anchoOriginal;
        }

        carousel.scrollBy({ left: direccion * paso, behavior: "smooth" });

        setTimeout(() => {
            normalizarCarrusel();
            pausa = false;
        }, 650);
    }

    carousel.addEventListener("mouseenter", () => { pausa = true; });
    carousel.addEventListener("mouseleave", () => { pausa = false; });
    carousel.addEventListener("focusin", () => { pausa = true; });
    carousel.addEventListener("focusout", () => { pausa = false; });

    carousel.addEventListener("touchstart", () => { pausa = true; }, { passive: true });
    carousel.addEventListener("touchend", () => {
        setTimeout(() => { pausa = false; }, 1200);
    }, { passive: true });

    carousel.addEventListener("pointerdown", event => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        arrastre = true;
        inicioX = event.clientX;
        scrollInicio = carousel.scrollLeft;
        carousel.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", event => {
        if (!arrastre) return;
        carousel.scrollLeft = scrollInicio - (event.clientX - inicioX);
        normalizarCarrusel();
    });

    window.addEventListener("pointerup", () => {
        if (!arrastre) return;
        arrastre = false;
        carousel.classList.remove("is-dragging");
        pausa = false;
    });

    carousel.addEventListener("click", event => {
        const card = event.target.closest("[data-category]");
        if (!card) return;
        if (Math.abs(carousel.scrollLeft - scrollInicio) > 8) return;

        const categoria = card.dataset.category;
        if (categoria && typeof abrirCategoria === "function") {
            abrirCategoria(categoria);
        }
    });

    botonAnterior?.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        moverCarrusel(-1);
    });

    botonSiguiente?.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        moverCarrusel(1);
    });

    window.addEventListener("resize", () => {
        medirCarrusel();
        normalizarCarrusel();
    });

    medirCarrusel();
    requestAnimationFrame(animar);
}

/* =========================================================
   FICHA COMPLETA DEL PRODUCTO (MODAL)
========================================================= */

let productDetailModal = null;

function crearFichaProducto() {
    if (productDetailModal) return productDetailModal;

    productDetailModal = document.createElement("div");
    productDetailModal.className = "product-detail-modal";
    productDetailModal.setAttribute("aria-hidden", "true");

    productDetailModal.innerHTML = `
        <div class="product-detail-overlay" data-product-detail-close></div>
        <div class="product-detail-dialog">
            <button type="button" class="product-detail-close" data-product-detail-close aria-label="Cerrar">×</button>
            <div class="product-detail-content" id="productDetailContent"></div>
        </div>
    `;

    document.body.appendChild(productDetailModal);
    return productDetailModal;
}

function abrirFichaProducto(id) {
    const producto = obtenerProductoPorId(id);
    if (!producto) return;

    const modal = crearFichaProducto();
    const contenido = modal.querySelector("#productDetailContent");

    const ford = obtenerEtiquetas(producto.numeroParteFord);
    const motorcraft = obtenerEtiquetas(producto.codigoMotorcraft);
    const oem = obtenerEtiquetas(producto.codigoOEM);
    const categoriaProducto = obtenerNombreCategoria(producto.categoria);

    contenido.innerHTML = `
        <div class="product-detail-image">
            <img
                src="${escaparHTML(producto.imagen)}"
                alt="${escaparHTML(producto.nombre)}"
                class="zoomable-product-image"
                data-image="${escaparHTML(producto.imagen)}"
                data-name="${escaparHTML(producto.nombre)}"
                onerror="this.style.display='none';"
            >
        </div>

        <div class="product-detail-info">
            <span class="product-detail-eyebrow">PARTSOLUTIONS</span>
            <h2>${escaparHTML(producto.nombre)}</h2>
            <p class="product-detail-description">${escaparHTML(producto.descripcion)}</p>

            <div class="product-detail-status">
                <span class="${producto.disponibilidad ? "available" : "unavailable"}">
                    ${producto.disponibilidad ? "● Disponible" : "● Consultar disponibilidad"}
                </span>
            </div>

            <div class="product-detail-grid">
                <div><small>Marca</small><strong>${escaparHTML(producto.marca)}</strong></div>
                <div><small>Categoría</small><strong>${escaparHTML(categoriaProducto)}</strong></div>
                <div><small>Modelo</small><strong>${escaparHTML(obtenerEtiquetas(producto.modelo))}</strong></div>
                <div><small>Motor</small><strong>${escaparHTML(obtenerEtiquetas(producto.motor))}</strong></div>
                <div><small>Años</small><strong>${escaparHTML(obtenerEtiquetas(producto.anios))}</strong></div>
                <div><small>Código PartSolutions</small><strong>${escaparHTML(producto.codigoInterno || producto.id)}</strong></div>
            </div>

            <div class="product-detail-codes">
                ${ford ? `<div><span>Número de parte Ford</span><strong>${escaparHTML(ford)}</strong></div>` : ""}
                ${motorcraft ? `<div><span>Motorcraft</span><strong>${escaparHTML(motorcraft)}</strong></div>` : ""}
                ${oem ? `<div><span>OEM</span><strong>${escaparHTML(oem)}</strong></div>` : ""}
            </div>

            <div class="product-detail-price">
                <span>Precio</span>
                <strong>${escaparHTML(formatearPrecio(producto))}</strong>
            </div>

            <div class="product-detail-actions">
                <button type="button" class="product-detail-cart" data-detail-cart="${escaparHTML(producto.id)}">
                    🛒 Agregar al pedido
                </button>
                <button type="button" class="product-detail-whatsapp" data-detail-whatsapp="${escaparHTML(producto.id)}">
                    Consultar por WhatsApp
                </button>
            </div>
        </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function cerrarFichaProducto() {
    if (!productDetailModal) return;
    productDetailModal.classList.remove("active");
    productDetailModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

/* =========================================================
   VISOR DE IMAGEN AMPLIADA (LIGHTBOX ZOOM)
========================================================= */

let imageViewer = null;
let imageViewerScale = 1;
let imageViewerDragging = false;
let imageViewerStartX = 0;
let imageViewerStartY = 0;
let imageViewerOffsetX = 0;
let imageViewerOffsetY = 0;

function crearVisorImagen() {
    if (imageViewer) return imageViewer;

    imageViewer = document.createElement("div");
    imageViewer.className = "image-lightbox";
    imageViewer.setAttribute("aria-hidden", "true");

    imageViewer.innerHTML = `
        <div class="image-lightbox-content" role="dialog" aria-modal="true" aria-label="Imagen ampliada">
            <button type="button" class="image-lightbox-close" aria-label="Cerrar imagen" title="Cerrar">×</button>
            <div class="image-lightbox-toolbar">
                <button type="button" class="image-lightbox-tool" data-action="zoom-out" title="Alejar">−</button>
                <button type="button" class="image-lightbox-tool image-lightbox-reset" data-action="reset" title="Restablecer zoom">100%</button>
                <button type="button" class="image-lightbox-tool" data-action="zoom-in" title="Acercar">+</button>
            </div>
            <div class="image-lightbox-stage">
                <img class="image-lightbox-img" src="" alt="">
            </div>
            <div class="image-lightbox-caption"></div>
        </div>
    `;

    document.body.appendChild(imageViewer);

    const stage = imageViewer.querySelector(".image-lightbox-stage");
    const image = imageViewer.querySelector(".image-lightbox-img");

    function aplicarTransformacion() {
        image.style.transform = `translate(${imageViewerOffsetX}px, ${imageViewerOffsetY}px) scale(${imageViewerScale})`;
        const resetButton = imageViewer.querySelector(".image-lightbox-reset");
        if (resetButton) {
            resetButton.textContent = `${Math.round(imageViewerScale * 100)}%`;
        }
        stage.classList.toggle("is-zoomed", imageViewerScale > 1);
    }

    function resetearZoom() {
        imageViewerScale = 1;
        imageViewerOffsetX = 0;
        imageViewerOffsetY = 0;
        aplicarTransformacion();
    }

    function cambiarZoom(cantidad) {
        imageViewerScale = Math.min(4, Math.max(1, imageViewerScale + cantidad));
        if (imageViewerScale === 1) {
            imageViewerOffsetX = 0;
            imageViewerOffsetY = 0;
        }
        aplicarTransformacion();
    }

    imageViewer.addEventListener("click", event => {
        if (event.target === imageViewer) cerrarImagenGrande();
    });

    imageViewer.querySelector(".image-lightbox-close").addEventListener("click", cerrarImagenGrande);

    imageViewer.querySelectorAll(".image-lightbox-tool").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;
            if (action === "zoom-in") cambiarZoom(0.25);
            if (action === "zoom-out") cambiarZoom(-0.25);
            if (action === "reset") resetearZoom();
        });
    });

    stage.addEventListener("wheel", event => {
        if (!imageViewer.classList.contains("active")) return;
        event.preventDefault();
        cambiarZoom(event.deltaY < 0 ? 0.25 : -0.25);
    }, { passive: false });

    stage.addEventListener("mousedown", event => {
        if (imageViewerScale <= 1) return;
        imageViewerDragging = true;
        imageViewerStartX = event.clientX - imageViewerOffsetX;
        imageViewerStartY = event.clientY - imageViewerOffsetY;
        image.classList.add("is-dragging");
    });

    window.addEventListener("mousemove", event => {
        if (!imageViewerDragging) return;
        imageViewerOffsetX = event.clientX - imageViewerStartX;
        imageViewerOffsetY = event.clientY - imageViewerStartY;
        aplicarTransformacion();
    });

    window.addEventListener("mouseup", () => {
        imageViewerDragging = false;
        image.classList.remove("is-dragging");
    });

    stage.addEventListener("touchstart", event => {
        if (imageViewerScale <= 1 || event.touches.length !== 1) return;
        imageViewerDragging = true;
        imageViewerStartX = event.touches[0].clientX - imageViewerOffsetX;
        imageViewerStartY = event.touches[0].clientY - imageViewerOffsetY;
    }, { passive: true });

    stage.addEventListener("touchmove", event => {
        if (!imageViewerDragging || event.touches.length !== 1) return;
        event.preventDefault();
        imageViewerOffsetX = event.touches[0].clientX - imageViewerStartX;
        imageViewerOffsetY = event.touches[0].clientY - imageViewerStartY;
        aplicarTransformacion();
    }, { passive: false });

    stage.addEventListener("touchend", () => {
        imageViewerDragging = false;
    });

    image.addEventListener("dblclick", () => {
        if (imageViewerScale === 1) cambiarZoom(1);
        else resetearZoom();
    });

    return imageViewer;
}

function abrirImagenGrande(imagen, nombre) {
    const visor = crearVisorImagen();
    const image = visor.querySelector(".image-lightbox-img");
    const caption = visor.querySelector(".image-lightbox-caption");

    imageViewerScale = 1;
    imageViewerOffsetX = 0;
    imageViewerOffsetY = 0;
    imageViewerDragging = false;

    image.src = imagen;
    image.alt = nombre || "Imagen del repuesto";
    caption.textContent = nombre || "";
    image.style.transform = "translate(0px, 0px) scale(1)";
    image.classList.remove("is-dragging");

    visor.classList.add("active");
    visor.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const resetButton = visor.querySelector(".image-lightbox-reset");
    if (resetButton) resetButton.textContent = "100%";
}

function cerrarImagenGrande() {
    if (!imageViewer) return;
    imageViewer.classList.remove("active");
    imageViewer.setAttribute("aria-hidden", "true");

    const image = imageViewer.querySelector(".image-lightbox-img");
    if (image) {
        image.src = "";
        image.classList.remove("is-dragging");
    }

    document.body.style.overflow = "";
}

/* =========================================================
   CARRITO / SOLICITUD DE PEDIDO Y WHATSAPP
========================================================= */

function cargarCarritoPedido() {
    try {
        const guardado = localStorage.getItem("partsolutions_carrito");
        const datos = guardado ? JSON.parse(guardado) : [];
        if (!Array.isArray(datos)) return [];

        return datos
            .filter(item => item && item.id)
            .map(item => ({
                id: item.id,
                cantidad: Math.max(1, Number(item.cantidad || 1)),
                modalidad: item.modalidad === "cashea" || item.modalidad === "ambos" ? item.modalidad : "contado",
                nivelCashea: Math.min(6, Math.max(1, Number(item.nivelCashea || 6)))
            }));
    } catch (error) {
        console.warn("No se pudo cargar el carrito.", error);
        return [];
    }
}

function guardarCarritoPedido() {
    try {
        localStorage.setItem("partsolutions_carrito", JSON.stringify(carritoPedido));
    } catch (error) {
        console.warn("No se pudo guardar el carrito.", error);
    }
}

function obtenerProductoPorId(id) {
    return obtenerTodosLosProductos().find(p => String(p.id) === String(id));
}

function cantidadTotalCarrito() {
    return carritoPedido.reduce((total, item) => total + Number(item.cantidad || 0), 0);
}

function agregarAlPedido(id) {
    const producto = obtenerProductoPorId(id);
    if (!producto) {
        alert("No pudimos encontrar este producto.");
        return;
    }

    const existente = carritoPedido.find(item => String(item.id) === String(producto.id));
    if (existente) {
        existente.cantidad += 1;
        existente.modalidad = modoPrecioActual;
        existente.nivelCashea = nivelCasheaActual;
    } else {
        carritoPedido.push({
            id: producto.id,
            cantidad: 1,
            modalidad: modoPrecioActual,
            nivelCashea: nivelCasheaActual
        });
    }

    guardarCarritoPedido();
    actualizarCarrito();
    mostrarConfirmacionCarrito(producto.nombre);
}

function cambiarCantidadPedido(id, cambio) {
    const item = carritoPedido.find(p => String(p.id) === String(id));
    if (!item) return;

    item.cantidad = Math.max(0, Number(item.cantidad || 0) + Number(cambio || 0));
    if (item.cantidad <= 0) {
        carritoPedido = carritoPedido.filter(p => String(p.id) !== String(id));
    }

    guardarCarritoPedido();
    actualizarCarrito();
}

function eliminarDelPedido(id) {
    carritoPedido = carritoPedido.filter(p => String(p.id) !== String(id));
    guardarCarritoPedido();
    actualizarCarrito();
}

function vaciarPedido() {
    if (carritoPedido.length === 0) return;
    if (!confirm("¿Quieres vaciar todo el pedido?")) return;

    carritoPedido = [];
    guardarCarritoPedido();
    actualizarCarrito();
}

function obtenerTextoPedido() {
    if (carritoPedido.length === 0) return "";

    const lineas = [
        MENSAJE_WHATSAPP_PARTSOLUTIONS,
        ""
    ];

    const usuario = window.obtenerUsuarioActual ? window.obtenerUsuarioActual() : null;
    if (usuario) {
        lineas.push(
            "👤 *DATOS DEL CLIENTE:*",
            `• Nombre: ${usuario.nombre || "No especificado"}`,
            `• Teléfono: ${usuario.telefono || "No especificado"}`
        );

        if (usuario.vehiculoModelo) {
            lineas.push(
                `• Vehículo Ford: ${usuario.vehiculoModelo} ${usuario.vehiculoAnio || ""} ${usuario.vehiculoMotor ? `(Motor: ${usuario.vehiculoMotor})` : ""}`.trim()
            );
        }

        lineas.push(
            "---------------------------------",
            ""
        );
    }

    lineas.push(
        "Detalle del pedido:",
        ""
    );

    let totalContado = 0;
    let totalCashea = 0;
    let totalInicialCashea = 0;
    let totalCuotasCashea = 0;

    carritoPedido.forEach((item, indice) => {
        const producto = obtenerProductoPorId(item.id);
        if (!producto) return;

        const precio = obtenerPrecioNumero(producto);
        const cantidad = Number(item.cantidad || 1);
        const modalidad = item.modalidad || "contado";
        const nivel = Number(item.nivelCashea || 6);
        const cashea = obtenerDetalleCashea(producto, nivel);

        if (precio !== null) totalContado += precio * cantidad;
        if (cashea) {
            totalCashea += cashea.precioTotalCashea * cantidad;
            totalInicialCashea += cashea.inicialDeCashea * cantidad;
            totalCuotasCashea += cashea.cuotasQuincenales * cantidad;
        }

        lineas.push(
            `${indice + 1}. ${producto.nombre}`,
            `Código PartSolutions: ${producto.codigoInterno || producto.id}`,
            `Cantidad: ${cantidad}`,
            `Modalidad: ${modalidad === "cashea" ? `Cashea - Nivel ${nivel}` : modalidad === "ambos" ? `Contado + Cashea - Nivel ${nivel}` : "Precio de contado"}`
        );

        if (precio !== null) {
            lineas.push(`Precio de contado: ${formatearMonto(precio)}`);
        }

        if ((modalidad === "cashea" || modalidad === "ambos") && cashea) {
            lineas.push(
                `Total Cashea: ${formatearMonto(cashea.precioTotalCashea)}`,
                `Inicial (${Math.round(cashea.porcentajeInicial * 100)}%): ${formatearMonto(cashea.inicialDeCashea)}`,
                `3 cuotas quincenales: ${formatearMonto(cashea.cuotasQuincenales)}`
            );
        }

        lineas.push(
            `Modelo: ${obtenerEtiquetas(producto.modelo)}`,
            `Motor: ${obtenerEtiquetas(producto.motor)}`,
            ""
        );
    });

    lineas.push(
        `Total contado: ${formatearMonto(totalContado)}`,
        `Total Cashea: ${formatearMonto(totalCashea)}`,
        `Inicial Cashea estimada: ${formatearMonto(totalInicialCashea)}`,
        `3 cuotas quincenales: ${formatearMonto(totalCuotasCashea)}`,
        "",
        "Por favor, confirmen precio final y disponibilidad.",
        "",
        "Gracias."
    );

    return lineas.join("\n");
}

function enviarPedidoWhatsApp() {
    if (carritoPedido.length === 0) {
        alert("Agrega al menos un repuesto al pedido.");
        return;
    }

    const numero = NUMERO_WHATSAPP_PARTSOLUTIONS.replace(/\D/g, "");
    const mensaje = encodeURIComponent(obtenerTextoPedido());
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank", "noopener,noreferrer");
}

function crearCarritoHTML() {
    if (document.getElementById("partsolutionsCart")) return;

    const carrito = document.createElement("aside");
    carrito.id = "partsolutionsCart";
    carrito.className = "partsolutions-cart";
    carrito.setAttribute("aria-hidden", "true");

    carrito.innerHTML = `
    <button type="button" class="cart-floating-tab" data-cart-open aria-label="Abrir mi pedido">
        <span class="cart-floating-tab-icon">🛒</span>
        <span class="cart-floating-tab-text">Mi pedido</span>
        <b class="cart-floating-tab-count" id="cartFloatingCount">0</b>
    </button>

    <div class="cart-overlay" data-cart-close></div>

    <div class="cart-panel">
        <div class="cart-header">
            <div>
                <span class="cart-eyebrow">PARTSOLUTIONS</span>
                <h2>Mi pedido</h2>
                <p>Repuestos que deseas consultar.</p>
            </div>
            <button type="button" class="cart-close" data-cart-close aria-label="Cerrar pedido">×</button>
        </div>

        <div class="cart-items" id="cartItems"></div>

        <div class="cart-empty" id="cartEmpty">
            <div class="cart-empty-icon">🛒</div>
            <h3>Tu pedido está vacío</h3>
            <p>Agrega los repuestos que deseas consultar.</p>
        </div>

        <div class="cart-footer">
            <div class="cart-summary">
                <div class="cart-total-row">
                    <span>Unidades</span>
                    <strong id="cartTotal">0</strong>
                </div>
                <div class="cart-total-row cart-estimated-total">
                    <span>Total estimado</span>
                    <strong id="cartEstimatedTotal">$0</strong>
                </div>
                <small class="cart-total-note">El total es un estimado según los precios publicados.</small>
            </div>

            <button type="button" class="cart-whatsapp" id="cartWhatsApp">
                <span>Enviar pedido por WhatsApp</span>
                <span>→</span>
            </button>
            <button type="button" class="cart-clear" id="cartClear">Vaciar pedido</button>
        </div>
    </div>
    `;

    document.body.appendChild(carrito);
}

function renderizarCarrito() {
    const itemsContainer = document.getElementById("cartItems");
    const emptyState = document.getElementById("cartEmpty");
    const totalElement = document.getElementById("cartTotal");
    const estimatedTotalElement = document.getElementById("cartEstimatedTotal");

    if (!itemsContainer || !emptyState || !totalElement) return;

    if (carritoPedido.length === 0) {
        itemsContainer.innerHTML = "";
        itemsContainer.style.display = "none";
        emptyState.style.display = "flex";
        totalElement.textContent = "0";
        if (estimatedTotalElement) estimatedTotalElement.innerHTML = "$0";
        return;
    }

    itemsContainer.style.display = "flex";
    emptyState.style.display = "none";

    let totalContado = 0;
    let totalCashea = 0;
    let totalInicialCashea = 0;
    let totalCuotasCashea = 0;
    let hayPrecioFaltante = false;

    itemsContainer.innerHTML = carritoPedido.map(item => {
        const producto = obtenerProductoPorId(item.id);
        if (!producto) return "";

        const precio = obtenerPrecioNumero(producto);
        const cantidad = Number(item.cantidad || 1);
        const modalidad = item.modalidad || "contado";
        const nivel = Number(item.nivelCashea || 6);
        const cashea = obtenerDetalleCashea(producto, nivel);
        const subtotalContado = subtotalProducto(producto, cantidad);

        if (precio !== null) totalContado += precio * cantidad;
        else hayPrecioFaltante = true;

        if (cashea) {
            totalCashea += cashea.precioTotalCashea * cantidad;
            totalInicialCashea += cashea.inicialDeCashea * cantidad;
            totalCuotasCashea += cashea.cuotasQuincenales * cantidad;
        }

        let pricingHTML = "";
        if (modalidad === "cashea" && cashea) {
            pricingHTML = `
                <div class="cart-item-pricing-main cashea">
                    <span>Cashea · Nivel ${nivel}</span>
                    <strong>${escaparHTML(formatearMonto(cashea.precioTotalCashea))}</strong>
                </div>
                <div class="cart-item-pricing-details">
                    <span>Inicial: <strong>${escaparHTML(formatearMonto(cashea.inicialDeCashea))}</strong></span>
                    <span>3 cuotas: <strong>${escaparHTML(formatearMonto(cashea.cuotasQuincenales))}</strong></span>
                </div>
            `;
        } else if (modalidad === "ambos" && cashea) {
            pricingHTML = `
                <div class="cart-item-pricing-main">
                    <span>Contado</span>
                    <strong>${precio !== null ? escaparHTML(formatearMonto(precio)) : "Consultar"}</strong>
                </div>
                <div class="cart-item-pricing-main cashea">
                    <span>Cashea · Nivel ${nivel}</span>
                    <strong>${escaparHTML(formatearMonto(cashea.precioTotalCashea))}</strong>
                </div>
                <div class="cart-item-pricing-details">
                    <span>Inicial: <strong>${escaparHTML(formatearMonto(cashea.inicialDeCashea))}</strong></span>
                    <span>3 cuotas: <strong>${escaparHTML(formatearMonto(cashea.cuotasQuincenales))}</strong></span>
                </div>
            `;
        } else {
            pricingHTML = `
                <div class="cart-item-pricing-main">
                    <span>Precio unitario</span>
                    <strong>${precio !== null ? escaparHTML(formatearMonto(precio)) : "Consultar"}</strong>
                </div>
                <div class="cart-item-pricing-details">
                    <span>Subtotal: <strong>${subtotalContado !== null ? escaparHTML(formatearMonto(subtotalContado)) : "Consultar"}</strong></span>
                </div>
            `;
        }

        return `
            <article class="cart-item">
                <div class="cart-item-image">
                    <img
                        src="${escaparHTML(producto.imagen)}"
                        alt="${escaparHTML(producto.nombre)}"
                        onerror="this.style.display='none';"
                    >
                </div>

                <div class="cart-item-info">
                    <div class="cart-item-topline">
                        <span class="cart-item-badge">${modalidad === "cashea" ? `CASHEA · NIVEL ${nivel}` : modalidad === "ambos" ? `CONTADO + CASHEA · NIVEL ${nivel}` : "CONTADO"}</span>
                    </div>

                    <h3>${escaparHTML(producto.nombre)}</h3>

                    <span class="cart-item-code">
                        ${escaparHTML(producto.codigoInterno || producto.id)}
                    </span>

                    <p>
                        ${escaparHTML(obtenerEtiquetas(producto.modelo))}
                        ${obtenerEtiquetas(producto.motor) ? ` · ${escaparHTML(obtenerEtiquetas(producto.motor))}` : ""}
                    </p>

                    <div class="cart-item-prices">
                        ${pricingHTML}
                    </div>

                    <div class="cart-item-bottom">
                        <div class="cart-quantity">
                            <button type="button" data-cart-minus="${escaparHTML(producto.id)}">−</button>
                            <span>${cantidad}</span>
                            <button type="button" data-cart-plus="${escaparHTML(producto.id)}">+</button>
                        </div>

                        <button
                            type="button"
                            class="cart-remove"
                            data-cart-remove="${escaparHTML(producto.id)}"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    totalElement.textContent = String(cantidadTotalCarrito());

    if (estimatedTotalElement) {
        if (modoPrecioActual === "cashea") {
            estimatedTotalElement.innerHTML = `
                <span class="cart-total-primary-label">Total Cashea</span>
                <strong>${formatearMonto(totalCashea)}${hayPrecioFaltante ? " + consultar" : ""}</strong>
                <small>Inicial estimada: ${formatearMonto(totalInicialCashea)} · 3 cuotas: ${formatearMonto(totalCuotasCashea)}</small>
            `;
        } else if (modoPrecioActual === "ambos") {
            estimatedTotalElement.innerHTML = `
                <span class="cart-total-primary-label">Contado</span>
                <strong>${formatearMonto(totalContado)}${hayPrecioFaltante ? " + consultar" : ""}</strong>
                <small>Cashea: ${formatearMonto(totalCashea)}</small>
            `;
        } else {
            estimatedTotalElement.innerHTML = `
                <span class="cart-total-primary-label">Total contado</span>
                <strong>${formatearMonto(totalContado)}${hayPrecioFaltante ? " + consultar" : ""}</strong>
            `;
        }
    }
}

function actualizarContadorCarrito() {
    const total = cantidadTotalCarrito();

    const contador = document.getElementById("cartCount");
    if (contador) {
        contador.textContent = String(total);
        contador.classList.toggle("has-items", total > 0);
    }

    const contadorFlotante = document.getElementById("cartFloatingCount");
    if (contadorFlotante) {
        contadorFlotante.textContent = String(total);
    }
}

function actualizarCarrito() {
    renderizarCarrito();
    actualizarContadorCarrito();
}

function abrirCarrito() {
    const carrito = document.getElementById("partsolutionsCart");
    if (!carrito) return;
    carrito.classList.add("active");
    carrito.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
}

function cerrarCarrito() {
    const carrito = document.getElementById("partsolutionsCart");
    if (!carrito) return;
    carrito.classList.remove("active");
    carrito.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
}

function mostrarConfirmacionCarrito(nombreProducto) {
    const existente = document.querySelector(".cart-toast");
    existente?.remove();

    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.innerHTML = `
        <span class="cart-toast-check">✓</span>
        <div>
            <strong>Agregado al pedido</strong>
            <small>${escaparHTML(nombreProducto)}</small>
        </div>
        <button type="button" class="cart-toast-button">Ver pedido</button>
    `;

    document.body.appendChild(toast);

    toast.querySelector(".cart-toast-button")?.addEventListener("click", () => {
        toast.remove();
        abrirCarrito();
    });

    setTimeout(() => {
        toast.remove();
    }, 4500);
}

/* =========================================================
   DELEGACIÓN DE EVENTOS GLOBALES
========================================================= */

document.addEventListener("click", event => {
    // Ficha de detalle de producto
    const detalle = event.target.closest("[data-product-detail]");
    if (detalle) {
        abrirFichaProducto(detalle.dataset.productDetail);
        return;
    }

    const cerrarDetalle = event.target.closest("[data-product-detail-close]");
    if (cerrarDetalle) {
        cerrarFichaProducto();
        return;
    }

    const agregarDesdeFicha = event.target.closest("[data-detail-cart]");
    if (agregarDesdeFicha) {
        agregarAlPedido(agregarDesdeFicha.dataset.detailCart);
        return;
    }

    const consultarDesdeFicha = event.target.closest("[data-detail-whatsapp]");
    if (consultarDesdeFicha) {
        const producto = obtenerProductoPorId(consultarDesdeFicha.dataset.detailWhatsapp);
        if (producto) {
            const mensaje = encodeURIComponent(
                `${MENSAJE_WHATSAPP_PARTSOLUTIONS}\n\n` +
                `Deseo consultar el repuesto:\n\n` +
                `${producto.nombre}\n` +
                `Código: ${producto.codigoInterno || producto.id}\n` +
                `Número Ford: ${obtenerEtiquetas(producto.numeroParteFord) || "Consultar"}`
            );
            const numero = NUMERO_WHATSAPP_PARTSOLUTIONS.replace(/\D/g, "");
            window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank", "noopener,noreferrer");
        }
        return;
    }

    // Carrito
    const addButton = event.target.closest(".add-to-cart-button");
    if (addButton) {
        agregarAlPedido(addButton.dataset.productId);
        return;
    }

    const openButton = event.target.closest("[data-cart-open]");
    if (openButton) {
        abrirCarrito();
        return;
    }

    const closeButton = event.target.closest("[data-cart-close]");
    if (closeButton) {
        cerrarCarrito();
        return;
    }

    const plusButton = event.target.closest("[data-cart-plus]");
    if (plusButton) {
        cambiarCantidadPedido(plusButton.dataset.cartPlus, 1);
        return;
    }

    const minusButton = event.target.closest("[data-cart-minus]");
    if (minusButton) {
        cambiarCantidadPedido(minusButton.dataset.cartMinus, -1);
        return;
    }

    const removeButton = event.target.closest("[data-cart-remove]");
    if (removeButton) {
        eliminarDelPedido(removeButton.dataset.cartRemove);
        return;
    }

    // Visor de imagen grande
    const zoomImage = event.target.closest(".zoomable-product-image");
    if (zoomImage) {
        const ruta = zoomImage.dataset.image || zoomImage.getAttribute("src");
        const nombre = zoomImage.dataset.name || zoomImage.alt || "Imagen del repuesto";
        if (ruta) abrirImagenGrande(ruta, nombre);
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (imageViewer?.classList.contains("active")) {
            cerrarImagenGrande();
            return;
        }
        if (productDetailModal?.classList.contains("active")) {
            cerrarFichaProducto();
            return;
        }
        cerrarCarrito();
    }
});

/* =========================================================
   INICIALIZACIÓN DEL SISTEMA
========================================================= */

async function inicializar() {
    // Configurar selects vacíos
    resetSelect(modelo, "Selecciona un modelo");
    resetSelect(motor, "Selecciona un motor");
    resetSelect(ano, "Selecciona un año");
    resetSelect(categoria, "Selecciona una categoría");

    // Construir estructura del carrito en el DOM
    crearCarritoHTML();
    actualizarCarrito();

    document.getElementById("cartWhatsApp")?.addEventListener("click", enviarPedidoWhatsApp);
    document.getElementById("cartClear")?.addEventListener("click", vaciarPedido);

    // Cargar catálogo maestro desde Excel
    try {
        const total = await cargarCatalogoDesdeExcel();
        console.info(`PartSolutions: Catálogo listo con ${total} productos cargados desde Excel.`);

        cargarMarcas();
        cargarCategorias();
        actualizarConteosCategorias();
        renderizarCatalogoPrincipal();
    } catch (error) {
        console.error("Error cargando Excel:", error);

        cargarMarcas();
        cargarCategorias();
        renderizarCatalogoPrincipal();

        mostrarMensajeResultado(`
            <strong>⚠️ No se pudo cargar el catálogo.</strong>
            <br><br>
            Verifica que <strong>${ARCHIVO_CATALOGO_EXCEL}</strong> esté en la misma carpeta que <strong>index.html</strong>.
            <br><br>
            Recuerda abrir el proyecto mediante un servidor web local (por ejemplo, <strong>Live Server</strong> en VS Code).
            <br><br>
            Detalle: ${escaparHTML(error.message)}
        `);
    }

    inicializarSelectorPrecios();
    inicializarCarruselCategorias();
}

/* =========================================================
   EXPORTACIÓN GLOBAL Y ARRANQUE
========================================================= */

window.abrirCategoria = abrirCategoria;
window.cerrarModal = cerrarModal;
window.buscarNumeroParte = buscarNumeroParte;
window.agregarAlPedido = agregarAlPedido;
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;
window.vehiculosFord = vehiculosFord;
window.obtenerTodosLosProductos = obtenerTodosLosProductos;
window.renderizarCatalogoPrincipal = renderizarCatalogoPrincipal;
window.abrirImagenGrande = abrirImagenGrande;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    inicializar();
}
