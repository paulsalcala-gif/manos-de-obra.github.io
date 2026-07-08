# Manos de Obra V1.0

Calculadora de cotizaciones para artistas y artesanos.

## Qué incluye

- Inicio con productos iniciales: pulseras, collares, aretes, anillos, llaveros, arcilla y dibujos.
- Insumos editables con costo unitario automático.
- Configuración editable: mano de obra, merma, desgaste, luz, empaque, márgenes y mayoreo.
- Calculadora por producto con materiales usados, tiempo, dificultad, empaque y mayoreo.
- Resultado con costo real, precio mínimo, recomendado, premium y mayoreo.
- Mensaje listo para copiar y mandar por WhatsApp.
- Historial de cotizaciones.
- Exportar e importar respaldo JSON.
- Manifest y service worker para usar como PWA cuando esté publicada en hosting HTTPS.

## Cómo probar en computadora

1. Descomprime el ZIP.
2. Abre `index.html` en Google Chrome.
3. Prueba agregar insumos, cambiar configuración y generar cotizaciones.

## Cómo instalar en Android

Para que Android permita instalarla como app, lo ideal es subir la carpeta a un hosting HTTPS como Netlify, Vercel o GitHub Pages.

Luego:

1. Abre el link desde Chrome en Android.
2. Toca el menú de Chrome.
3. Elige “Agregar a pantalla principal” o “Instalar app”.

## Nota

Esta V1 guarda datos en el dispositivo usando `localStorage`. Si borras datos del navegador, se pierde la información. Usa “Exportar respaldo JSON” desde Configuración para guardar copia.
