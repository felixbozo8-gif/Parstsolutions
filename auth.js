/* =========================================================
   PARTSOLUTIONS - SISTEMA DE AUTENTICACIÓN Y REGISTRO DE USUARIOS
   =========================================================
   Soporta Firebase Auth + Cloud Firestore con modo fallback
   local automático para pruebas inmediatas.
   ========================================================= */

"use strict";

(function () {
    // Estado del usuario en sesión
    window.usuarioPartsolutions = null;

    let firebaseActivo = false;
    let auth = null;
    let db = null;

    // Verificar si Firebase está cargado y configurado
    function inicializarFirebase() {
        if (
            typeof firebase !== "undefined" &&
            typeof firebaseConfig !== "undefined" &&
            firebaseConfig.apiKey &&
            firebaseConfig.apiKey !== "PEGAR_AQUI_API_KEY"
        ) {
            try {
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                auth = firebase.auth();
                db = firebase.firestore();
                firebaseActivo = true;

                // Escuchar cambios de autenticación en Firebase
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        try {
                            const doc = await db.collection("usuarios").doc(user.uid).get();
                            if (doc.exists) {
                                window.usuarioPartsolutions = { uid: user.uid, email: user.email, ...doc.data() };
                            } else {
                                window.usuarioPartsolutions = {
                                    uid: user.uid,
                                    email: user.email,
                                    nombre: user.displayName || user.email.split("@")[0],
                                    telefono: "",
                                    vehiculoModelo: "",
                                    vehiculoAnio: "",
                                    vehiculoMotor: ""
                                };
                            }
                        } catch (e) {
                            console.warn("No se pudo leer el perfil de Firestore, usando datos básicos:", e);
                            window.usuarioPartsolutions = {
                                uid: user.uid,
                                email: user.email,
                                nombre: user.displayName || user.email.split("@")[0]
                            };
                        }
                    } else {
                        window.usuarioPartsolutions = null;
                    }
                    actualizarUIUsuario();
                    dispararEventoAuth();
                });

                console.log("✅ Firebase Authentication y Firestore conectados exitosamente.");
                return true;
            } catch (err) {
                console.error("Error al inicializar Firebase:", err);
                firebaseActivo = false;
            }
        }

        // Modo Fallback Local (si aún no se han colocado las claves en firebase-config.js)
        cargarSesionLocal();
        return false;
    }

    // Modo de persistencia local (demo / offline)
    function cargarSesionLocal() {
        try {
            const guardado = localStorage.getItem("partsolutions_usuario_actual");
            if (guardado) {
                window.usuarioPartsolutions = JSON.parse(guardado);
            } else {
                window.usuarioPartsolutions = null;
            }
        } catch (e) {
            window.usuarioPartsolutions = null;
        }
        actualizarUIUsuario();
        dispararEventoAuth();
    }

    function guardarSesionLocal(usuario) {
        window.usuarioPartsolutions = usuario;
        if (usuario) {
            localStorage.setItem("partsolutions_usuario_actual", JSON.stringify(usuario));
            // Guardar en la lista histórica de usuarios locales
            const lista = JSON.parse(localStorage.getItem("partsolutions_usuarios_registrados") || "[]");
            const idx = lista.findIndex(u => u.email === usuario.email);
            if (idx >= 0) {
                lista[idx] = usuario;
            } else {
                lista.push(usuario);
            }
            localStorage.setItem("partsolutions_usuarios_registrados", JSON.stringify(lista));
        } else {
            localStorage.removeItem("partsolutions_usuario_actual");
        }
        actualizarUIUsuario();
        dispararEventoAuth();
    }

    function dispararEventoAuth() {
        window.dispatchEvent(
            new CustomEvent("partsolutions:auth-changed", {
                detail: window.usuarioPartsolutions
            })
        );
    }

    /* =========================================================
       CREACIÓN E INYECCIÓN DEL MODAL DE AUTENTICACIÓN
       ========================================================= */
    function inyectarModalAuth() {
        if (document.getElementById("authModal")) return;

        const modal = document.createElement("div");
        modal.id = "authModal";
        modal.className = "auth-modal";
        modal.setAttribute("aria-hidden", "true");

        modal.innerHTML = `
            <div class="auth-overlay" data-auth-close></div>
            <div class="auth-dialog" role="dialog" aria-modal="true">
                <button type="button" class="auth-close" data-auth-close aria-label="Cerrar modal">&times;</button>
                
                <div class="auth-header">
                    <div class="auth-logo-badge">
                        <span>PS</span>
                    </div>
                    <h3 id="authTitle">Bienvenido a PartSolutions</h3>
                    <p id="authSubtitle">Accede o regístrate para vincular tu vehículo y agilizar tus pedidos.</p>
                </div>

                <div id="authAlert" class="auth-alert" style="display:none;"></div>

                <!-- TABS DE NAVEGACIÓN -->
                <div class="auth-tabs" id="authTabs">
                    <button type="button" class="auth-tab-btn active" data-auth-tab="login">Iniciar sesión</button>
                    <button type="button" class="auth-tab-btn" data-auth-tab="register">Crear cuenta</button>
                </div>

                <!-- FORMULARIO 1: INICIAR SESIÓN -->
                <form id="formAuthLogin" class="auth-form active">
                    <div class="auth-field">
                        <label for="loginEmail">Correo electrónico *</label>
                        <input type="email" id="loginEmail" required placeholder="tu-correo@ejemplo.com" autocomplete="email">
                    </div>
                    <div class="auth-field">
                        <div class="auth-label-row">
                            <label for="loginPassword">Contraseña *</label>
                            <a href="#" id="linkForgotPassword" class="auth-link-small">¿Olvidaste tu contraseña?</a>
                        </div>
                        <input type="password" id="loginPassword" required placeholder="Tu contraseña" autocomplete="current-password">
                    </div>
                    <button type="submit" class="auth-btn-primary" id="btnLoginSubmit">
                        <span>Ingresar a mi cuenta</span>
                    </button>
                    <div class="auth-switch-link">
                        ¿Aún no tienes una cuenta? <a href="#" data-switch-tab="register">Regístrate aquí</a>
                    </div>
                </form>

                <!-- FORMULARIO 2: REGISTRO DE USUARIO -->
                <form id="formAuthRegister" class="auth-form">
                    <div class="auth-field">
                        <label for="regNombre">Nombre y Apellido *</label>
                        <input type="text" id="regNombre" required placeholder="Ej. Juan Pérez" autocomplete="name">
                    </div>
                    <div class="auth-field">
                        <label for="regTelefono">Teléfono / WhatsApp *</label>
                        <input type="tel" id="regTelefono" required placeholder="Ej. 0414-1234567" autocomplete="tel">
                    </div>

                    <div class="auth-vehicle-box">
                        <div class="auth-vehicle-header">
                            <strong>🚗 Datos de tu Vehículo Ford</strong>
                            <small>(Permite confirmar compatibilidad de repuestos)</small>
                        </div>
                        <div class="auth-grid-2">
                            <div class="auth-field">
                                <label for="regModelo">Modelo Ford *</label>
                                <input type="text" id="regModelo" list="fordModelosList" required placeholder="Ej. Explorer, F-150, Fiesta...">
                                <datalist id="fordModelosList">
                                    <option value="Explorer">
                                    <option value="F-150">
                                    <option value="Super Duty">
                                    <option value="Fiesta">
                                    <option value="Focus">
                                    <option value="Fusion">
                                    <option value="Escape">
                                    <option value="Ecosport">
                                    <option value="Mustang">
                                    <option value="Ranger">
                                    <option value="Fortaleza">
                                    <option value="Triton">
                                </datalist>
                            </div>
                            <div class="auth-field">
                                <label for="regAnio">Año</label>
                                <input type="number" id="regAnio" min="1990" max="2027" placeholder="Ej. 2015">
                            </div>
                        </div>
                        <div class="auth-field">
                            <label for="regMotor">Cilindrada / Motor</label>
                            <input type="text" id="regMotor" placeholder="Ej. 3.5, 4.6 2V, 5.0 Coyote, 1.6 Sigma...">
                        </div>
                    </div>

                    <div class="auth-field">
                        <label for="regEmail">Correo electrónico *</label>
                        <input type="email" id="regEmail" required placeholder="tu-correo@ejemplo.com" autocomplete="email">
                    </div>
                    <div class="auth-field">
                        <label for="regPassword">Crear contraseña *</label>
                        <input type="password" id="regPassword" required minlength="6" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
                    </div>

                    <button type="submit" class="auth-btn-primary" id="btnRegisterSubmit">
                        <span>Completar Registro</span>
                    </button>
                    <div class="auth-switch-link">
                        ¿Ya tienes cuenta? <a href="#" data-switch-tab="login">Inicia sesión</a>
                    </div>
                </form>

                <!-- VISTA 3: MI PERFIL (USUARIO LOGUEADO) -->
                <div id="viewAuthProfile" class="auth-form">
                    <div class="auth-profile-summary">
                        <div class="auth-profile-avatar">👤</div>
                        <div class="auth-profile-info">
                            <h4 id="profileNombre">Usuario</h4>
                            <p id="profileEmail">correo@ejemplo.com</p>
                        </div>
                    </div>

                    <form id="formUpdateProfile">
                        <div class="auth-field">
                            <label for="editTelefono">Teléfono / WhatsApp</label>
                            <input type="tel" id="editTelefono" placeholder="0414-1234567">
                        </div>

                        <div class="auth-vehicle-box">
                            <div class="auth-vehicle-header">
                                <strong>🚗 Tu Vehículo Ford Registrado</strong>
                            </div>
                            <div class="auth-grid-2">
                                <div class="auth-field">
                                    <label for="editModelo">Modelo Ford</label>
                                    <input type="text" id="editModelo" list="fordModelosList">
                                </div>
                                <div class="auth-field">
                                    <label for="editAnio">Año</label>
                                    <input type="number" id="editAnio" min="1990" max="2027">
                                </div>
                            </div>
                            <div class="auth-field">
                                <label for="editMotor">Motor</label>
                                <input type="text" id="editMotor">
                            </div>
                        </div>

                        <div class="auth-profile-actions">
                            <button type="submit" class="auth-btn-secondary" id="btnUpdateProfile">
                                Guardar cambios
                            </button>
                            <button type="button" class="auth-btn-logout" id="btnLogout">
                                Cerrar sesión
                            </button>
                        </div>
                    </form>
                </div>

                <div class="auth-cloud-badge" id="authCloudBadge">
                    <span class="cloud-icon">☁️</span>
                    <span id="authCloudStatusText">Base de datos en la nube (Firebase)</span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        enlazarEventosModal(modal);
    }

    /* =========================================================
       CONTROL DE VISTAS Y TABS
       ========================================================= */
    function cambiarTab(tab) {
        const modal = document.getElementById("authModal");
        if (!modal) return;

        const tabsNav = document.getElementById("authTabs");
        const formLogin = document.getElementById("formAuthLogin");
        const formRegister = document.getElementById("formAuthRegister");
        const viewProfile = document.getElementById("viewAuthProfile");
        const title = document.getElementById("authTitle");
        const subtitle = document.getElementById("authSubtitle");
        limpiarAlerta();

        if (window.usuarioPartsolutions) {
            // Si está logueado, mostrar siempre perfil
            if (tabsNav) tabsNav.style.display = "none";
            formLogin.classList.remove("active");
            formRegister.classList.remove("active");
            viewProfile.classList.add("active");
            title.textContent = "Mi Cuenta PartSolutions";
            subtitle.textContent = "Consulta tus datos de contacto y vehículo Ford vinculado.";
            cargarDatosEnPerfil();
            return;
        }

        // Si no está logueado, permitir Login o Register
        if (tabsNav) tabsNav.style.display = "flex";
        viewProfile.classList.remove("active");

        modal.querySelectorAll(".auth-tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.authTab === tab);
        });

        if (tab === "register") {
            formLogin.classList.remove("active");
            formRegister.classList.add("active");
            title.textContent = "Crear Cuenta de Cliente";
            subtitle.textContent = "Registra tus datos y tu vehículo Ford para comprar más rápido.";
        } else {
            formRegister.classList.remove("active");
            formLogin.classList.add("active");
            title.textContent = "Iniciar Sesión";
            subtitle.textContent = "Ingresa con tu correo y contraseña para ver tus datos.";
        }
    }

    function cargarDatosEnPerfil() {
        const u = window.usuarioPartsolutions;
        if (!u) return;
        document.getElementById("profileNombre").textContent = u.nombre || "Cliente PartSolutions";
        document.getElementById("profileEmail").textContent = u.email || "";
        document.getElementById("editTelefono").value = u.telefono || "";
        document.getElementById("editModelo").value = u.vehiculoModelo || "";
        document.getElementById("editAnio").value = u.vehiculoAnio || "";
        document.getElementById("editMotor").value = u.vehiculoMotor || "";
    }

    function mostrarAlerta(mensaje, tipo = "error") {
        const alert = document.getElementById("authAlert");
        if (!alert) return;
        alert.className = `auth-alert ${tipo}`;
        alert.textContent = mensaje;
        alert.style.display = "block";
    }

    function limpiarAlerta() {
        const alert = document.getElementById("authAlert");
        if (alert) {
            alert.style.display = "none";
            alert.textContent = "";
        }
    }

    /* =========================================================
       EVENTOS Y ACCIONES DE LOGIN / REGISTRO / PERFIL
       ========================================================= */
    function enlazarEventosModal(modal) {
        // Cerrar modal
        modal.querySelectorAll("[data-auth-close]").forEach(el => {
            el.addEventListener("click", () => cerrarModalAuth());
        });

        // Cambio de pestañas
        modal.querySelectorAll("[data-auth-tab]").forEach(btn => {
            btn.addEventListener("click", () => cambiarTab(btn.dataset.authTab));
        });

        // Enlaces de cambio rápido dentro del formulario
        modal.querySelectorAll("[data-switch-tab]").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                cambiarTab(link.dataset.switchTab);
            });
        });

        // 1. Iniciar Sesión
        const formLogin = document.getElementById("formAuthLogin");
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            limpiarAlerta();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const btnSubmit = document.getElementById("btnLoginSubmit");

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = "<span>Verificando...</span>";

            try {
                if (firebaseActivo && auth) {
                    await auth.signInWithEmailAndPassword(email, password);
                } else {
                    // Simulación local
                    const usuariosLocales = JSON.parse(localStorage.getItem("partsolutions_usuarios_registrados") || "[]");
                    const userMatch = usuariosLocales.find(u => u.email.toLowerCase() === email.toLowerCase());
                    if (!userMatch) {
                        throw new Error("No existe una cuenta registrada con este correo electrónico.");
                    }
                    if (userMatch.password && userMatch.password !== password) {
                        throw new Error("Contraseña incorrecta. Inténtalo de nuevo.");
                    }
                    guardarSesionLocal(userMatch);
                }

                mostrarAlerta("¡Sesión iniciada con éxito!", "success");
                setTimeout(() => {
                    cerrarModalAuth();
                }, 700);
            } catch (err) {
                console.error("Error al iniciar sesión:", err);
                mostrarAlerta(traducirErrorFirebase(err.message));
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "<span>Ingresar a mi cuenta</span>";
            }
        });

        // 2. Registro de Usuario
        const formRegister = document.getElementById("formAuthRegister");
        formRegister.addEventListener("submit", async (e) => {
            e.preventDefault();
            limpiarAlerta();

            const nombre = document.getElementById("regNombre").value.trim();
            const telefono = document.getElementById("regTelefono").value.trim();
            const modelo = document.getElementById("regModelo").value.trim();
            const anio = document.getElementById("regAnio").value.trim();
            const motor = document.getElementById("regMotor").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value;
            const btnSubmit = document.getElementById("btnRegisterSubmit");

            if (!nombre || !telefono || !email || !password) {
                mostrarAlerta("Por favor, completa todos los campos obligatorios.");
                return;
            }

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = "<span>Guardando registro...</span>";

            try {
                if (firebaseActivo && auth && db) {
                    // Registro en Firebase Auth
                    const cred = await auth.createUserWithEmailAndPassword(email, password);
                    const uid = cred.user.uid;

                    // Actualizar DisplayName en Auth
                    await cred.user.updateProfile({ displayName: nombre });

                    // Guardar perfil detallado en Cloud Firestore
                    const datosPerfil = {
                        uid,
                        nombre,
                        telefono,
                        vehiculoModelo: modelo,
                        vehiculoAnio: anio,
                        vehiculoMotor: motor,
                        email,
                        fechaRegistro: firebase.firestore.FieldValue.serverTimestamp()
                    };

                    await db.collection("usuarios").doc(uid).set(datosPerfil);
                    window.usuarioPartsolutions = datosPerfil;
                } else {
                    // Registro en almacenamiento local de respaldo
                    const usuariosLocales = JSON.parse(localStorage.getItem("partsolutions_usuarios_registrados") || "[]");
                    if (usuariosLocales.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                        throw new Error("El correo electrónico ya se encuentra registrado.");
                    }

                    const nuevoUsuario = {
                        uid: "local-" + Date.now(),
                        nombre,
                        telefono,
                        vehiculoModelo: modelo,
                        vehiculoAnio: anio,
                        vehiculoMotor: motor,
                        email,
                        password,
                        fechaRegistro: new Date().toISOString()
                    };

                    guardarSesionLocal(nuevoUsuario);
                }

                mostrarAlerta("¡Cuenta creada exitosamente! Bienvenido a PartSolutions.", "success");
                setTimeout(() => {
                    cerrarModalAuth();
                }, 1000);
            } catch (err) {
                console.error("Error al registrar usuario:", err);
                mostrarAlerta(traducirErrorFirebase(err.message));
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "<span>Completar Registro</span>";
            }
        });

        // 3. Olvidé contraseña
        document.getElementById("linkForgotPassword")?.addEventListener("click", async (e) => {
            e.preventDefault();
            limpiarAlerta();
            const email = document.getElementById("loginEmail").value.trim();
            if (!email) {
                mostrarAlerta("Escribe tu correo en el campo superior para enviarte el enlace de recuperación.");
                document.getElementById("loginEmail").focus();
                return;
            }

            try {
                if (firebaseActivo && auth) {
                    await auth.sendPasswordResetEmail(email);
                    mostrarAlerta(`Te enviamos un enlace de recuperación a ${email}. Revisa tu bandeja de entrada o spam.`, "success");
                } else {
                    mostrarAlerta("En modo local no se envían correos automáticos. Para recuperación real conecta Firebase.", "info");
                }
            } catch (err) {
                mostrarAlerta(traducirErrorFirebase(err.message));
            }
        });

        // 4. Actualizar Perfil
        document.getElementById("formUpdateProfile")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            limpiarAlerta();
            const u = window.usuarioPartsolutions;
            if (!u) return;

            const telefono = document.getElementById("editTelefono").value.trim();
            const modelo = document.getElementById("editModelo").value.trim();
            const anio = document.getElementById("editAnio").value.trim();
            const motor = document.getElementById("editMotor").value.trim();
            const btn = document.getElementById("btnUpdateProfile");

            btn.disabled = true;
            btn.textContent = "Guardando...";

            try {
                u.telefono = telefono;
                u.vehiculoModelo = modelo;
                u.vehiculoAnio = anio;
                u.vehiculoMotor = motor;

                if (firebaseActivo && db && u.uid) {
                    await db.collection("usuarios").doc(u.uid).update({
                        telefono,
                        vehiculoModelo: modelo,
                        vehiculoAnio: anio,
                        vehiculoMotor: motor
                    });
                } else {
                    guardarSesionLocal(u);
                }

                mostrarAlerta("Perfil actualizado correctamente.", "success");
                actualizarUIUsuario();
                dispararEventoAuth();
            } catch (err) {
                mostrarAlerta("No se pudo actualizar el perfil: " + err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = "Guardar cambios";
            }
        });

        // 5. Cerrar Sesión
        document.getElementById("btnLogout")?.addEventListener("click", async () => {
            try {
                if (firebaseActivo && auth) {
                    await auth.signOut();
                } else {
                    guardarSesionLocal(null);
                }
                mostrarAlerta("Has cerrado tu sesión.", "info");
                setTimeout(() => {
                    cerrarModalAuth();
                }, 500);
            } catch (err) {
                console.error("Error al cerrar sesión:", err);
            }
        });

        // Tecla ESC para cerrar modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                cerrarModalAuth();
            }
        });
    }

    function traducirErrorFirebase(msg) {
        if (!msg) return "Ocurrió un error inesperado.";
        if (msg.includes("auth/email-already-in-use")) return "Este correo electrónico ya está registrado.";
        if (msg.includes("auth/invalid-email")) return "El correo electrónico no tiene un formato válido.";
        if (msg.includes("auth/weak-password")) return "La contraseña debe tener al menos 6 caracteres.";
        if (msg.includes("auth/user-not-found") || msg.includes("auth/wrong-password") || msg.includes("auth/invalid-credential")) {
            return "Correo o contraseña incorrectos.";
        }
        if (msg.includes("auth/network-request-failed")) return "Error de conexión. Revisa tu acceso a internet.";
        return msg;
    }

    /* =========================================================
       CONTROL DEL BOTÓN EN EL HEADER Y APERTURA DE MODAL
       ========================================================= */
    function actualizarUIUsuario() {
        const u = window.usuarioPartsolutions;
        const triggerBtn = document.getElementById("authTriggerBtn");
        const triggerText = document.getElementById("authTriggerText");
        const cloudBadgeText = document.getElementById("authCloudStatusText");

        if (triggerText) {
            if (u && u.nombre) {
                const primerNombre = u.nombre.split(" ")[0];
                triggerText.textContent = `Hola, ${primerNombre}`;
            } else {
                triggerText.textContent = "Mi Cuenta";
            }
        }

        if (triggerBtn) {
            triggerBtn.classList.toggle("logged-in", Boolean(u));
            triggerBtn.setAttribute("title", u ? `Conectado como ${u.nombre}` : "Iniciar sesión o registrarse");
        }

        if (cloudBadgeText) {
            if (firebaseActivo) {
                cloudBadgeText.textContent = "Conectado a Firebase Cloud (Firestore)";
            } else {
                cloudBadgeText.textContent = "Modo Local Activo (Para guardar en la nube configura firebase-config.js)";
            }
        }
    }

    function abrirModalAuth(tab = "login") {
        inyectarModalAuth();
        const modal = document.getElementById("authModal");
        if (!modal) return;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        cambiarTab(window.usuarioPartsolutions ? "profile" : tab);
    }

    function cerrarModalAuth() {
        const modal = document.getElementById("authModal");
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        limpiarAlerta();
    }

    // Exportación en window para que index.html y script.js puedan interactuar
    window.obtenerUsuarioActual = () => window.usuarioPartsolutions;
    window.abrirModalAuth = abrirModalAuth;
    window.cerrarModalAuth = cerrarModalAuth;

    // Inicialización al cargar la página
    document.addEventListener("DOMContentLoaded", () => {
        inyectarModalAuth();
        inicializarFirebase();

        // Enlazar el botón del header
        const btnHeader = document.getElementById("authTriggerBtn");
        if (btnHeader) {
            btnHeader.addEventListener("click", () => {
                abrirModalAuth(window.usuarioPartsolutions ? "profile" : "login");
            });
        }
    });
})();
