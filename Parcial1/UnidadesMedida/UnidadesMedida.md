# Unidades de Medida de CSS  
En **CSS** existen las unidades de medida, las cuales utilizamos para definir el tamaño de los elementos y para las propiedades de estos mismos.

Existen varios tipos de unidades de medida que se pueden emplear de acuerdo a diferentes consideraciones y tipos de propiedades.

| Tipo de Unidad | Unidades | Descripción |
| -------------- | -------- | ----------- |
| Unidades Absolutas | px, cm, mm, Q, in, pt, pc | Unidades estáticas o de tamaño fijo |
| Unidades Relativas | %, em, rem, ex, rex, cap, rcap, ch, rch, ic, ric, lh, rlh | Unidades que dependen de otros factores |
| Unidades Relativas al Viewport | vw, vh, vmin, vmax, vi, vb | Unidades basadas en la región visible del navegador |
| | svw, svh, svmin, svmax, svi, svb | Idem, en pantallas pequeñas (small viewport) |
| | lvw, lvh, lvmin, lvmax, lvi, lvb | Idem, en pantallas grandes (large viewport) |
| | dvw, dvh, dvmin, dvmax, dvi, dvb | Idem, en pantallas dinámicas (dynamic viewport) |
| Unidades Relativas al Contenedor | cqw, cqh, cqmin, cqmax, cqi, cqb | Unidades basadas en un contenedor padre específico |
| Unidades Relativas al Grid | fr | Unidad basada en la fracción restante (sólo para grids) |
| Unidades de Dirección | deg, grad, rad, turn | Unidades para indicar una dirección |
| Unidades de Duración | s, ms | Unidades para indicar un tiempo concreto |
| Unidades de Frecuencia | hz, khz | Unidades para indicar una frecencia |
| Unidades de Resolución | dpi, dpcm, dppx | Unidades para indicar resoluciones |


## Unidades absolutas
Este tipo de unidad no cambia, ya que no depende de ningún otro factor.

| Unidad | Significado | Medida Aproximada |
| --- | --- | --- |
| px | Píxel | - |
| pt | Puntos | 96px / 72 ~= 1.33px |
| in | Pulgadas | 96px |
| cm | Centímetros | 96px / 2.54 ~= 37.79px |
| pc | Picas | 96px / 6 ~= 16px |
| mm | Milímetros | 96px / 25.4 ~= 3.78px |
| Q | Cuarto de mm | 96px / 6.35 ~= 15.12px |


## Unidades Relativas
Las unidades relativas, al contrario que las unidades absolutas, dependen de algún otro factor (elemento padre, tamaño de letra, etc...).

| Unidad | Medida Aproximada | Ejemplo |
| --- | --- | --- |
| % | Relativa a herencia (concretamente al elemento padre) | 50% = mitad del padre |
| em / rem | Relativo al font-size en ese elemento | 1.5em = 1.5*16px = 24px |
| ex / rex | Relativo a la altura del carácter x en minúscula | 1ex ~ 0.5em |
| ch, rch | Relativo al ancho del carácter 0 | 1ch ~ 1 carácter |
| cap / rcap | Relativo a la altura del primer carácter en mayúscula | - |
| ic / ric | Relativo al ancho del glifo 水 CJK (Chino-Japones-Koreano) | - |
| lh / rlh | Relativo al line-height en ese elemento | - |

## Unidades Relativas al Viewport
Cada vez que se hace referencia a una unidad precedida por v se hace referencia a un % del tamaño total de la ventana del navegador.

| Unidad | Significado | Medida Aproximada |
| --- | --- | --- |
| vw | Viewport Width | 1vw = 1% del ancho del navegador |
| vh | Viewport Height | 1vh = 1% del alto del navegador |
| vmin | Viewport Minimum | 1vmin = 1% del alto o ancho (el mínimo) |
| vmax | Viewport maximum | 1vmax = 1% del alto o ancho (el máximo) |
| vi | Viewport Inline | Versión lógica de vw y/o vh |
| vb | Viewport Block | Versión lógica en bloque de vw y/o vh |

### Unidades de Viewport Variables

#### **Nota: S = Small, L = Large, D = Dynamic**

| Unidad | Significado | Medida Aproximada |
| --- | --- | --- |
| svw / lvw / dvw | Viewport Width | Relativo al ancho del navegador |
| svmin / lvmin / dvmin | Viewport Minimum | Relativo al valor más pequeño entre el alto y el ancho |
| svmax / lvmax / dvmax | Viewport Maximum | elativo al valor más grande entre el alto y el ancho |
| svi / lvi / dvi | Viewport Inline | Versión lógica inline de *vw y/o *vh |
| svb / lvb / dvb | Viewport Block | Versión lógica en bloque de *vw y/o *vh |

## Unidades de Dirección

| Grados | Gradianes | Radianes | Giro |
| --- | --- | --- | --- |
| 0 ó 360deg | 0 ó 400grad | 0 ó 6rad | 0 ó 1turn |
| 45deg | 50grad | 0.78rad (π/4) | 0.125turn |
| 90deg | 100grad | 1.57rad (π/2) | 0.250turn |
| 145deg | 150grad | 2.35rad | 0.375turn |
| 180deg | 200grad | 3.14rad (π) | 0.5turn |
| 215deg | 250grad | 3.92rad | 0.625turn |
| 270deg | 300grad | 4.71rad (2π) | 0.75turn |
| 325deg | 350grad | 5.49rad | 0.875turn |


## Unidades de contenedores

| Unidad | Descripción |
| ------ | ----------- |
| cqw | Container Query Width. Porcentaje relativo al ancho del contenedor |
| cqh | Container Query Height. Porcentaje relativo al alto del contenedor |
| cqi | Container Query Inline Size. Porcentaje relativo al tamaño en línea |
| cqb | Container Query Block Size. Porcentaje relativo al tamaño de bloque |
| cqmin | Container Query Mínimo. Valor más pequeño entre cqi y cqb |
| cqmax | Container Query Máximo. Valor más alto entre cqi y cqb |