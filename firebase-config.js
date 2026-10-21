/* =========================================================
   PARTSOLUTIONS - CONFIGURACIÓN DE FIREBASE (AUTH & FIRESTORE)
   =========================================================
   Para conectar tu base de datos en la nube gratuita:
   1. Ingresa a: https://console.firebase.google.com/
   2. Crea un proyecto (por ejemplo: "partsolutions-catalogo").
   3. Ve a "Compilación" (Build):
      - "Authentication" -> Empezar -> Activa "Correo electrónico/Contraseña".
      - "Firestore Database" -> Crear base de datos -> Iniciar en modo de prueba.
   4. En Configuración del proyecto (⚙️) -> "Tus apps" -> Selecciona Web (</>):
      Copia tus credenciales y pégalas reemplazando los valores de abajo.
   ========================================================= */

const firebaseConfig = {
    apiKey: "PEGAR_AQUI_API_KEY",
    authDomain: "PEGAR_AQUI_AUTH_DOMAIN",
    projectId: "PEGAR_AQUI_PROJECT_ID",
    storageBucket: "PEGAR_AQUI_STORAGE_BUCKET",
    messagingSenderId: "PEGAR_AQUI_MESSAGING_SENDER_ID",
    appId: "PEGAR_AQUI_APP_ID"
};
