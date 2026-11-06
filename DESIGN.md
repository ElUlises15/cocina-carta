# Dirección visual

Lectura aplicada: anti-generico, frontend-design, web-review y kit gastro de `/workspace/webteam/`. Público: comensales ya sentados y personal de cocina. Tarea principal: elegir platos y mandar una comanda con mesa.

Gesto: una pizarra verde manuscrita junto al plato y una tira de mantel a cuadros. La carta utiliza fotos y precios visibles, con comanda lateral en papel. Sin apariencia de delivery.

Paleta: verde pizarra #263f35, papel #faf7ee, rojo mantel #a64032, tinta #2d382f, secundario #77796b, línea #deddd1. Caveat para marca y titulares de pizarra, DM Sans para lectura y controles. Escala: titular 76/69 px; carta 35/32; cuerpo 14; notas 11–12. Contenido máximo 1320 px.

Desktop: cabecera, hero dividido, tira de mantel, categorías y tres platos con comanda lateral, cocina y cierre. Móvil 390: hero apilado, categorías horizontales, platos en dos columnas y comanda debajo. Cocina en tres columnas en desktop, una en móvil.

Referencias conceptuales A/B/C (sin reutilizar assets ni código):
- A composición de carta y fotografía: https://www.lafuerza.com.ar/ — lenguaje de bar y comida de barrio.
- B tipografía manuscrita: https://fonts.google.com/specimen/Caveat — trazo de anotación de pizarra.
- C interacción de pedido: https://www.nngroup.com/articles/shopping-cart/ — selección revisable antes de confirmar.

## Imágenes y prompts finales

Herramienta: imagegen integrada, cinco llamadas independientes. Prefijo común: «Use case: photorealistic-natural. Asset type: restaurant website photo.»

- `public/assets/hero-plato.png`: Wide editorial food photograph of Argentine milanesa napolitana with melted cheese and tomato sauce, golden french fries on white oval plate, rustic restaurant table with red white checkered tablecloth, warm natural window light, close overhead three-quarter angle, homey Buenos Aires bodegon, no text no logos.
- `public/assets/milanesa.png`: Editorial food photograph Argentine milanesa napolitana and french fries on white plate, red white checkered cloth, rustic Buenos Aires bodegon, appetizing natural light, close up, no text.
- `public/assets/pasta.png`: Editorial food photograph homemade ricotta ravioli with rich tomato sauce and grated parmesan in white ceramic bowl on rustic table with red white checked napkin, Buenos Aires bodegon, natural warm light, no text.
- `public/assets/postre.png`: Editorial food photograph flan casero with caramel and generous dulce de leche and cream on small white plate, rustic table, warm Buenos Aires bodegon natural light, no text.
- `public/assets/cocina.png`: Editorial photograph cozy traditional Argentine neighborhood restaurant kitchen, stainless pots, wooden shelves, cook's hands rolling fresh pasta on flour dusted counter, warm window light, no text no logos.
