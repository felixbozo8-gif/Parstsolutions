/* =========================================
   PARTSOLUTIONS
   SCRIPT PRINCIPAL
   Catálogo + buscador de repuestos
========================================= */

"use strict";

/* =========================================
   VEHÍCULOS FORD
   Solo se incluyen compatibilidades que ya
   estaban definidas en el proyecto.
========================================= */

const vehiculosFord = {};


/* =========================================
   CATEGORÍAS
========================================= */

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


/* =========================================
   BASE DE PRODUCTOS
   Los productos reales cargados hasta ahora
   están en MOTOR, como solicitaste.
========================================= */

let productos = {
    motor: [
        {
            id: "PS-MOT-001",
            nombre: "ACOPLADOR FORD SUPER DUTY F350 F250 4X4",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BC3Z-3B396-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-001",
            precio: 169.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ACOPLADOR-DUTY",
            imagen: "images/motor/ACTUADOR-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-002",
            nombre: "ACTUADOR FORD F-150 EXPEDITION 4X4",
            marca: "FORD",
            modelo: ["F-150", "EXPEDITION"],
            motor: ["5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7L1Z-3C247-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-002",
            precio: 154.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ACTUADOR-F-150-EXPEDITION",
            imagen: "images/motor/ACTUADOR-F-150-EXPEDITION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-003",
            nombre: "ACTUADOR FORD FIESTA ECOSPORT TITANIUM",
            marca: "FORD",
            modelo: ["ECOSPORT-TITANIUM"],
            motor: ["2.0", "1.6"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["AE8Z-7C604-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-003",
            precio: 158.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ACTUADOR-ECOSPORT-TITANIUM",
            imagen: "images/motor/ACTUADOR-ECOSPORT-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-004",
            nombre: "ANILLO DE MOTOR FORD F-150 5.0 COYOTE 2013 / 2017 (1RA / 2DA GEN)",
            marca: "FORD",
            modelo: ["F-150-5.0"],
            motor: ["5.0"],
            anios: [2013, 2014, 2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["CU7Z-6148-E"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-004",
            precio: 23.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ANILLO-5.0",
            imagen: "images/motor/ANILLO-5.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-005",
            nombre: "ANILLOS DE MOTOR FORD SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AU7Z-6148-G"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-005",
            precio: 16.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ANILLO-6.2",
            imagen: "images/motor/ANILLO-6.2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-006",
            nombre: "ANILLOS DE MOTOR FORD 4.6 5.4 STD",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["6L3Z-6148-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-006",
            precio: 24.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ANILLO-4.6-5.4",
            imagen: "images/motor/ANILLO-4.6-5.4.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-007",
            nombre: "ANILLOS DE MOTOR FORD EXPLORER 3.5 STD",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6148-C"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-007",
            precio: 17.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ANILLO-3.5",
            imagen: "images/motor/ANILLO-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-008",
            nombre: "ANILLOS DE MOTOR FORD FIESTA TITANIUM STD",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: ["1.6"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["BE8Z-6148-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-008",
            precio: 43.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ANILLO-FIESTA-TITANIUM",
            imagen: "images/motor/ANILLO-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-009",
            nombre: "ARBOL DE LEVA ADMISION LH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6250-G"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-009",
            precio: 99.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-ADMISION-LH",
            imagen: "images/motor/ARBOL-ADMISION-LH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-010",
            nombre: "ARBOL DE LEVA ADMISION RH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6250-F"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-010",
            precio: 102.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-ADMISION-RH",
            imagen: "images/motor/ARBOL-ADMISION-RH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-011",
            nombre: "ARBOL DE LEVA ESCAPE LH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6250-J"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-011",
            precio: 104.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-ESCAPE-LH",
            imagen: "images/motor/ARBOL-ESCAPE-LH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-012",
            nombre: "ARBOL DE LEVA ESCAPE RH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6250-H"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-012",
            precio: 102.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-ESCAPE-RH",
            imagen: "images/motor/ARBOL-ESCAPE-RH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-013",
            nombre: "ARBOL DE LEVA LH FORD EXPLORER FX4 EXPEDITION 4.6 / 5.4 3V",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["5L1Z-6250-E"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-013",
            precio: 162.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-LH-4.6",
            imagen: "images/motor/ARBOL-LH-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-014",
            nombre: "ARBOL DE LEVA RH FORD EXPLORER FX4 EXPEDITION 4.6 / 5.4 3V",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["5L1Z-6250-BB"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-014",
            precio: 157.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ARBOL-RH-4.6",
            imagen: "images/motor/ARBOL-RH-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-015",
            nombre: "ASPA FAN CLUTCH FORD 4.6 5.4 2V F-150",
            marca: "FORD",
            modelo: ["EXPLORER-FX4-2V"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["F85Z-8600-AA"],
            codigoMotorcraft: ["YA-226"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-015",
            precio: 68.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ASPA-4.6-5.4-2V",
            imagen: "images/motor/ASPA-4.6-5.4-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-016",
            nombre: "ASPA FAN CLUTCH FORD 4.6 5.4 2V F-150 TRITON",
            marca: "FORD",
            modelo: ["EXPLORER-FX4-2V"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7C3Z-8600-B"],
            codigoMotorcraft: ["YA-258"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-016",
            precio: 67.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ASPA-TRITON",
            imagen: "images/motor/ASPA-TRITON.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-017",
            nombre: "ASPA FAN CLUTCH FORD EXPLORER 2006-2010, FX4",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["6L2Z-8600-BA"],
            codigoMotorcraft: ["YA-250"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-017",
            precio: 70.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ASPA-4.6-5.4-3V",
            imagen: "images/motor/ASPA-4.6-5.4-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-018",
            nombre: "ASPA FAN CLUTCH FORD SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BC3Z-6600-A"],
            codigoMotorcraft: ["YA-264"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-018",
            precio: 94.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ASPA-6.2",
            imagen: "images/motor/ASPA-6.2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-019",
            nombre: "BALANCIN FORD EXPLORER 2002-2005 2V TRITON EXPLORER 4.6 5.4",
            marca: "FORD",
            modelo: ["EXPLORER-FX4-2V"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005],
            categoria: "motor",
            numeroParteFord: ["F8AZ-6564-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-019",
            precio: 13.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BALANCIN-2V",
            imagen: "images/motor/BALANCIN-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-020",
            nombre: "BALANCIN FORD EXPLORER 2006-2011 3V TRITON",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-6564-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-020",
            precio: 12.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BALANCIN-3V",
            imagen: "images/motor/BALANCIN-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-021",
            nombre: "BASE DE AMORTIGUADOR FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "suspension",
            numeroParteFord: ["FB5Z-18183-A"],
            codigoMotorcraft: ["AD-1147"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-021",
            precio: 111.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BASE-REDONDA-3.5",
            imagen: "images/motor/BASE-REDONDA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-022",
            nombre: "BASE DE AMORTIGUADOR FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: ["1.6"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "suspension",
            numeroParteFord: ["C1BZ-3A197-AB"],
            codigoMotorcraft: ["AD-1140"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-022",
            precio: 50.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BASE-FIESTA-TITANIUM",
            imagen: "images/motor/BASE-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-023",
            nombre: "BASE DE AMORTIGUADOR FORD MUSTANG 2006-2008 4.6",
            marca: "FORD",
            modelo: ["MUSTANG-4.6"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "suspension",
            numeroParteFord: ["5R3Z-18183-A"],
            codigoMotorcraft: ["AD-1044"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-023",
            precio: 83.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BASE-MUSTANG",
            imagen: "images/motor/BASE-MUSTANG.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-024",
            nombre: "BASE FILTRO ACEITE MOTOR FORD (SIN ENFRIADOR) EXPLORER 3.5 2016-2019",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2016, 2017, 2018, 2019],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6881-GA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-024",
            precio: 65.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BASE-ACEITE-3.5",
            imagen: "images/motor/BASE-ACEITE-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-025",
            nombre: "BIELA FORD EXPLORER 3.5 2012-2016",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BL3Z-6200-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-025",
            precio: 233.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BIELA-3.5",
            imagen: "images/motor/BIELA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-026",
            nombre: "BIELA MOTOR F350 F250 SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6200-C"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-026",
            precio: 37.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BIELA-6.2",
            imagen: "images/motor/BIELA-6.2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-027",
            nombre: "BOBINA FIESTA TITANIUM MOVE",
            marca: "FORD",
            modelo: ["FIESTA-MOVE"],
            motor: ["1.6"],
            anios: [2009, 2010, 2011, 2012, 2013],
            categoria: "motor",
            numeroParteFord: ["CM5Z-12029-F"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-027",
            precio: 57.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-FIESTA-MOVE",
            imagen: "images/motor/BOBINA-FIESTA-MOVE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-028",
            nombre: "BOBINA FORD ECOSPORT FOCUS MAZDA 3 DURATEC",
            marca: "FORD",
            modelo: ["ECOSPORT-FOCUS-MAZDA"],
            motor: ["2.0"],
            anios: [2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["4M5Z-12029-B"],
            codigoMotorcraft: ["DG-541"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-028",
            precio: 29.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-ECOSPORT-MAZDA",
            imagen: "images/motor/BOBINA-ECOSPORT-MAZDA.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-029",
            nombre: "BOBINA FORD ESCAPE 3.0",
            marca: "FORD",
            modelo: ["ESCAPE"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["2M2Z-12029-AC"],
            codigoMotorcraft: ["DG-513"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-029",
            precio: 30.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-ESCAPE",
            imagen: "images/motor/BOBINA-ESCAPE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-030",
            nombre: "BOBINA FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016],
            categoria: "motor",
            numeroParteFord: ["7T4Z-12029-E"],
            codigoMotorcraft: ["DG-520"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-030",
            precio: 34.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-3.5",
            imagen: "images/motor/BOBINA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-031",
            nombre: "BOBINA FORD EXPLORER 4.6 3V",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6"],
            anios: [2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["8L3Z-12029-A"],
            codigoMotorcraft: ["DG-521"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-031",
            precio: 31.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-4.6-521",
            imagen: "images/motor/BOBINA-4.6-521.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-032",
            nombre: "BOBINA FORD EXPLORER 4.6 FX4 EXPEDITION 5.4 3V",
            marca: "FORD",
            modelo: ["EXPLORER-FX4"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008],
            categoria: "motor",
            numeroParteFord: ["3L3Z-12029-BA"],
            codigoMotorcraft: ["DG-511"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-032",
            precio: 32.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-4.6-511",
            imagen: "images/motor/BOBINA-4.6-511.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-033",
            nombre: "BOBINA FORD F-150 5.0",
            marca: "FORD",
            modelo: ["F-150"],
            motor: ["5.0"],
            anios: [2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BR3Z-12029-A"],
            codigoMotorcraft: ["DG-542"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-033",
            precio: 37.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-5.0",
            imagen: "images/motor/BOBINA-5.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-034",
            nombre: "BOBINA FORD F-150 BRONCO EXPLORER 2018.2022",
            marca: "FORD",
            modelo: ["EXPLORER-BRONCO"],
            motor: ["3.0", "2.7"],
            anios: [2018, 2019, 2020, 2021, 2022],
            categoria: "motor",
            numeroParteFord: ["PB5Z-12029-BA"],
            codigoMotorcraft: ["DG-588"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-034",
            precio: 41.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-2.7-3.0",
            imagen: "images/motor/BOBINA-2.7-3.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-035",
            nombre: "BOBINA FORD F150 EXPEDITION 3.5 TURBO 2017-2021",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2017, 2018, 2019, 2020, 2021],
            categoria: "motor",
            numeroParteFord: ["HL3Z-12029-D"],
            codigoMotorcraft: ["DG-585"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-035",
            precio: 36.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-3.5-TURBO",
            imagen: "images/motor/BOBINA-3.5-TURBO.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-036",
            nombre: "BOBINA FORD FIESTA ECOSPORT",
            marca: "FORD",
            modelo: ["FIESTA-ECOSPORT"],
            motor: ["1.6", "2.0"],
            anios: [2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["988Z-12029-A"],
            codigoMotorcraft: ["DG-536"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-036",
            precio: 60.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-FIESTA-ECOSPORT",
            imagen: "images/motor/BOBINA-FIESTA-ECOSPORT.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-037",
            nombre: "BOBINA FORD FUSION 3.0",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["6E5Z-12029-BA"],
            codigoMotorcraft: ["DG-514"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-037",
            precio: 35.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-FUSION",
            imagen: "images/motor/BOBINA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-038",
            nombre: "BOBINA FORD SUPER DUTY 6.2 LH 2011-2017",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["AL3Z-12029-B"],
            codigoMotorcraft: ["DG-526"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-038",
            precio: 42.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-DUTY-LH",
            imagen: "images/motor/BOBINA-DUTY-LH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-039",
            nombre: "BOBINA FORD SUPER DUTY 6.2 RH 2011-2017",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["AL3Z-12029-A"],
            codigoMotorcraft: ["DG-525"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-039",
            precio: 42.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-DUTY-RH",
            imagen: "images/motor/BOBINA-DUTY-RH.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-040",
            nombre: "BOBINA FORD TRITON F350 F150 5.4 EXPLORER 4.6 2V",
            marca: "FORD",
            modelo: ["TRITON-EXPLORER-2V"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["3W7Z-12029-AA"],
            codigoMotorcraft: ["DG-508"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-040",
            precio: 26.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOBINA-4.6-2V",
            imagen: "images/motor/BOBINA-4.6-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-041",
            nombre: "BOMBA DE ACEITE FORD EXPLORER 3.5 2012-2016",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016],
            categoria: "motor",
            numeroParteFord: ["GL3Z-6C639-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-041",
            precio: 111.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA ACEITE-3.5",
            imagen: "images/motor/BOMBA ACEITE-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-042",
            nombre: "BOMBA DE ACEITE FORD EXPLORER 4.6 5.4 2V",
            marca: "FORD",
            modelo: ["EXPLORER-4.6-5.4-2V"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["5L3Z-6600-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-042",
            precio: 198.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA ACEITE-4.6-2V",
            imagen: "images/motor/BOMBA ACEITE-4.6-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-043",
            nombre: "BOMBA DE ACEITE FORD EXPLORER FX4 EXPEDITION 4.6 5.4 3V",
            marca: "FORD",
            modelo: ["EXPLORER-FX4-3V"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["9L3Z-6600-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-043",
            precio: 187.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA ACEITE-4.6-3V",
            imagen: "images/motor/BOMBA ACEITE-4.6-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-044",
            nombre: "BOMBA DE ACEITE FORD EXPLORER RANGER SPORTTRACK 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-RANGER-4.0"],
            motor: ["4.0"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["XL2Z-6600-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-044",
            precio: 93.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-4.0",
            imagen: "images/motor/BOMBA-ACEITE-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-045",
            nombre: "BOMBA DE ACEITE FORD EXPLORER RANGER SPORTTRACK 4.0 CON FILTRO",
            marca: "FORD",
            modelo: ["EXPLORER-RANGER-4.0"],
            motor: ["4.0"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["4L2Z-6600-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-045",
            precio: 93.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-4.0-FILTRO",
            imagen: "images/motor/BOMBA-ACEITE-4.0-FILTRO.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-046",
            nombre: "BOMBA DE ACEITE FORD F-150 5.0 2011-2014",
            marca: "FORD",
            modelo: ["F-150-5.0"],
            motor: ["5.0"],
            anios: [2011, 2012, 2013, 2014],
            categoria: "motor",
            numeroParteFord: ["BL3Z-6600-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-046",
            precio: 190.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-5.0",
            imagen: "images/motor/BOMBA-ACEITE-5.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-047",
            nombre: "BOMBA DE ACEITE FORD F-150 5.0 2015 / 2017",
            marca: "FORD",
            modelo: ["F-150-5.0"],
            motor: ["5.0"],
            anios: [2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["BR3Z-6600-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-047",
            precio: 188.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-5.0-2GDA",
            imagen: "images/motor/BOMBA-ACEITE-5.0-2GDA.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-048",
            nombre: "BOMBA DE ACEITE FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: ["1.6"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["CN1Z-6600-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-048",
            precio: 195.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-FIESTA-TITANIUM",
            imagen: "images/motor/BOMBA-ACEITE-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-049",
            nombre: "BOMBA DE ACEITE FORD FOCUS ECOSPORT 2.0 RANGER 2.3 MAZDA 3 DURATEC",
            marca: "FORD",
            modelo: ["FOCUS-RANGER-ECOSPORT"],
            motor: ["2.0", "2.3"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["DS7Z-6600-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-049",
            precio: 75.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-FOCUS-ECOSPORT",
            imagen: "images/motor/BOMBA-ACEITE-FOCUS-ECOSPORT.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-050",
            nombre: "BOMBA DE ACEITE FORD SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6600-AB"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-050",
            precio: 124.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-ACEITE-6.2",
            imagen: "images/motor/BOMBA-ACEITE-6.2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-051",
            nombre: "BOMBA DE AGUA EXTERNA FORD 3.7",
            marca: "FORD",
            modelo: ["EXPLORER-F-150"],
            motor: ["3.7"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            categoria: "motor",
            numeroParteFord: ["BR3Z-8501-N"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-051",
            precio: 227.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-EXTERNA-3.7",
            imagen: "images/motor/BOMBA-AGUA-EXTERNA-3.7.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-052",
            nombre: "BOMBA DE AGUA FORD EXPLORER FX4 TRITON",
            marca: "FORD",
            modelo: ["EXPLORER-FX4-TRITON"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["5L3Z-8501-AC"],
            codigoMotorcraft: ["PW-700"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-052",
            precio: 85.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-4.6-5.4",
            imagen: "images/motor/BOMBA-AGUA-4.6-5.4.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-053",
            nombre: "OMBA DE AGUA FORD F-150 5.0 COYOTE 2011-2017 3 PERNOS",
            marca: "FORD",
            modelo: ["F-150-5.0"],
            motor: ["5.0"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["BR3Z-8501-S"],
            codigoMotorcraft: ["PW-639"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-053",
            precio: 134.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-F-150-2DA",
            imagen: "images/motor/BOMBA-AGUA-F-150-2DA.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-054",
            nombre: "BOMBA DE AGUA FORD F-150 5.0 MUSTANG (4 PERNOS) 2011-2014",
            marca: "FORD",
            modelo: ["F-150-5.0-MUSTANG"],
            motor: ["5.0"],
            anios: [2011, 2012, 2013, 2014],
            categoria: "motor",
            numeroParteFord: ["BR3Z-8501-H"],
            codigoMotorcraft: ["PW-535"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-054",
            precio: 159.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-5.0-MUSTAN",
            imagen: "images/motor/BOMBA-AGUA-5.0-MUSTAN.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-055",
            nombre: "BOMBA DE AGUA FORD F-150 EXPEDITION MUSTANG TRANSIT ",
            marca: "FORD",
            modelo: ["TRANSIT 3.5 3.7"],
            motor: ["3.5", "3.7"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
            categoria: "motor",
            numeroParteFord: ["ER3Z-8501-C"],
            codigoMotorcraft: ["PW-522"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-055",
            precio: 168.0,
            tipo: "ORIGINAL FORD",
            descripcion: "MUSTANG-TRANSIT-3.5-3.7",
            imagen: "images/motor/MUSTANG-TRANSIT-3.5-3.7.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-056",
            nombre: "BOMBA DE AGUA FORD FIESTA KA ECOSPORT",
            marca: "FORD",
            modelo: ["FIESTA-ECOSPORT"],
            motor: ["1.6"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["MB1A-8501-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-056",
            precio: 54.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-FIESTA-ECOSPORT",
            imagen: "images/motor/BOMBA-AGUA-FIESTA-ECOSPORT.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-057",
            nombre: "BOMBA DE AGUA FORD FOCUS RANGER ECOSPORT MAZDA 3 Y 6 MOTOR 2.0",
            marca: "FORD",
            modelo: ["FOCUS-RANGER-ECOSPORT"],
            motor: ["2.0", "2.3"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["4S4Z-8501-E"],
            codigoMotorcraft: ["PW-624"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-057",
            precio: 60.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-FOCUS-RANGER",
            imagen: "images/motor/BOMBA-AGUA-FOCUS-RANGER.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-058",
            nombre: "BOMBA DE AGUA FORD FUSION 2007-2009",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2007, 2008, 2009, 2010, 2011, 2012, 2013],
            categoria: "motor",
            numeroParteFord: ["EU2Z-8501-D"],
            codigoMotorcraft: ["PW-565"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-058",
            precio: 207.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-FUSION",
            imagen: "images/motor/BOMBA-AGUA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-059",
            nombre: "BOMBA DE AGUA FORD SUPER DUTY MOTOR 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-8501-D"],
            codigoMotorcraft: ["PW-628"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-059",
            precio: 134.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-AGUA-DUTY",
            imagen: "images/motor/BOMBA-AGUA-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-060",
            nombre: "BOMBA DE AGUA INTERNA FORD 3.7",
            marca: "FORD",
            modelo: ["3.7"],
            motor: ["3.7"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
            categoria: "motor",
            numeroParteFord: ["BR3Z-8501-D"],
            codigoMotorcraft: ["PW-532"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-060",
            precio: 119.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-INTERNA-3.7",
            imagen: "images/motor/BOMBA-INTERNA-3.7.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-061",
            nombre: "BOMBA DE GASOLINA FORD FUSION 3.0",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
            categoria: "motor",
            numeroParteFord: ["8E5Z-9H307-T"],
            codigoMotorcraft: ["PFS-451"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-061",
            precio: 282.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-GASOLINA-FUSION",
            imagen: "images/motor/BOMBA-GASOLINA-FUSION.png",
            disponibilidad: true
        },
        {
            id: "PS-MOT-062",
            nombre: "BOMBA DE GASOLINA FORD SUPER DUTY 6.2 F-250",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BC3Z-9H307-D"],
            codigoMotorcraft: ["PFS-600"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-062",
            precio: 351.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-GASOLINA-250",
            imagen: "images/motor/BOMBA-GASOLINA-250.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-063",
            nombre: "BOMBA DE GASOLINA FORD SUPER DUTY F350",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BC3Z-9H307-C"],
            codigoMotorcraft: ["PFS-557"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-063",
            precio: 300.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-GASOLINA-350",
            imagen: "images/motor/BOMBA-GASOLINA-350.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-064",
            nombre: "BOMBA DE WIPER FORD EXPLORER 3.5 SUPER DUTY",
            marca: "FORD",
            modelo: ["3.5", "SUPER-DUTY"],
            motor: ["3.5"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["JL1Z-17664-A"],
            codigoMotorcraft: ["WG-337"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-064",
            precio: 23.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-WIPER-3.5-DUTY",
            imagen: "images/motor/BOMBA-WIPER-3.5-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-065",
            nombre: "BOMBA DE WIPER FORD EXPLORER 4.6",
            marca: "FORD",
            modelo: ["4.6"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7L2Z-17664-A"],
            codigoMotorcraft: ["WG-312"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-065",
            precio: 25.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-WIPER-4.6",
            imagen: "images/motor/BOMBA-WIPER-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-066",
            nombre: "BOMBA MOTOR LIMPIA PARABRISA (1 SALIDA) FORD SUPER DUTY RANGER F-150 F-350 TRITON 2.3 4.0",
            marca: "FORD",
            modelo: ["6.2-2.3-4.0"],
            motor: ["2.3", "4.0", "6.2"],
            anios: [2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["8C3Z-17664-A"],
            codigoMotorcraft: ["WG-318"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-066",
            precio: 19.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-WIPER-RANGER-DUTY-TRITON",
            imagen: "images/motor/BOMBA-WIPER-RANGER-DUTY-TRITON.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-067",
            nombre: "BOMBA MOTOR LIMPIA PARABRISA FORD F-150 FUSION SUPER DUTY 2014-2026",
            marca: "FORD",
            modelo: ["5.0-3.0-6.2"],
            motor: ["5.4", "6.2"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
            categoria: "motor",
            numeroParteFord: ["JL3Z-17664-A"],
            codigoMotorcraft: ["WG-335"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-067",
            precio: 23.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BOMBA-WIPER-F-150-DUTY-FUSION",
            imagen: "images/motor/BOMBA-WIPER-F-150-DUTY-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-068",
            nombre: "BUJIA FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["CYFS-12Y-T6"],
            codigoMotorcraft: ["SP-589"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-068",
            precio: 7.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-EXPLORER-3.5",
            imagen: "images/motor/BUJIA-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-069",
            nombre: "BUJIA FORD EXPLORER 3.5 SUPER DUTY FIESTA",
            marca: "FORD",
            modelo: ["FIESTA-DUTY-3.5"],
            motor: ["3.5", "6.2"],
            anios: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["AYFS-22F-MX"],
            codigoMotorcraft: ["SP-411"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-069",
            precio: 6.5,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-FIESTA-DUTY-3.5",
            imagen: "images/motor/BUJIA-FIESTA-DUTY-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-070",
            nombre: "BUJIA FORD EXPLORER F-150 5.0 COYOTE",
            marca: "FORD",
            modelo: ["F-150-5.0"],
            motor: ["5.0"],
            anios: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["CYFS-12F-1X"],
            codigoMotorcraft: ["SP-548"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-070",
            precio: 7.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-COYOTE-5.0",
            imagen: "images/motor/BUJIA-COYOTE-5.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-071",
            nombre: "BUJIA FORD EXPLORER ST LIMITED 2020-2023",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.0"],
            anios: [2020, 2021, 2022, 2023],
            categoria: "motor",
            numeroParteFord: ["CYFS-12Y-RT3"],
            codigoMotorcraft: ["SP-594"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-071",
            precio: 9.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-EXPLORER-2020",
            imagen: "images/motor/BUJIA-EXPLORER-2020.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-072",
            nombre: "BUJIA FORD EXPLORER TRITON FUSION SP-493",
            marca: "FORD",
            modelo: ["FUSION-TRITON"],
            motor: ["5.0", "3.0"],
            anios: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["AGSF-32P-MX"],
            codigoMotorcraft: ["SP-493"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-072",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-FUSION-TRITON",
            imagen: "images/motor/BUJIA-FUSION-TRITON.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-073",
            nombre: "BUJIA FORD FUSION 3.0",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["AGSF-32W-MX"],
            codigoMotorcraft: ["SP-433"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-073",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-FUSION",
            imagen: "images/motor/BUJIA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-074",
            nombre: "BUJIA FORD FUSION 3.0 TRITON ECOSPORT",
            marca: "FORD",
            modelo: ["FUSION-TRITON-ECOSPORT"],
            motor: ["3.0", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["AGSF-22F-MX"],
            codigoMotorcraft: ["SP-500"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-074",
            precio: 8.0,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-FUSION-TRITON-ECOSPORT",
            imagen: "images/motor/BUJIA-FUSION-TRITON-ECOSPORT.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-075",
            nombre: "BUJIA FORD SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["CYFS-12-FPX"],
            codigoMotorcraft: ["SP-526"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-075",
            precio: 7.5,
            tipo: "ORIGINAL FORD",
            descripcion: "BUJIA-SUPER-DUTY",
            imagen: "images/motor/BUJIA-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-076",
            nombre: "CABLE BUJIA FORD EXPLORER SPORT TRACK RANGER 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-4.0-RANGER"],
            motor: ["4.6", "4.0"],
            anios: [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
            categoria: "motor",
            numeroParteFord: [],
            codigoMotorcraft: ["WR-6096"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-076",
            precio: 70.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-4.0",
            imagen: "images/motor/CABLE-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-077",
            nombre: "CABLE DE BUJIA FORD EXPLORER SP-509",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: ["4.6", "5.4"],
            anios: [2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["8L3Z-12A402-A"],
            codigoMotorcraft: ["SP-509"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-077",
            precio: 9.5,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-BOBINA-509",
            imagen: "images/motor/CABLE-BOBINA-509.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-078",
            nombre: "CABLE DE BUJIA FORD EXPLORER SP-515",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008],
            categoria: "motor",
            numeroParteFord: ["3L3Z-12A402-BA"],
            codigoMotorcraft: ["WR-6131"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-078",
            precio: 4.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-BUJIA-515",
            imagen: "images/motor/CABLE-BUJIA-515.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-079",
            nombre: "CABLE DE BUJIA FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: ["1.6"],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["BE8Z-12259-B"],
            codigoMotorcraft: ["WR-6126"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-079",
            precio: 45.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-FIESTA-TATANIUM",
            imagen: "images/motor/CABLE-FIESTA-TATANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-080",
            nombre: "CABLE DE BUJIA FORD RANGER 2.3",
            marca: "FORD",
            modelo: ["RANGER-2.3"],
            motor: ["2.3"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["1L5Z-12259-AA"],
            codigoMotorcraft: ["WR-6059"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-080",
            precio: 42.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-RANGER-2.3",
            imagen: "images/motor/CABLE-RANGER-2.3.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-081",
            nombre: "CABLE DE BUJIA FORD SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-12286-A"],
            codigoMotorcraft: ["WR-6121"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-081",
            precio: 13.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CABLE-DUTY",
            imagen: "images/motor/CABLE-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-082",
            nombre: "CAPSULA DE RETROCESO FORD FUSION",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["7E5Z-13480-A"],
            codigoMotorcraft: ["SW-6572"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-082",
            precio: 10.0,
            tipo: "ORIGINAL FORD",
            descripcion: "RETROCESO-FUSION",
            imagen: "images/motor/RETROCESO-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-083",
            nombre: "CARCASA DE TERMOSTATO FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-8A586-C"],
            codigoMotorcraft: ["RH-248"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-083",
            precio: 99.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CARCASA-3.5",
            imagen: "images/motor/CARCASA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-084",
            nombre: "CARCASA SUPERIOR DE TERMOSTATO FORD EXPLORER 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-4.0"],
            motor: ["4.0"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["2L2Z-8592-AA"],
            codigoMotorcraft: ["RH-147"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-084",
            precio: 7.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CARCASA-EXPLORER-4.0",
            imagen: "images/motor/CARCASA-EXPLORER-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-085",
            nombre: "CHUPON DE BOBINA FORD TRITON FORTALEZA EXPLORER 2V 4.6 Y 5.4",
            marca: "FORD",
            modelo: ["TRITON-FORTALEZA"],
            motor: ["4.6", "5.4"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
            categoria: "motor",
            numeroParteFord: ["F7TZ-12A402-AA"],
            codigoMotorcraft: ["WR-6128"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-085",
            precio: 4.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CHUPON-TRITON-FORTALEZA",
            imagen: "images/motor/CHUPON-TRITON-FORTALEZA.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-086",
            nombre: "CIGUEÑAL STD FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["HR3Z-6303-F"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-086",
            precio: 384.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CIGÜEÑAL-3.5",
            imagen: "images/motor/CIGÜEÑAL-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-087",
            nombre: "CIGUEÑAL STD FORD SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6303-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-087",
            precio: 473.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CIGÜEÑAL-6.2",
            imagen: "images/motor/CIGÜEÑAL-6.2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-088",
            nombre: "COLECTOR AIRE RADIADOR INFERIOR FORD EXPLORER 3.5 2012",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["FB5Z-7810494-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-088",
            precio: 118.0,
            tipo: "ORIGINAL FORD",
            descripcion: "COLECTOR-EXPLORER-3.5",
            imagen: "images/motor/COLECTOR-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-089",
            nombre: "CONCHA BANCADA STD FORD FUSION",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["XW7Z-6D309-HA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-089",
            precio: 34.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BANCADA-FUSION",
            imagen: "images/motor/CONCHA-BANCADA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-090",
            nombre: "CONCHA DE BANCADA AXIAL FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["8L3Z-6K302-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-090",
            precio: 7.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-AXIAL-EXPLORER-3.5",
            imagen: "images/motor/CONCHA-AXIAL-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-091",
            nombre: "CONCHA DE BANCADA AXIAL STD FORD SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6A341-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-091",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-AXIAL-SUPER-DUTY",
            imagen: "images/motor/CONCHA-AXIAL-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-092",
            nombre: "CONCHA DE BANCADA FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["8L3Z-6A341-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-092",
            precio: 9.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BANCADA-EXPLORER-3.5",
            imagen: "images/motor/CONCHA-BANCADA-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-093",
            nombre: "CONCHA DE BANCADA FORD EXPLORER 3.5 STD",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["7T4Z-6D309-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-093",
            precio: 10.5,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BANCADA-EXPLORER-3.5-4",
            imagen: "images/motor/CONCHA-BANCADA-EXPLORER-3.5-4.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-094",
            nombre: "CONCHA DE BANCADA FORD EXPLORER 3.5 STD GRADO 2",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["7T4Z-6D309-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-094",
            precio: 8.5,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BANCADA-EXPLORER-3.5-GR2",
            imagen: "images/motor/CONCHA-BANCADA-EXPLORER-3.5-GR2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-095",
            nombre: "CONCHA DE BIELA FORD EXPLORER 3.5 GRADO 1",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BL3Z-6211-DA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-095",
            precio: 10.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BIELA-3.5",
            imagen: "images/motor/CONCHA-BIELA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-096",
            nombre: "CONCHA DE BIELA FORD EXPLORER 3.5 GRADO 2",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BL3Z-6211-EA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-096",
            precio: 10.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BIELA-3.5-GD2",
            imagen: "images/motor/CONCHA-BIELA-3.5-GD2.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-097",
            nombre: "CONCHA DE BIELA FORD FUSION ESCAPE 3.0 0.10",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: ["2006-20012"],
            categoria: "motor",
            numeroParteFord: ["6E5Z-6211-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-097",
            precio: 6.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BIELA-FUSION-0.10",
            imagen: "images/motor/CONCHA-BIELA-FUSION-0.10.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-098",
            nombre: "CONCHA DE BIELA FORD SUPER DUTY 6.2 STD",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6211-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-098",
            precio: 7.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONCHA-BIELA-SUPER-DUTY",
            imagen: "images/motor/CONCHA-BIELA-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-099",
            nombre: "CONTACTOR CINTA DE VOLANTE FORD EXPLORER 4.6 ",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: ["4.6"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["8L2Z-14A664-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-099",
            precio: 99.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONTACTOR-4.6",
            imagen: "images/motor/CONTACTOR-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-100",
            nombre: "CONTACTOR CINTA DE VOLANTE FORD SUPER DUTY 6.2 2012 / 2016",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: ["6.2"],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["GC3Z-14A664-E"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-100",
            precio: 69.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CONTACTOR-SUPER-DUTY",
            imagen: "images/motor/CONTACTOR-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-101",
            nombre: "CORREA BOMBA DE AGUA FORD FUSION",
            marca: "FORD",
            modelo: ["FUSION"],
            motor: ["3.0"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["6E5Z-8620-CA"],
            codigoMotorcraft: ["JK3-204"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-101",
            precio: 43.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-AGUA-FUSION",
            imagen: "images/motor/CORREA-AGUA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-102",
            nombre: "CORREA MULTICANAL FORD EXPLORER 2012-2015",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BT4Z-8620-A"],
            codigoMotorcraft: ["JK6-455-C"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-102",
            precio: 30.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-MULTI-3.5",
            imagen: "images/motor/CORREA-MULTI-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-103",
            nombre: "CORREA MULTICANAL FORD EXPLORER 4.6 2V",
            marca: "FORD",
            modelo: ["EXPLORER-4.6-2V"],
            motor: [],
            anios: [2002, 2003, 2004, 2005],
            categoria: "motor",
            numeroParteFord: ["4L2Z-8620-A"],
            codigoMotorcraft: ["JK6-1013"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-103",
            precio: 39.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-EXPLORER-4.6-2V",
            imagen: "images/motor/CORREA-EXPLORER-4.6-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-104",
            nombre: "CORREA MULTICANAL FORD F-150 3.5",
            marca: "FORD",
            modelo: ["F-150", "EXPLORER-3.5"],
            motor: [],
            anios: ["2011--2018"],
            categoria: "motor",
            numeroParteFord: ["BL3Z-8620-C"],
            codigoMotorcraft: ["JK6-553"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-104",
            precio: 25.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-F-150-3.5",
            imagen: "images/motor/CORREA-F-150-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-105",
            nombre: "CORREA MULTICANAL FORD F-150 5.0",
            marca: "FORD",
            modelo: ["COYOTE"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019],
            categoria: "motor",
            numeroParteFord: ["BL3Z-8620-G"],
            codigoMotorcraft: ["JK6-648"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-105",
            precio: 43.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-F-150-5.0",
            imagen: "images/motor/CORREA-F-150-5.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-106",
            nombre: "CORREA MULTICANAL FORD F150 F350 TRITON",
            marca: "FORD",
            modelo: ["F-150-TRITON"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["BC2Z-8620-A"],
            codigoMotorcraft: ["JK6-1004-B"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-106",
            precio: 23.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-F150-F350-TRITON",
            imagen: "images/motor/CORREA-F150-F350-TRITON.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-107",
            nombre: "CORREA MULTICANAL FORD F350 F250 SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["KC3Z-8620-A"],
            codigoMotorcraft: ["JK6-1064"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-107",
            precio: 34.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-F350-F250-SUPER-DUTY",
            imagen: "images/motor/CORREA-F350-F250-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-108",
            nombre: "CORREA MULTICANAL FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["CN1Z-8620-E"],
            codigoMotorcraft: ["JK6-412-A"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-108",
            precio: 75.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-FIESTA-TITANIUM",
            imagen: "images/motor/CORREA-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-109",
            nombre: "CORREA MULTICANAL FORD MUSTANG 4.6",
            marca: "FORD",
            modelo: ["MUSTANG-4.6"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011, 2012],
            categoria: "motor",
            numeroParteFord: ["7R3Z-8620-D"],
            codigoMotorcraft: ["JK6-1029-A"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-109",
            precio: 44.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-MUSTANG-4.6",
            imagen: "images/motor/CORREA-MUSTANG-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-110",
            nombre: "CORREA MULTICANAL FORD RANGER 2.3",
            marca: "FORD",
            modelo: ["RANGER-2.3"],
            motor: [],
            anios: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["1L5Z-8620-AC"],
            codigoMotorcraft: ["JK6-834-AA"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-110",
            precio: 26.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-RANGER-2.3",
            imagen: "images/motor/CORREA-RANGER-2.3.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-111",
            nombre: "CORREA UNICA FORD ECOSPORT TITANIUM",
            marca: "FORD",
            modelo: ["ECOSPORT-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["CN15-6C301-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-111",
            precio: 20.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CORREA-ECOSPORT-TITANIUM",
            imagen: "images/motor/CORREA-ECOSPORT-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-112",
            nombre: "CREMALLERA VOLANTE FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: [],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["7T4Z-6375-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-112",
            precio: 54.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CREMALLERA-3.5",
            imagen: "images/motor/CREMALLERA-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-113",
            nombre: "CUBO DE RUEDA DELANTERO FORD FUSION",
            marca: "FORD",
            modelo: ["FUSION-3.0"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["6E5Z-1104-AB"],
            codigoMotorcraft: ["HUB-21"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-113",
            precio: 47.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUBO-FUSION",
            imagen: "images/motor/CORREA-MULTI-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-114",
            nombre: "CUBO RUEDA TRASERO FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["DCPZ-1104-A"],
            codigoMotorcraft: ["HUB-226"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-114",
            precio: 129.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUBO-TRASERO-FIESTA-TITANIUM",
            imagen: "images/motor/CUBO-TRASERO-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-115",
            nombre: "CUERPO DE ACELERACION FORD EXPLORER",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["8L2Z-9E926-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-115",
            precio: 327.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUERPO-EXPLORER-4.6",
            imagen: "images/motor/CUERPO-EXPLORER-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-116",
            nombre: "CUERPO DE ACELERACION FORD EXPLORER 2012",
            marca: "FORD",
            modelo: ["EXPLORER 3.5"],
            motor: [],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-9E926-B"],
            codigoMotorcraft: ["TB-2"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-116",
            precio: 137.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUERPO-EXPLORER-3.5",
            imagen: "images/motor/CUERPO-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-117",
            nombre: "CUERPO DE ACELERACION FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["7S7Z-9E926-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-117",
            precio: 248.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUERPO-FIESTA-TITANIUM",
            imagen: "images/motor/CUERPO-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-118",
            nombre: "CUERPO DE ACELERACION FORD SUPER DUTY 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-9E926-A"],
            codigoMotorcraft: ["TB-13"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-118",
            precio: 162.0,
            tipo: "ORIGINAL FORD",
            descripcion: "CUERPO-SUPER-DUTY",
            imagen: "images/motor/CUERPO-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-119",
            nombre: "ELECTROVENTILADOR FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["8V5Z-8C607-Q"],
            codigoMotorcraft: ["RF-427"],
            codigoOEM: [],
            codigoInterno: "PS-MOT-119",
            precio: 141.0,
            tipo: "ORIGINAL FORD",
            descripcion: "ELECTROVENTIALDOR-FIESTA-TITANIUM",
            imagen: "images/motor/ELECTROVENTIALDOR-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-120",
            nombre: "EMPACADURA BASE FILTRO DE ACEITE FORD EXPLORER 4.6 F150 5.4",
            marca: "FORD",
            modelo: ["EXPLORER-4.6-F-150-5.4"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["F65Z-6840-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-120",
            precio: 34.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-BASE-FILTRO-F-150-EXPLORER-4.6",
            imagen: "images/motor/EMP-BASE-FILTRO-F-150-EXPLORER-4.6.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-121",
            nombre: "EMPACADURA BOMBA DE AGUA FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: [],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["DG1Z-8507-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-121",
            precio: 39.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-BOMBA-AGUA-EXPLORER-3.5",
            imagen: "images/motor/EMP-BOMBA-AGUA-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-122",
            nombre: "EMPACADURA CAMARIN FORD TRITON FORTALEZA 5.4 RH 2V",
            marca: "FORD",
            modelo: ["TRITO-FORTALEZA-2V"],
            motor: [],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
            categoria: "motor",
            numeroParteFord: ["YL3Z-9439-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-122",
            precio: 34.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAMARIN-TRITON-FORTALEZA-2V",
            imagen: "images/motor/EMP-CAMARIN-TRITON-FORTALEZA-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-123",
            nombre: "EMPACADURA CAMARÍN ADMISIÓN FORD TRITÓN EXPLORER",
            marca: "FORD",
            modelo: ["TRITON-EXPLORER-2V"],
            motor: [],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
            categoria: "motor",
            numeroParteFord: ["XW7Z-9439-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-123",
            precio: 18.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAMARIN-TRITON-EXPLORER",
            imagen: "images/motor/EMP-CAMARIN-TRITON-EXPLORER.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-124",
            nombre: "EMPACADURA CARTER DEL MOTOR FORD FUSION ESCAPE 3.0",
            marca: "FORD",
            modelo: ["FUSION-ESCAPE"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["3W4Z-6710-DA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-124",
            precio: 19.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CARTE-FUSION-ESCAPE",
            imagen: "images/motor/EMP-CARTE-FUSION-ESCAPE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-125",
            nombre: "EMPACADURA CARTER FORD EXPLORER / RANGER 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-RANGER-4.0"],
            motor: [],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["F77Z-6710-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-125",
            precio: 31.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMPACADURA-CARTER-EXPLORER-RANGER-4.0",
            imagen: "images/motor/EMPACADURA-CARTER-EXPLORER-RANGER-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-126",
            nombre: "EMPACADURA CARTER MOTOR 6.2 FORD SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6710-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-126",
            precio: 52.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CARTER-SUPER-DUTY",
            imagen: "images/motor/EMP-CARTER-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-127",
            nombre: "EMPACADURA CARTER MOTOR FORD 4.6 Y 5.4 3V Y 2V EXPLORER FX4 F-150 F-350 EXPEDITION",
            marca: "FORD",
            modelo: ["EXPLORER FX4 F-150 F-350 EXPEDITION"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-6710-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-127",
            precio: 22.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMPACADURA-CARTER-4.6-5.4-3V-2V",
            imagen: "images/motor/EMPACADURA-CARTER-4.6-5.4-3V-2V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-128",
            nombre: "EMPACADURA COLECTOR DE ADMISION DELANTERO FORD EXPLORER SPORT TRAC 4.6 3V",
            marca: "FORD",
            modelo: ["EXPLORER", "SPORT-TRAC", "4.6-3V"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7R3Z-9439-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-128",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-COLEC-ADM-EXPLORER-SPORTRACK-3V",
            imagen: "images/motor/EMP-COLEC-ADM-EXPLORER-SPORTRACK-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-129",
            nombre: "EMPACADURA COLECTOR DE ADMISION TRASERO FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: ["3.5"],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["BL3Z-9439-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-129",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-COLECTOR-TRAS-EXPLORER-3-5",
            imagen: "images/motor/EMP-COLECTOR-TRAS-EXPLORER-3-5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-130",
            nombre: "EMPACADURA DE ADMISION FORD EXPLORER 4.6 FX4 3V",
            marca: "FORD",
            modelo: ["EXPLORER-4.6", "FX4-3V"],
            motor: ["4.6", "5.4"],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-9439-DA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-130",
            precio: 28.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-ADN-EXPLORER-FX4-3V",
            imagen: "images/motor/EMP-ADN-EXPLORER-FX4-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-131",
            nombre: "EMPACADURA DE CAMARA FORD ECOSPORT FOCUS 2.0 RANGER 2.3",
            marca: "FORD",
            modelo: ["ECOSPORT-FOCUS-RANGER"],
            motor: ["2.0", "2.3"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["1S7Z-6051-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-131",
            precio: 38.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-ECOSPORT-FOCUS-RANGER",
            imagen: "images/motor/EMP-CAM-ECOSPORT-FOCUS-RANGER.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-132",
            nombre: "EMPACADURA DE CAMARA FORD FIESTA 1.6, KA",
            marca: "FORD",
            modelo: ["FIESTA-KA"],
            motor: ["1.6"],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["XS6E-6051-BF"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-132",
            precio: 23.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-FIESTA-KA",
            imagen: "images/motor/EMP-CAM-FIESTA-KA.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-133",
            nombre: "EMPACADURA DE CAMARA FORD FIESTA TITANIUM",
            marca: "FORD",
            modelo: ["FIESTA-TITANIUM"],
            motor: [],
            anios: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            categoria: "motor",
            numeroParteFord: ["BE8Z-6051-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-133",
            precio: 22.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-FIESTA-TITANIUM",
            imagen: "images/motor/EMP-CAM-FIESTA-TITANIUM.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-134",
            nombre: "EMPACADURA DE CAMARA LH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: [],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6051-F"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-134",
            precio: 33.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-LH-EXPLORER-3.5",
            imagen: "images/motor/EMP-CAM-LH-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-135",
            nombre: "EMPACADURA DE CAMARA LH FORD EXPLORER 4.6 FX4",
            marca: "FORD",
            modelo: ["EXPLORER"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7L3Z-6051-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-135",
            precio: 69.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-EXPLORER-FX4",
            imagen: "images/motor/EMP-CAM-EXPLORER-FX4.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-136",
            nombre: "EMPACADURA DE CAMARA LH FORD F150 EXPLORER TRITON 5.4 4..6 2V",
            marca: "FORD",
            modelo: ["EXPLORER-TRITON"],
            motor: [],
            anios: [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007],
            categoria: "motor",
            numeroParteFord: ["4C2Z-6051-BA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-136",
            precio: 38.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-LH-TRITON-EXPLORER",
            imagen: "images/motor/EMP-CAM-LH-TRITON-EXPLORER.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-137",
            nombre: "EMPACADURA DE CAMARA LH FORD FUSION ESCAPE 3.0",
            marca: "FORD",
            modelo: ["FUSION-ESCAPE"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["6E5Z-6051-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-137",
            precio: 33.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-LH-FUSION-ESCAPE",
            imagen: "images/motor/EMP-CAM-LH-FUSION-ESCAPE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-138",
            nombre: "EMPACADURA DE CAMARA LH FORD SUPER DUTY MOTOR 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6051-B"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-138",
            precio: 43.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-LH-SUPER-DUTY",
            imagen: "images/motor/EMP-CAM-LH-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-139",
            nombre: "EMPACADURA DE CAMARA RH FORD EXPLORER 3.5",
            marca: "FORD",
            modelo: ["EXPLORER-3.5"],
            motor: [],
            anios: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AT4Z-6051-E"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-139",
            precio: 32.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-RH-EXPLORER-3.5",
            imagen: "images/motor/EMP-CAM-RH-EXPLORER-3.5.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-140",
            nombre: "EMPACADURA DE CAMARA RH FORD EXPLORER 4.6 FX4",
            marca: "FORD",
            modelo: ["EXPLORER-4.6", "FX4-3V"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["7L3Z-6051-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-140",
            precio: 73.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-RH-EXPLORER-4.6-FX4",
            imagen: "images/motor/EMP-CAM-RH-EXPLORER-4.6-FX4.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-141",
            nombre: "EMPACADURA DE CAMARA RH FORD F150 EXPLORER TRITON 5.4 4..6 2V",
            marca: "FORD",
            modelo: ["EXPLORER-TRITON"],
            motor: [],
            anios: [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007],
            categoria: "motor",
            numeroParteFord: ["4C2Z-6051-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-141",
            precio: 42.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-RH-TRITON-EXPLORER",
            imagen: "images/motor/EMP-CAM-RH-TRITON-EXPLORER.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-142",
            nombre: "MPACADURA DE CAMARA RH FORD FUSION ESCAPE V6 3.0",
            marca: "FORD",
            modelo: ["FUSION-ESCAPE"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["6E5Z-6051-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-142",
            precio: 26.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-RH-FUSION-ESCAPE",
            imagen: "images/motor/EMP-CAM-RH-FUSION-ESCAPE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-143",
            nombre: "EMPACADURA DE CAMARA RH FORD SUPER DUTY MOTOR 6.2",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AL3Z-6051-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-143",
            precio: 42.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-CAM-RH-SUPER-DUTY",
            imagen: "images/motor/EMP-CAM-RH-SUPER-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-144",
            nombre: "EMPACADURA DE LA TAPA DEL BLOCK FORD FUSION Y ESCAPE 3.0",
            marca: "FORD",
            modelo: ["FUSION-ESCAPE"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["3F1Z-6B752-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-144",
            precio: 20.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-TAPA-BLOCK-FUSION-ESCAPE",
            imagen: "images/motor/EMP-TAPA-BLOCK-FUSION-ESCAPE.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-145",
            nombre: "EMPACADURA DE LEVA FORD FUSION 3.0",
            marca: "FORD",
            modelo: ["FUSION-ESCAPE"],
            motor: [],
            anios: [2005, 2006, 2007, 2008, 2009],
            categoria: "motor",
            numeroParteFord: ["3M4Z-6B295-AB"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-145",
            precio: 5.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-LEVA-FUSION",
            imagen: "images/motor/EMP-LEVA-FUSION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-146",
            nombre: "MPACADURA DE TERMOSTATO LH FX4 EXPEDITION 5.4 3V",
            marca: "FORD",
            modelo: ["FX4-EXPEDITION"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-8C388-AC"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-146",
            precio: 9.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-LH-TERMOS-FX4-EXPEDITION",
            imagen: "images/motor/EMP-LH-TERMOS-FX4-EXPEDITION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-147",
            nombre: "EMPACADURA DE TERMOSTATO RH FX4 EXPEDITION 5.4 3V",
            marca: "FORD",
            modelo: ["FX4-EXPEDITION"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-8C387-AC"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-147",
            precio: 12.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-RH-TERMOS-FX4-EXPEDITION",
            imagen: "images/motor/EMP-RH-TERMOS-FX4-EXPEDITION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-148",
            nombre: "EMPACADURA MULTIPLE ADMISION 3V",
            marca: "FORD",
            modelo: ["EXPLORER-4.6"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["4R3Z-9439-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-148",
            precio: 20.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-EXPLORER-3V",
            imagen: "images/motor/EMP-MULTI-EXPLORER-3V.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-149",
            nombre: "EMPACADURA MULTIPLE ADMISION FORD SUPER DUTY",
            marca: "FORD",
            modelo: ["SUPER-DUTY-6.2"],
            motor: [],
            anios: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            categoria: "motor",
            numeroParteFord: ["AC3Z-9439-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-149",
            precio: 24.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-ADM-SUPERD-DUTY",
            imagen: "images/motor/EMP-MULTI-ADM-SUPERD-DUTY.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-150",
            nombre: "MPACADURA MULTIPLE ADMISION SUPERIOR FORD EXPLORER RANGER 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-RANGER-4.0"],
            motor: [],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["YL2Z-9E436-AA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-150",
            precio: 36.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-AMD-EXPLORER-RANGER-4.0",
            imagen: "images/motor/EMP-MULTI-AMD-EXPLORER-RANGER-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-151",
            nombre: "EMPACADURA MULTIPLE DE ADMISION 5.4",
            marca: "FORD",
            modelo: ["FX4-EXPEDITION"],
            motor: [],
            anios: [2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["3L3Z-9439-EA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-151",
            precio: 37.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-ADM-FX4-EXPEDITION",
            imagen: "images/motor/EMP-MULTI-ADM-FX4-EXPEDITION.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-152",
            nombre: "EMPACADURA MULTIPLE DE ADMISION EXPLORER 4.0",
            marca: "FORD",
            modelo: ["EXPLORER-4.0"],
            motor: [],
            anios: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            categoria: "motor",
            numeroParteFord: ["1L2Z-9461-CA"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-152",
            precio: 13.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-AMD-EXPLORER-4.0",
            imagen: "images/motor/EMP-MULTI-AMD-EXPLORER-4.0.jpg",
            disponibilidad: true
        },
        {
            id: "PS-MOT-153",
            nombre: "EMPACADURA MULTIPLE DE ADMISION F-150 5.0 1ER GEN",
            marca: "FORD",
            modelo: ["COYOTE-F-150"],
            motor: [],
            anios: [2011, 2012, 2013, 2014],
            categoria: "motor",
            numeroParteFord: ["BR3Z-9439-A"],
            codigoMotorcraft: [],
            codigoOEM: [],
            codigoInterno: "PS-MOT-153",
            precio: 12.0,
            tipo: "ORIGINAL FORD",
            descripcion: "EMP-MULTI-AMD-F-150-COYOTE-1ERA",
            imagen: "images/motor/EMP-MULTI-AMD-F-150-COYOTE-1ERA.jpg",
            disponibilidad: true
        }
    ],

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


/* =========================================
   COMPATIBILIDAD AUTOMÁTICA
   El catálogo de vehículos se construye desde
   los productos cargados en el Excel.
========================================= */

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
    return texto.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());
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
                    ...new Set([
                        ...vehiculosFord[modeloKey].motores[motorKey].anios,
                        ...anios
                    ])
                ].sort((a, b) => a - b);
            });
        });
    });
}

construirCatalogoVehiculos();


/* =========================================
   UTILIDADES
========================================= */

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
    if (Array.isArray(valor)) {
        return valor;
    }

    if (valor === undefined || valor === null || valor === "") {
        return [];
    }

    return [valor];
}

function contieneValor(lista, valor) {
    const objetivo = normalizarTexto(valor);

    return convertirArray(lista).some(item => {
        return normalizarTexto(item) === objetivo;
    });
}

function obtenerTodosLosProductos() {
    return Object.values(productos).flat();
}

/* =========================================================
   CATÁLOGO PARTSOLUTIONS DESDE EXCEL
========================================================= */

const ARCHIVO_CATALOGO_EXCEL =
    "PARTSOLUTIONS_CATALOGO_MASTER.xlsx";


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
   CONVERTIR LISTAS DEL EXCEL
========================================================= */

function convertirListaExcel(valor) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {
        return [];
    }

    if (Array.isArray(valor)) {
        return valor
            .map(item => String(item).trim())
            .filter(Boolean);
    }

    const texto =
        String(valor).trim();

    if (!texto || texto === "[]") {
        return [];
    }

    return texto
        .split(/[;,|]/)
        .map(item => item.trim())
        .filter(Boolean);
}


/* =========================================================
   AÑOS
========================================================= */

function convertirAniosExcel(valor) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {
        return [];
    }

    const texto =
        String(valor).trim();

    /*
       Permite:

       2012, 2013, 2014

       o:

       2012-2018
    */

    const rango =
        texto.match(
            /^(20\d{2})\s*-\s*(20\d{2})$/
        );

    if (rango) {

        const inicio =
            Number(rango[1]);

        const fin =
            Number(rango[2]);

        /*
           Evita errores enormes por una
           posible digitación accidental.
        */

        if (
            fin >= inicio &&
            fin - inicio <= 20
        ) {

            return Array.from(
                {
                    length:
                        fin - inicio + 1
                },
                (_, indice) =>
                    inicio + indice
            );
        }

        return [];
    }

    return texto
        .split(/[;,|]/)
        .map(item =>
            Number(item.trim())
        )
        .filter(
            numero =>
                Number.isFinite(numero)
        );
}


/* =========================================================
   PRECIO
========================================================= */

function convertirPrecioExcel(valor) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {
        return null;
    }

    if (
        typeof valor === "number" &&
        Number.isFinite(valor)
    ) {
        return valor;
    }

    let texto =
        String(valor)
            .trim()
            .replace(/[^0-9,.-]/g, "");

    if (
        texto.includes(",") &&
        texto.includes(".")
    ) {

        texto =
            texto.replace(/,/g, "");

    } else if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(",", ".");
    }

    const numero =
        Number(texto);

    return Number.isFinite(numero)
        ? numero
        : null;
}


/* =========================================================
   DISPONIBILIDAD
========================================================= */

function convertirDisponibilidadExcel(valor) {

    const texto =
        normalizarTexto(valor);

    return [
        "SI",
        "SÍ",
        "TRUE",
        "1",
        "DISPONIBLE",
        "YES"
    ].includes(texto);
}


/* =========================================================
   CATEGORÍA
========================================================= */

function convertirCategoriaExcel(valor) {

    const texto =
        normalizarTexto(valor);

    if (!texto) {
        return "";
    }

    /*
       Alias para tolerar diferencias de escritura
       presentes en el Excel maestro.
    */
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

    if (aliasCategorias[texto]) {
        return aliasCategorias[texto];
    }

    const encontrada =
        Object.entries(categorias)
            .find(([clave, nombre]) => {

                return (
                    normalizarTexto(clave) === texto ||
                    normalizarTexto(nombre) === texto
                );

            });

    return encontrada
        ? encontrada[0]
        : "";
}


/* =========================================================
   ACTUALIZAR CANTIDAD EN TARJETAS
========================================================= */

function actualizarConteosCategorias() {

    document
        .querySelectorAll(
            "[data-category-count]"
        )
        .forEach(elemento => {

            const categoria =
                elemento.dataset.categoryCount;

            const total =
                (
                    productos[categoria] || []
                ).length;

            elemento.textContent =
                `${total} ${
                    total === 1
                        ? "producto"
                        : "productos"
                }`;

        });
}


/* =========================================================
   CARGAR CATÁLOGO DESDE EXCEL
========================================================= */

async function cargarCatalogoDesdeExcel() {

    if (
        typeof XLSX === "undefined"
    ) {

        throw new Error(
            "No se pudo cargar el lector de Excel."
        );
    }


    const respuesta =
        await fetch(
            ARCHIVO_CATALOGO_EXCEL,
            {
                cache: "no-store"
            }
        );


    if (!respuesta.ok) {

        throw new Error(
            `No se pudo encontrar ${ARCHIVO_CATALOGO_EXCEL}.`
        );
    }


    const buffer =
        await respuesta.arrayBuffer();


    const libro =
        XLSX.read(
            buffer,
            {
                type: "array"
            }
        );


    if (
        !libro.SheetNames.length
    ) {

        throw new Error(
            "El archivo Excel no contiene hojas."
        );
    }


    /*
       Buscamos primero la hoja CATALOGO.
       Si no existe, utiliza la primera hoja.
    */

    const nombreHoja =
        libro.SheetNames.find(
            nombre =>
                normalizarTexto(nombre) ===
                "CATALOGO"
        ) ||
        libro.SheetNames[0];


    const hoja =
        libro.Sheets[nombreHoja];


    const filas =
        XLSX.utils.sheet_to_json(
            hoja,
            {
                defval: ""
            }
        );


    const nuevoCatalogo =
        crearCatalogoVacio();


    const idsUtilizados =
        new Set();


    filas.forEach(fila => {

        const id =
            String(
                fila["ID"] || ""
            ).trim();


        const nombre =
            String(
                fila["Nombre"] || ""
            ).trim();


        if (
            !id ||
            !nombre
        ) {
            return;
        }


        /*
           Evita productos duplicados.
        */

        if (
            idsUtilizados.has(id)
        ) {
            console.warn(
                "Producto duplicado:",
                id
            );

            return;
        }


        idsUtilizados.add(id);


        const categoria =
            convertirCategoriaExcel(
                fila["Categoría"] ||
                fila["Categoria"]
            );


        if (!categoria) {

            console.warn(
                "Categoría no válida para:",
                id
            );

            return;
        }


        const producto = {

            id,

            nombre,

            marca:
                String(
                    fila["Marca"] || ""
                ).trim(),


            modelo:
                convertirListaExcel(
                    fila["Modelo"]
                ),


            motor:
                convertirListaExcel(
                    fila["Motor"]
                ),


            anios:
                convertirAniosExcel(
                    fila["Años"] ||
                    fila["Anos"]
                ),


            categoria,


            numeroParteFord:
                convertirListaExcel(
                    fila[
                        "Número de Parte Ford"
                    ] ||
                    fila[
                        "Numero de Parte Ford"
                    ]
                ),


            codigoMotorcraft:
                convertirListaExcel(
                    fila[
                        "Código Motorcraft"
                    ] ||
                    fila[
                        "Codigo Motorcraft"
                    ]
                ),


            codigoOEM:
                convertirListaExcel(
                    fila[
                        "Código OEM"
                    ] ||
                    fila[
                        "Codigo OEM"
                    ]
                ),


            codigoInterno:
                id,


            precio:
                convertirPrecioExcel(
                    fila["Precio"]
                ),


            tipo:
                String(
                    fila["Tipo"] ||
                    "ORIGINAL FORD"
                ).trim(),


            descripcion:
                String(
                    fila["Descripción"] ||
                    fila["Descripcion"] ||
                    ""
                ).trim(),


            imagen:
                String(
                    fila["Imagen"] ||
                    ""
                ).trim(),


            disponibilidad:
                convertirDisponibilidadExcel(
                    fila["Disponibilidad"]
                )
        };


        nuevoCatalogo[
            categoria
        ].push(producto);

    });


    productos =
        nuevoCatalogo;


    /*
       Reconstruir compatibilidades
       después de cargar todos los productos.
    */

    construirCatalogoVehiculos();


    /*
       Actualizar números de productos
       en las categorías.
    */

    if (typeof actualizarConteosCategorias === "function") {
        actualizarConteosCategorias();
    }


    /*
       Actualizar el carrito por si había
       productos guardados anteriormente.
    */

    actualizarCarrito();


    console.info(
        `PartSolutions: ${
            idsUtilizados.size
        } productos cargados desde Excel.`
    );


    return idsUtilizados.size;
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


/* =========================================
   PRECIOS
========================================= */
function obtenerPrecioNumero(producto) {
    if (!producto) return null;
    if (typeof producto.precio === "number" && Number.isFinite(producto.precio)) {
        return producto.precio;
    }
    const texto = String(producto.precio ?? "").replace(/[^0-9.,-]/g, "").replace(/,(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
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

/* =========================================
   ELEMENTOS DEL DOM
========================================= */

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

let catalogCategoriaActual = "todos";
let catalogTextoActual = "";
let catalogLimite = 12;
const CATALOGO_POR_PAGINA = 12;

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalProducts = document.getElementById("modalProducts");
const modalClose = document.getElementById("modalClose");
const productSearch = document.getElementById("productSearch");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const contactButton = document.getElementById("contactButton");

let categoriaActual = "";


/* =========================================
   SELECTS
========================================= */

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

    if (marca.value !== "ford") {
        return;
    }

    Object.entries(vehiculosFord).forEach(([key, vehiculo]) => {
        modelo.appendChild(new Option(vehiculo.nombre, key));
    });

    modelo.disabled = false;
}

function cargarMotores() {
    if (!modelo || !motor) return;

    resetSelect(motor, "Selecciona un motor");

    const vehiculo = vehiculosFord[modelo.value];

    if (!vehiculo) {
        return;
    }

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

    if (!motorSeleccionado) {
        return;
    }

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


/* =========================================
   CAMBIO DE MARCA
========================================= */

marca?.addEventListener("change", () => {
    cargarModelos();

    resetSelect(motor, "Selecciona un motor");
    resetSelect(ano, "Selecciona un año");
    resetSelect(categoria, "Selecciona una categoría");
});


/* =========================================
   CAMBIO DE MODELO
========================================= */

modelo?.addEventListener("change", () => {
    cargarMotores();

    resetSelect(ano, "Selecciona un año");
    resetSelect(categoria, "Selecciona una categoría");
});


/* =========================================
   CAMBIO DE MOTOR
========================================= */

motor?.addEventListener("change", () => {
    cargarAnios();
    resetSelect(categoria, "Selecciona una categoría");
});


/* =========================================
   CAMBIO DE AÑO
========================================= */

ano?.addEventListener("change", () => {
    prepararCategoria();
});


/* =========================================
   FILTRAR PRODUCTOS POR VEHÍCULO
========================================= */

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
    const motorSeleccionado =
        vehiculosFord[modelo?.value]?.motores?.[motor?.value]?.nombre;
    const anioSeleccionado = Number(ano?.value);
    const categoriaSeleccionada = categoria?.value;

    if (!producto) return false;

    if (producto.marca && normalizarTexto(producto.marca) !== "FORD") {
        return false;
    }

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

    if (modeloSeleccionado) {
        if (!compatibilidadCoincide(valoresCompatibilidad(producto.modelo), modeloSeleccionado)) {
            return false;
        }
    }

    if (motorSeleccionado) {
        if (!compatibilidadCoincide(valoresCompatibilidad(producto.motor), motorSeleccionado)) {
            return false;
        }
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


/* =========================================
   BUSCAR POR VEHÍCULO
========================================= */

function buscarPorVehiculo() {
    if (
        !marca?.value ||
        !modelo?.value ||
        !motor?.value ||
        !ano?.value ||
        !categoria?.value
    ) {
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
        mostrarMensajeResultado(
            "⚠️ No se pudo identificar correctamente el vehículo seleccionado."
        );
        return;
    }

    const productosEncontrados = (
        productos[categoria.value] || []
    ).filter(productoCompatible);

    mostrarResultadosVehiculo(
        productosEncontrados,
        vehiculo.nombre,
        datosMotor.nombre,
        ano.value,
        categoria.value
    );
}

function mostrarResultadosVehiculo(
    encontrados,
    nombreModelo,
    nombreMotor,
    anioSeleccionado,
    categoriaSeleccionada
) {
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
            Categoría:
            <strong>${escaparHTML(nombreCategoria)}</strong>
        </div>
    `;

    if (encontrados.length === 0) {
        html += `
            <div class="search-result-box" style="margin-top:15px;">
                <strong>No encontramos productos registrados.</strong>
                <br><br>
                Actualmente no tenemos productos cargados que coincidan
                con esta selección.
                <br><br>
                Puedes buscar directamente por número de parte o
                contactarnos para verificar disponibilidad.
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


/* =========================================
   BUSCAR POR NÚMERO DE PARTE
   Busca en:
   - Ford
   - Motorcraft
   - OEM
   - Código interno PartSolutions
========================================= */

function buscarNumeroParte() {

    const textoOriginal =
        String(partNumber?.value || "")
            .trim();

    const busqueda =
        normalizarTexto(textoOriginal);

    const codigoBuscado =
        normalizarCodigo(textoOriginal);

    if (!busqueda) {

        mostrarMensajeResultado(
            "⚠️ Escribe un número de parte, código, modelo o nombre del repuesto."
        );

        return;
    }

    const productosTodos =
        obtenerTodosLosProductos();

    const resultados =
        productosTodos
            .map(producto => {

                const codigos = [
                    ...convertirArray(
                        producto.numeroParteFord
                    ),
                    ...convertirArray(
                        producto.codigoMotorcraft
                    ),
                    ...convertirArray(
                        producto.codigoOEM
                    ),
                    producto.codigoInterno
                ].filter(Boolean);

                const textoProducto =
                    normalizarTexto([
                        producto.nombre,
                        producto.descripcion,
                        producto.marca,
                        producto.modelo,
                        producto.motor,
                        producto.anios,
                        producto.tipo,
                        producto.categoria
                    ].join(" "));

                const codigosNormalizados =
                    codigos.map(codigo =>
                        normalizarCodigo(codigo)
                    );

                let puntuacion = 0;

                /* =====================================
                   COINCIDENCIA EXACTA DE CÓDIGO
                ===================================== */

                if (
                    codigosNormalizados.some(
                        codigo =>
                            codigo === codigoBuscado
                    )
                ) {

                    puntuacion += 100;
                }

                /* =====================================
                   CÓDIGO CONTENIDO
                ===================================== */

                else if (
                    codigosNormalizados.some(
                        codigo =>
                            codigo.includes(
                                codigoBuscado
                            )
                    )
                ) {

                    puntuacion += 85;
                }

                /* =====================================
                   BÚSQUEDA GENERAL
                ===================================== */

                const palabras =
                    busqueda
                        .split(/\s+/)
                        .filter(Boolean);

                palabras.forEach(palabra => {

                    const codigoPalabra =
                        normalizarCodigo(
                            palabra
                        );

                    if (
                        codigoPalabra.length >= 3 &&
                        codigosNormalizados.some(
                            codigo =>
                                codigo.includes(
                                    codigoPalabra
                                )
                        )
                    ) {

                        puntuacion += 45;
                    }

                    if (
                        textoProducto.includes(
                            palabra
                        )
                    ) {

                        puntuacion += 20;
                    }

                });

                /* =====================================
                   COINCIDENCIAS ESPECIALES
                ===================================== */

                if (
                    normalizarTexto(
                        producto.nombre
                    ).includes(busqueda)
                ) {

                    puntuacion += 60;
                }

                if (
                    normalizarTexto(
                        producto.modelo
                    ).includes(busqueda)
                ) {

                    puntuacion += 40;
                }

                if (
                    normalizarTexto(
                        producto.motor
                    ).includes(busqueda)
                ) {

                    puntuacion += 35;
                }

                if (
                    String(
                        producto.anios || ""
                    ).includes(textoOriginal)
                ) {

                    puntuacion += 30;
                }

                return {
                    producto,
                    puntuacion
                };

            })
            .filter(resultado =>
                resultado.puntuacion > 0
            )
            .sort(
                (a, b) =>
                    b.puntuacion -
                    a.puntuacion
            );

    mostrarResultadosInteligentes(
        resultados,
        textoOriginal
    );
}
function mostrarResultadosInteligentes(
    resultados,
    textoBuscado
) {

    if (!resultado) {
        return;
    }

    if (!resultados.length) {

        resultado.innerHTML = `

            <div class="search-result-box">

                <strong>
                    No encontramos coincidencias.
                </strong>

                <br><br>

                No encontramos un repuesto relacionado con:

                <strong>
                    ${escaparHTML(textoBuscado)}
                </strong>

                <br><br>

                Puedes probar con un número de parte,
                modelo, motor o nombre del repuesto.

            </div>
        `;

        return;
    }

    const productosEncontrados =
        resultados.map(
            item => item.producto
        );

    resultado.innerHTML = `

        <div class="search-result-box">

            <strong>
                ${productosEncontrados.length}
                coincidencia(s) encontrada(s)
            </strong>

            <br>

            Búsqueda:

            <strong>
                ${escaparHTML(textoBuscado)}
            </strong>

        </div>

        <div
            class="modal-products"
            style="margin-top:20px;"
        >
            ${productosEncontrados
                .map(crearProductoHTML)
                .join("")}
        </div>
    `;
}

/* =========================================
   CÁLCULOS CASHEA
========================================= */

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
    return calculateCasheaDetails(
        precio,
        TASA_DOLAR,
        TASA_CASHEA,
        nivel
    );
}

function actualizarControlesPrecio() {
    document
        .querySelectorAll("[data-price-mode]")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.priceMode === modoPrecioActual
            );
        });

    const control =
        document.querySelector("[data-cashea-level-control]");

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

    if (typeof listaProductosActual !== "undefined" && listaProductosActual.length) {
        mostrarProductos(listaProductosActual);
    }
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
        nivelCasheaActual = Math.min(
            6,
            Math.max(1, Number(select.value) || 6)
        );
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

/* =========================================
   TARJETA DE PRODUCTO
========================================= */

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


/* =========================================
   MENSAJES
========================================= */

function mostrarMensajeResultado(mensaje) {
    if (!resultado) return;

    resultado.innerHTML = `
        <div class="search-result-box">
            ${mensaje}
        </div>
    `;
}


/* =========================================
   TABS DEL BUSCADOR
========================================= */

searchTabs.forEach(tab => {
    tab.addEventListener("click", function () {
        searchTabs.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const searchType = this.dataset.search;

        if (searchType === "vehicle") {
            if (vehicleSearch) {
                vehicleSearch.style.display = "grid";
            }

            if (partSearch) {
                partSearch.classList.remove("active");
                partSearch.style.display = "";
            }
        }

        if (searchType === "part") {
            if (vehicleSearch) {
                vehicleSearch.style.display = "none";
            }

            if (partSearch) {
                partSearch.classList.add("active");
                partSearch.style.display = "";
            }
        }
    });
});


/* =========================================
   EVENTOS DE BÚSQUEDA
========================================= */

buscarBtn?.addEventListener("click", buscarPorVehiculo);

partNumber?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarNumeroParte();
    }
});

searchPartBtn?.addEventListener("click", buscarNumeroParte);


/* =========================================
   CATÁLOGO DIRECTO EN PÁGINA
========================================= */

function obtenerProductosCatalogoFiltrados() {
    let lista = obtenerTodosLosProductos();

    if (catalogCategoriaActual !== "todos") {
        lista = lista.filter(producto => {
            return producto.categoria === catalogCategoriaActual;
        });
    }

    const texto = normalizarTexto(catalogTextoActual);

    if (!texto) {
        return lista;
    }

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

        return datosBuscables.some(valor => {
            return normalizarTexto(valor).includes(texto);
        });
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
        button.classList.toggle(
            "active",
            button.dataset.catalogCategory === catalogCategoriaActual
        );
    });
}

function renderizarCatalogoPrincipal() {
    if (!catalogProducts) return;

    const filtrados = obtenerProductosCatalogoFiltrados();
    const visibles = filtrados.slice(0, catalogLimite);

    catalogProducts.innerHTML = visibles
        .map(crearTarjetaCatalogoHTML)
        .join("");

    if (catalogCount) {
        catalogCount.textContent = String(filtrados.length);
    }

    if (catalogEmpty) {
        catalogEmpty.hidden = filtrados.length !== 0;
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

/* =========================================
   MODAL
========================================= */

function mostrarProductos(lista) {
    if (!modalProducts) return;

    modalProducts.innerHTML = "";

    if (!lista || lista.length === 0) {
        modalProducts.innerHTML = `
            <p>
                Actualmente no hay productos registrados en esta categoría.
            </p>
        `;
        return;
    }

    lista.forEach(producto => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = crearProductoHTML(producto);
        const card = wrapper.firstElementChild;

        if (card) {
            modalProducts.appendChild(card);
        }
    });
}

function cerrarModal() {
    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
}


/* =========================================
   CERRAR MODAL
========================================= */

modalClose?.addEventListener("click", cerrarModal);

document.querySelector(".modal-overlay")?.addEventListener(
    "click",
    cerrarModal
);

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        modal?.classList.contains("active")
    ) {
        cerrarModal();
    }
});


/* =========================================
   BUSCAR DENTRO DE UNA CATEGORÍA
========================================= */

productSearch?.addEventListener("input", function () {
    const valorBusqueda = this.value;
    const texto = normalizarTexto(valorBusqueda);

    const lista = productos[categoriaActual] || [];

    if (!texto) {
        mostrarProductos(lista);
        return;
    }

    const filtrados = lista.filter(producto => {
        const datosBuscables = [
            producto.nombre,
            producto.descripcion,
            producto.marca,
            ...convertirArray(producto.modelo),
            ...convertirArray(producto.motor),
            ...convertirArray(producto.anios),
            ...convertirArray(producto.numeroParteFord),
            ...convertirArray(producto.codigoMotorcraft),
            ...convertirArray(producto.codigoOEM),
            producto.codigoInterno,
            producto.precio,
            producto.tipo
        ];

        return datosBuscables.some(valor => {
            return normalizarTexto(valor).includes(texto);
        });
    });

    mostrarProductos(filtrados);
});


/* =========================================
   MENÚ MOBILE
========================================= */

menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("active");
    });
});


/* =========================================
   BOTÓN CONTACTO
========================================= */

contactButton?.addEventListener("click", event => {
    event.preventDefault();

    alert(
        "Gracias por contactar a PartSolutions. " +
        "Pronto podremos atender tu solicitud."
    );
});



/* =========================================
   VISOR DE IMAGEN GRANDE
   Clic en una imagen para verla ampliada.
   Incluye zoom, arrastre y cierre con ESC.
========================================= */

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
        image.style.transform =
            `translate(${imageViewerOffsetX}px, ${imageViewerOffsetY}px) scale(${imageViewerScale})`;

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

    imageViewer.querySelector(".image-lightbox-close")
        .addEventListener("click", cerrarImagenGrande);

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

document.addEventListener("click", event => {
    const image = event.target.closest(".zoomable-product-image");
    if (!image) return;

    const ruta = image.dataset.image || image.getAttribute("src");
    const nombre = image.dataset.name || image.alt || "Imagen del repuesto";

    if (ruta) abrirImagenGrande(ruta, nombre);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && imageViewer?.classList.contains("active")) {
        cerrarImagenGrande();
    }
});



/* =========================================
   CARRITO / PEDIDO PARTSOLUTIONS
   El carrito funciona como una solicitud de
   repuestos y se conserva en el navegador.
========================================= */

const NUMERO_WHATSAPP_PARTSOLUTIONS = "584122520412";
const MENSAJE_WHATSAPP_PARTSOLUTIONS =
    "SALUDOS MUY BUENAS TARDES QUIERO CONSULTAR DISPONIBILIDAD DE MI PEDIDO";

// ==========================================================
// VISUALIZACIÓN DE PRECIOS / CASHEA
// ==========================================================

const TASA_CASHEA = 859;
const TASA_DOLAR = 980;

const CASHEA_LEVEL_PERCENTAGES = {
    1: 0.60,
    2: 0.50,
    3: 0.40,
    4: 0.30,
    5: 0.25,
    6: 0.20
};

let modoPrecioActual = "contado";
let nivelCasheaActual = 6;
let carritoPedido = cargarCarritoPedido();

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
                modalidad:
                    item.modalidad === "cashea" ||
                    item.modalidad === "ambos"
                        ? item.modalidad
                        : "contado",
                nivelCashea:
                    Math.min(6, Math.max(1, Number(item.nivelCashea || 6)))
            }));
    } catch (error) {
        console.warn("No se pudo cargar el carrito.", error);
        return [];
    }
}

function guardarCarritoPedido() {
    try {
        localStorage.setItem(
            "partsolutions_carrito",
            JSON.stringify(carritoPedido)
        );
    } catch (error) {
        console.warn("No se pudo guardar el carrito.", error);
    }
}

function obtenerProductoPorId(id) {
    return obtenerTodosLosProductos().find(
        producto => String(producto.id) === String(id)
    );
}

function cantidadTotalCarrito() {
    return carritoPedido.reduce(
        (total, item) => total + Number(item.cantidad || 0),
        0
    );
}

function agregarAlPedido(id) {
    const producto = obtenerProductoPorId(id);

    if (!producto) {
        alert("No pudimos encontrar este producto.");
        return;
    }

    const existente = carritoPedido.find(
        item => String(item.id) === String(producto.id)
    );

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
    const item = carritoPedido.find(
        producto => String(producto.id) === String(id)
    );

    if (!item) return;

    item.cantidad = Math.max(0, Number(item.cantidad || 0) + Number(cambio || 0));

    if (item.cantidad <= 0) {
        carritoPedido = carritoPedido.filter(
            producto => String(producto.id) !== String(id)
        );
    }

    guardarCarritoPedido();
    actualizarCarrito();
}

function eliminarDelPedido(id) {
    carritoPedido = carritoPedido.filter(
        producto => String(producto.id) !== String(id)
    );

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
        "",
        "Detalle del pedido:",
        ""
    ];

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

    if (
        !NUMERO_WHATSAPP_PARTSOLUTIONS ||
        NUMERO_WHATSAPP_PARTSOLUTIONS === "TU_NUMERO_AQUI"
    ) {
        alert(
            "El carrito ya está funcionando. Solo falta colocar el número de WhatsApp de PartSolutions en script.js."
        );
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
    <button
        type="button"
        class="cart-floating-tab"
        data-cart-open
        aria-label="Abrir mi pedido"
    >
        <span class="cart-floating-tab-icon">🛒</span>

        <span class="cart-floating-tab-text">
            Mi pedido
        </span>

        <b
            class="cart-floating-tab-count"
            id="cartFloatingCount"
        >
            0
        </b>
    </button>

    <div
        class="cart-overlay"
        data-cart-close
    ></div>

    <div class="cart-panel">

        <div class="cart-header">

            <div>

                <span class="cart-eyebrow">
                    PARTSOLUTIONS
                </span>

                <h2>
                    Mi pedido
                </h2>

                <p>
                    Repuestos que deseas consultar.
                </p>

            </div>

            <button
                type="button"
                class="cart-close"
                data-cart-close
                aria-label="Cerrar pedido"
            >
                ×
            </button>

        </div>

        <div
            class="cart-items"
            id="cartItems"
        ></div>

        <div
            class="cart-empty"
            id="cartEmpty"
        >

            <div class="cart-empty-icon">
                🛒
            </div>

            <h3>
                Tu pedido está vacío
            </h3>

            <p>
                Agrega los repuestos que deseas consultar.
            </p>

        </div>

        <div class="cart-footer">

            <div class="cart-summary">

                <div class="cart-total-row">
                    <span>
                        Unidades
                    </span>

                    <strong id="cartTotal">
                        0
                    </strong>
                </div>

                <div
                    class="cart-total-row
                           cart-estimated-total"
                >
                    <span>
                        Total estimado
                    </span>

                    <strong id="cartEstimatedTotal">
                        $0
                    </strong>
                </div>

                <small class="cart-total-note">
                    El total es un estimado según
                    los precios publicados.
                </small>

            </div>

            <button
                type="button"
                class="cart-whatsapp"
                id="cartWhatsApp"
            >
                <span>
                    Enviar pedido por WhatsApp
                </span>

                <span>
                    →
                </span>
            </button>

            <button
                type="button"
                class="cart-clear"
                id="cartClear"
            >
                Vaciar pedido
            </button>

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

    itemsContainer.style.display = "block";
    emptyState.style.display = "none";

    let totalContado = 0;
    let totalCashea = 0;
    let totalInicialCashea = 0;
    let totalCuotasCashea = 0;
    let hayPrecioFaltante = false;

    itemsContainer.innerHTML = carritoPedido.map(item => {
        const producto = obtenerProductoPorId(item.id);
        if (!producto) return "";

        const cantidad = Math.max(1, Number(item.cantidad || 1));
        const precio = obtenerPrecioNumero(producto);
        const nivel = Math.min(6, Math.max(1, Number(item.nivelCashea || 6)));
        const modalidad = item.modalidad || "contado";
        const cashea = obtenerDetalleCashea(producto, nivel);
        const subtotalContado =
            precio !== null ? precio * cantidad : null;

        if (subtotalContado !== null) totalContado += subtotalContado;
        else hayPrecioFaltante = true;

        const subtotalCashea =
            cashea ? cashea.precioTotalCashea * cantidad : null;

        if (subtotalCashea !== null) {
            totalCashea += subtotalCashea;
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

    /* Contador del encabezado */
    const contador =
        document.getElementById("cartCount");

    if (contador) {
        contador.textContent = String(total);

        contador.classList.toggle(
            "has-items",
            total > 0
        );
    }

    /* Contador de la pestaña flotante */
    const contadorFlotante =
        document.getElementById(
            "cartFloatingCount"
        );

    if (contadorFlotante) {

        contadorFlotante.textContent =
            String(total);

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

    toast.querySelector(".cart-toast-button")?.addEventListener(
        "click",
        () => {
            toast.remove();
            abrirCarrito();
        }
    );

    setTimeout(() => {
        toast.remove();
    }, 4500);
}

document.addEventListener("click", event => {
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
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        cerrarCarrito();
    }
});

crearCarritoHTML();
actualizarCarrito();

document.getElementById("cartWhatsApp")?.addEventListener(
    "click",
    enviarPedidoWhatsApp
);

document.getElementById("cartClear")?.addEventListener(
    "click",
    vaciarPedido
);


/* =========================================
   CARRUSEL DE CATEGORÍAS
========================================= */
function inicializarCarruselCategorias() {

    const carousel = document.querySelector(
        "[data-category-carousel]"
    );

    const track = document.querySelector(
        "[data-category-track]"
    );

    const botonAnterior = document.querySelector(
        "[data-category-prev]"
    );

    const botonSiguiente = document.querySelector(
        "[data-category-next]"
    );

    if (!carousel || !track) {
        return;
    }

    if (
        carousel.dataset.carouselInitialized === "true"
    ) {
        return;
    }

    carousel.dataset.carouselInitialized = "true";

    const originales = Array.from(
        track.querySelectorAll(".category-card")
    );

    if (!originales.length) {
        carousel.dataset.carouselInitialized = "false";
        return;
    }

    /* =========================================
       DUPLICAR TARJETAS
    ========================================= */

    originales.forEach(card => {

        const clon = card.cloneNode(true);

        clon.setAttribute(
            "aria-hidden",
            "true"
        );

        clon.setAttribute(
            "tabindex",
            "-1"
        );

        track.appendChild(clon);
    });

    /* =========================================
       VARIABLES
    ========================================= */

    let pausa = false;
    let arrastre = false;

    let inicioX = 0;
    let scrollInicio = 0;

    let anchoOriginal = 0;

    let ultimoTiempo = performance.now();

    /* =========================================
       MEDIR CARRUSEL
    ========================================= */

    function medirCarrusel() {

        const primera = originales[0];
        const ultima = originales[originales.length - 1];

        if (!primera || !ultima) {
            return;
        }

        const estilos = getComputedStyle(track);

        const gap =
            parseFloat(estilos.columnGap || estilos.gap) || 0;

        anchoOriginal =
            (ultima.offsetLeft +
                ultima.offsetWidth) -
            primera.offsetLeft +
            gap;
    }

    /* =========================================
       NORMALIZAR POSICIÓN
    ========================================= */

    function normalizarCarrusel() {

        if (!anchoOriginal) {
            medirCarrusel();
        }

        if (
            carousel.scrollLeft >=
            anchoOriginal
        ) {

            carousel.scrollLeft -=
                anchoOriginal;
        }

        if (
            carousel.scrollLeft < 0
        ) {

            carousel.scrollLeft +=
                anchoOriginal;
        }
    }

    /* =========================================
       AUTO DESPLAZAMIENTO
    ========================================= */

    function animar(tiempoActual) {

        const delta = Math.min(
            32,
            tiempoActual - ultimoTiempo
        );

        ultimoTiempo = tiempoActual;

        if (
            !pausa &&
            !arrastre &&
            anchoOriginal
        ) {

            carousel.scrollLeft +=
                delta * 0.75;

            normalizarCarrusel();
        }

        requestAnimationFrame(animar);
    }

    /* =========================================
       MOVER CON LAS FLECHAS
    ========================================= */

    function moverCarrusel(direccion) {

        medirCarrusel();

        const primeraTarjeta =
            originales[0];

        if (!primeraTarjeta) {
            return;
        }

        const estilos =
            getComputedStyle(track);

        const gap =
            parseFloat(
                estilos.columnGap ||
                estilos.gap
            ) || 0;

        const anchoTarjeta =
            primeraTarjeta.getBoundingClientRect().width;

        const paso =
            anchoTarjeta + gap;

        /*
           PAUSAMOS EL AUTO MOVIMIENTO
           MIENTRAS SE USA LA FLECHA
        */

        pausa = true;

        /* =====================================
           FLECHA IZQUIERDA
           Si estamos al inicio,
           saltamos a la segunda copia.
        ===================================== */

        if (
            direccion < 0 &&
            carousel.scrollLeft < paso
        ) {

            carousel.scrollLeft =
                anchoOriginal +
                carousel.scrollLeft;
        }

        /* =====================================
           FLECHA DERECHA
           Si estamos llegando al final,
           volvemos a la primera copia.
        ===================================== */

        if (
            direccion > 0 &&
            carousel.scrollLeft >
            (
                carousel.scrollWidth -
                carousel.clientWidth -
                paso
            )
        ) {

            carousel.scrollLeft -=
                anchoOriginal;
        }

        /* =====================================
           DESPLAZAMIENTO
        ===================================== */

        carousel.scrollBy({
            left: direccion * paso,
            behavior: "smooth"
        });

        /* =====================================
           REACTIVAR AUTO CARRUSEL
        ===================================== */

        setTimeout(() => {

            normalizarCarrusel();

            pausa = false;

        }, 650);
    }

    /* =========================================
       PAUSAR AL PASAR EL MOUSE
    ========================================= */

    carousel.addEventListener(
        "mouseenter",
        () => {
            pausa = true;
        }
    );

    carousel.addEventListener(
        "mouseleave",
        () => {
            pausa = false;
        }
    );

    /* =========================================
       PAUSAR CON FOCUS
    ========================================= */

    carousel.addEventListener(
        "focusin",
        () => {
            pausa = true;
        }
    );

    carousel.addEventListener(
        "focusout",
        () => {
            pausa = false;
        }
    );

    /* =========================================
       TOUCH
    ========================================= */

    carousel.addEventListener(
        "touchstart",
        () => {
            pausa = true;
        },
        { passive: true }
    );

    carousel.addEventListener(
        "touchend",
        () => {

            setTimeout(() => {
                pausa = false;
            }, 1200);

        },
        { passive: true }
    );

    /* =========================================
       ARRASTRE CON MOUSE / POINTER
    ========================================= */

    carousel.addEventListener(
        "pointerdown",
        event => {

            if (
                event.pointerType === "mouse" &&
                event.button !== 0
            ) {
                return;
            }

            arrastre = true;

            inicioX = event.clientX;

            scrollInicio =
                carousel.scrollLeft;

            carousel.classList.add(
                "is-dragging"
            );
        }
    );

    window.addEventListener(
        "pointermove",
        event => {

            if (!arrastre) {
                return;
            }

            carousel.scrollLeft =
                scrollInicio -
                (
                    event.clientX -
                    inicioX
                );

            normalizarCarrusel();
        }
    );

    window.addEventListener(
        "pointerup",
        () => {

            if (!arrastre) {
                return;
            }

            arrastre = false;

            carousel.classList.remove(
                "is-dragging"
            );

            pausa = false;
        }
    );

    /* =========================================
       ABRIR CATEGORÍA AL HACER CLIC
    ========================================= */

    carousel.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    "[data-category]"
                );

            if (!card) {
                return;
            }

            /*
               Evita abrir una categoría
               cuando realmente fue un arrastre.
            */

            if (
                Math.abs(
                    carousel.scrollLeft -
                    scrollInicio
                ) > 8
            ) {
                return;
            }

            const categoria =
                card.dataset.category;

            if (
                categoria &&
                typeof abrirCategoria === "function"
            ) {

                abrirCategoria(categoria);
            }
        }
    );

    /* =========================================
       BOTÓN ANTERIOR
    ========================================= */

    botonAnterior?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            moverCarrusel(-1);
        }
    );

    /* =========================================
       BOTÓN SIGUIENTE
    ========================================= */

    botonSiguiente?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            moverCarrusel(1);
        }
    );

    /* =========================================
       RESPONSIVE
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            medirCarrusel();
            normalizarCarrusel();
        }
    );

    /* =========================================
       INICIO
    ========================================= */

    setTimeout(() => {

        medirCarrusel();

        requestAnimationFrame(
            animar
        );

    }, 300);
}
/* =========================================================
   FICHA COMPLETA DEL PRODUCTO
========================================================= */

let productDetailModal = null;

function crearFichaProducto() {

    if (productDetailModal) {
        return productDetailModal;
    }

    productDetailModal =
        document.createElement("div");

    productDetailModal.className =
        "product-detail-modal";

    productDetailModal.setAttribute(
        "aria-hidden",
        "true"
    );

    productDetailModal.innerHTML = `

        <div
            class="product-detail-overlay"
            data-product-detail-close
        ></div>

        <div class="product-detail-dialog">

            <button
                type="button"
                class="product-detail-close"
                data-product-detail-close
                aria-label="Cerrar"
            >
                ×
            </button>

            <div
                class="product-detail-content"
                id="productDetailContent"
            ></div>

        </div>
    `;

    document.body.appendChild(
        productDetailModal
    );

    return productDetailModal;
}


function abrirFichaProducto(id) {

    const producto =
        obtenerProductoPorId(id);

    if (!producto) {
        return;
    }

    const modal =
        crearFichaProducto();

    const contenido =
        modal.querySelector(
            "#productDetailContent"
        );

    const ford =
        obtenerEtiquetas(
            producto.numeroParteFord
        );

    const motorcraft =
        obtenerEtiquetas(
            producto.codigoMotorcraft
        );

    const oem =
        obtenerEtiquetas(
            producto.codigoOEM
        );

    const categoriaProducto =
        obtenerNombreCategoria(
            producto.categoria
        );

    contenido.innerHTML = `

        <div class="product-detail-image">

            <img
                src="${escaparHTML(producto.imagen)}"
                alt="${escaparHTML(producto.nombre)}"
                class="zoomable-product-image"
                data-image="${escaparHTML(producto.imagen)}"
                data-name="${escaparHTML(producto.nombre)}"
            >

        </div>


        <div class="product-detail-info">

            <span class="product-detail-eyebrow">
                PARTSOLUTIONS
            </span>

            <h2>
                ${escaparHTML(producto.nombre)}
            </h2>

            <p class="product-detail-description">
                ${escaparHTML(producto.descripcion)}
            </p>


            <div class="product-detail-status">

                <span class="${
                    producto.disponibilidad
                        ? "available"
                        : "unavailable"
                }">

                    ${
                        producto.disponibilidad
                            ? "● Disponible"
                            : "● Consultar disponibilidad"
                    }

                </span>

            </div>


            <div class="product-detail-grid">

                <div>
                    <small>Marca</small>
                    <strong>
                        ${escaparHTML(
                            producto.marca
                        )}
                    </strong>
                </div>

                <div>
                    <small>Categoría</small>
                    <strong>
                        ${escaparHTML(
                            categoriaProducto
                        )}
                    </strong>
                </div>

                <div>
                    <small>Modelo</small>
                    <strong>
                        ${escaparHTML(
                            obtenerEtiquetas(
                                producto.modelo
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <small>Motor</small>
                    <strong>
                        ${escaparHTML(
                            obtenerEtiquetas(
                                producto.motor
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <small>Años</small>
                    <strong>
                        ${escaparHTML(
                            obtenerEtiquetas(
                                producto.anios
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <small>Código PartSolutions</small>
                    <strong>
                        ${escaparHTML(
                            producto.codigoInterno ||
                            producto.id
                        )}
                    </strong>
                </div>

            </div>


            <div class="product-detail-codes">

                ${
                    ford
                        ? `
                            <div>
                                <span>Número de parte Ford</span>
                                <strong>
                                    ${escaparHTML(ford)}
                                </strong>
                            </div>
                        `
                        : ""
                }

                ${
                    motorcraft
                        ? `
                            <div>
                                <span>Motorcraft</span>
                                <strong>
                                    ${escaparHTML(
                                        motorcraft
                                    )}
                                </strong>
                            </div>
                        `
                        : ""
                }

                ${
                    oem
                        ? `
                            <div>
                                <span>OEM</span>
                                <strong>
                                    ${escaparHTML(oem)}
                                </strong>
                            </div>
                        `
                        : ""
                }

            </div>


            <div class="product-detail-price">

                <span>Precio</span>

                <strong>
                    ${escaparHTML(
                        formatearPrecio(producto)
                    )}
                </strong>

            </div>


            <div class="product-detail-actions">

                <button
                    type="button"
                    class="product-detail-cart"
                    data-detail-cart="${escaparHTML(
                        producto.id
                    )}"
                >
                    🛒 Agregar al pedido
                </button>

                <button
                    type="button"
                    class="product-detail-whatsapp"
                    data-detail-whatsapp="${escaparHTML(
                        producto.id
                    )}"
                >
                    Consultar por WhatsApp
                </button>

            </div>

        </div>
    `;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function cerrarFichaProducto() {

    if (!productDetailModal) {
        return;
    }

    productDetailModal.classList.remove(
        "active"
    );

    productDetailModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}
document.addEventListener(
    "click",
    event => {

        const detalle =
            event.target.closest(
                "[data-product-detail]"
            );

        if (detalle) {

            abrirFichaProducto(
                detalle.dataset.productDetail
            );

            return;
        }


        const cerrar =
            event.target.closest(
                "[data-product-detail-close]"
            );

        if (cerrar) {

            cerrarFichaProducto();

            return;
        }


        const agregar =
            event.target.closest(
                "[data-detail-cart]"
            );

        if (agregar) {

            agregarAlPedido(
                agregar.dataset.detailCart
            );

            return;
        }


        const consultar =
            event.target.closest(
                "[data-detail-whatsapp]"
            );

        if (consultar) {

            const producto =
                obtenerProductoPorId(
                    consultar.dataset.detailWhatsapp
                );

            if (producto) {

                const mensaje =
                    encodeURIComponent(
                        `${MENSAJE_WHATSAPP_PARTSOLUTIONS}\n\n` +
                        `Deseo consultar el repuesto:\n\n` +
                        `${producto.nombre}\n` +
                        `Código: ${
                            producto.codigoInterno ||
                            producto.id
                        }\n` +
                        `Número Ford: ${
                            obtenerEtiquetas(
                                producto.numeroParteFord
                            ) || "Consultar"
                        }`
                    );

                const numero =
                    NUMERO_WHATSAPP_PARTSOLUTIONS
                        .replace(/\D/g, "");

                if (
                    numero &&
                    NUMERO_WHATSAPP_PARTSOLUTIONS !==
                        "TU_NUMERO_AQUI"
                ) {

                    window.open(
                        `https://wa.me/${numero}?text=${mensaje}`,
                        "_blank",
                        "noopener,noreferrer"
                    );

                } else {

                    alert(
                        "Coloca primero el número de WhatsApp de PartSolutions en script.js."
                    );
                }
            }
        }
    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productDetailModal?.classList.contains(
                "active"
            )
        ) {

            cerrarFichaProducto();
        }
    }
);
/* =========================================
   INICIALIZACIÓN
========================================= */

async function inicializar() {

    resetSelect(
        modelo,
        "Selecciona un modelo"
    );

    resetSelect(
        motor,
        "Selecciona un motor"
    );

    resetSelect(
        ano,
        "Selecciona un año"
    );

    resetSelect(
        categoria,
        "Selecciona una categoría"
    );

    /*
       Cargamos primero el catálogo maestro.
       De esta manera Modelo → Motor → Año
       se construyen directamente desde los
       productos reales del Excel.
    */
    try {

        const total =
            await cargarCatalogoDesdeExcel();

        console.info(
            `Catálogo listo: ${total} productos.`
        );

        cargarMarcas();
        cargarCategorias();
        actualizarConteosCategorias();
        renderizarCatalogoPrincipal();

    } catch (error) {

        console.error(
            "Error cargando Excel:",
            error
        );

        cargarMarcas();
        cargarCategorias();
        renderizarCatalogoPrincipal();

        mostrarMensajeResultado(
            `
                <strong>
                    ⚠️ No se pudo cargar el catálogo.
                </strong>

                <br><br>

                Verifica que:

                <strong>
                    ${ARCHIVO_CATALOGO_EXCEL}
                </strong>

                esté en la misma carpeta que
                <strong>index.html</strong>.

                <br><br>

                También debes abrir el proyecto
                mediante <strong>Live Server</strong>.

                <br><br>

                Detalle:

                ${escaparHTML(
                    error.message
                )}
            `
        );
    }

    /*
       Selector de modalidad de precios.
    */
    inicializarSelectorPrecios();

    /*
       El carrusel se inicializa después de que
       el DOM ya contiene sus 10 categorías.
    */
    inicializarCarruselCategorias();
}


/* =========================================
   EXPONER FUNCIONES PARA HTML INLINE
========================================= */

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

/* =========================================
   ARRANQUE DE LA PÁGINA
   Ejecutamos la inicialización cuando el DOM
   ya está completamente disponible.
========================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    inicializar();
}

