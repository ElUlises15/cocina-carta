# Cocina Carta · Lo de Mabel

Carta digital y tablero de cocina para un bodegón. Demo funcional en español rioplatense con diseño de pizarra y mantel a cuadros. Platos, precios y fotos son contenido ilustrativo, no información comercial confirmada.

## Ejecutar

Requiere Node 22.13+ (probado con Node 24). SQLite usa `node:sqlite`; no requiere instalar un servidor de base de datos.

```sh
npm install
npm start
```

Carta: http://localhost:3851 · Cocina: http://localhost:3851/#cocina.
`PORT` permite cambiar el puerto; `DB_PATH` cambia el archivo SQLite (por defecto `data/cocina.sqlite`). Se crea automáticamente. Para conservar pedidos, respaldar el directorio `data` con el proceso detenido.

## Cómo funciona

Elegí una categoría, sumá platos, ajustá cantidades, ingresá la mesa (1–99) y enviá el pedido. Podés agregar una nota. El carrito y la mesa sobreviven a una recarga. El pedido enviado aparece en cocina y su estado se actualiza en la carta cada 5 segundos.

En Cocina: nuevo → preparando → listo. Se puede marcar pagado y finalizar una vez listo y cobrado. El filtro «Ver finalizados» muestra el archivo de pedidos. Las notas se muestran como texto seguro. El servidor valida cantidades y calcula los precios desde su catálogo.

El tablero es una herramienta de demostración sin autenticación. Para operar públicamente con pedidos reales hace falta proteger las rutas de cocina y administración con autenticación y autorización. `noindex` no restringe acceso.

## Frontend en Pages

```sh
npm run build
```

Publicar `dist/` como sitio estático en Pages; todas las rutas de assets son relativas, compatibles con subdirectorios. También se puede servir `public/` directamente. No se publicó ningún sitio en esta entrega.

Si no existe `/api/orders`, el frontend entra en modo demo con localStorage. Los pedidos se comparten entre pestañas del mismo origen y navegador; no entre dispositivos. Una falla posterior de un servidor conectado se informa como error y permite reintentar; no se simula un envío exitoso. Para pedidos compartidos entre dispositivos, ejecutar el servidor Node y acceder a su origen. La demo local y SQLite mantienen sus pedidos separados.

## API

- `GET /api/menu`: catálogo.
- `GET /api/orders`: pedidos ordenados por fecha.
- `POST /api/orders`: `{ "table_number": 4, "items": [{ "id": "milanesa", "quantity": 2 }], "notes": "Sin sal" }`.
- `PATCH /api/orders/:id`: campos `status` (`nuevo`, `preparando`, `listo`), `paid` y `done` (booleanos).

Editar platos y precios en `public/menu.js`. Montos en pesos argentinos enteros. No hay cobro electrónico: «pagado» registra un cobro realizado en el local.

## Verificación

```sh
npm test
npm run build
# Con npm start en otra terminal y Chromium instalado:
npx playwright install chromium
node tests/browser.cjs
node tests/fallback.cjs
```

`npm test` usa una base temporal aislada y el puerto 3852. Los tests de navegador usan 3851 y crean pedidos de prueba. Capturas en `test-results/`. Meta noindex en HTML y cabecera `X-Robots-Tag` en Node. Las fuentes tienen fallback si no hay red.

## Imágenes

Cinco imágenes generadas con la herramienta integrada imagegen, optimizadas en PNG y guardadas en `public/assets/`: `hero-plato.png`, `milanesa.png`, `pasta.png`, `postre.png`, `cocina.png`. Prompts y decisiones visuales en `DESIGN.md`. Son escenas ilustrativas generadas, no fotos documentales del restaurante.
