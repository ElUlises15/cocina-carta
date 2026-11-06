# Entrega · Cocina Carta

- [x] Carta pública por categoría, favoritos, fotos y precios ARS.
- [x] Carrito editable, mesa obligatoria 1–99, notas y envío.
- [x] Tablero de cocina: nuevo, preparando, listo, pagado y finalizado; archivo de finalizados.
- [x] Seguimiento en carta y actualización cada 5 segundos.
- [x] Node en puerto 3851 y SQLite persistente; precios calculados por servidor.
- [x] Frontend exportable para Pages y fallback localStorage verificado.
- [x] Cinco fotos PNG generadas e integradas; prompts en DESIGN.md.
- [x] Diseño responsive con pizarra, tipografía manuscrita y mantel a cuadros.
- [x] noindex HTML y cabecera del servidor; favicon, descripción, idioma es-AR.
- [x] README con ejecución, API, Pages y límites de la demo.
- [x] Sin push ni publicación.

## Validación ejecutada

`npm test`: 2 pruebas aprobadas; ciclo de pedido, cobro, cierre, validación de mesa, cantidades y estado, precio calculado por servidor. Base aislada temporal.

`npm run build`: frontend generado en dist.

`node tests/browser.cjs`: recorrido real en Chromium: agregar plato → mesa → enviar → preparar → listo → cobrar → finalizar. Sin errores JavaScript ni imágenes rotas. Sin desborde horizontal a 390 px. Capturas revisadas en 1280 y 390 px: `test-results/desktop.png`, `mobile.png`, `kitchen.png`.

`node tests/fallback.cjs`: API ausente simulada; creación de pedido local, recarga, actualización desde cocina y persistencia localStorage aprobadas.

Se corrigió el ancho mínimo del grid que provocaba desborde móvil. Campos con labels, controles con nombres accesibles, foco visible, enlace de salto y respeto por reduced-motion revisados en código. No se realizó una auditoría completa con lector de pantalla.

## Límites explícitos

Datos de carta y fotos ilustrativos. Cocina/API sin autenticación: demo o red de confianza; agregar acceso protegido antes de uso público real. Pages estático guarda pedidos solo en el navegador; el backend Node comparte pedidos en SQLite. No se configuró un dominio ni un despliegue. No se integra un proveedor de pagos.
