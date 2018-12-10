# Simple Paint

Para esta prueba me he decidido por React ya que es una plataforma consolidada, con una de las comunidades más grandes y activas, y con un gran soporte. También por la fácil componentización, organización de paquetes y la facilidad para seguir principios SOLID u otros diseños de desarrollo en Javascript.

A continuación comentaré mis decisiones en cada fase del proyecto.

## Programación - React
Aunque he explicado antes las razones por las que he escogido React, la mayor motivación para usar este framework ha sido aprender su funcionamiento para mejorar mis habilidades. Los puntos que me gustaría comentar son:

###### React-Konva
He optado por usar React-Konva por la componentización de elementos que ofrece, *The React Way* para justificarlo de manera sencilla. 
El problema con el que me he encontrado es que para dibujar no es la opción más óptima/visual ya que usa un array de lineas rectas para formar una sola línea, que destaca mucho cuanto más gruesa es. 

###### Las funciones para dibujar, lines y linesConfig
Para ser honesto, las funciones para dibujar lineas (handleMouseDown, handleMouseMove y handleMouseUp) las encontré en StackOverflow y me parecieron la solución que buscaba ya que usan componentización además de ser una buena base para empezar. 


Hice linesConfig para testear las caracteristicas de cada linea (color, width) y ver si se aplicaba, con la idea de deshacerme de linesConfig y modificar lines como un array de objetos con las caracteristicas incluidas. Pero a medida que modificaba las funciones me daba cuenta que aún sabiendo lo que quería hacer se me hacía muy compleja la lectura del código, por lo que he preferido quedarme con esta solución.

## UI & UX

Sobre el diseño no puedo comentar mucho, en este tipo de casos me gusta experimentar con diferentes formas de presentar el contenido y con diferentes colores; al ser un clon del Paint he preferido ceñirme a una paleta de sencilla de azul, gris y blanca y en el caso de añadir más herramientas que sea tan fácil como añadir el elemento a Tools con su correspondiente CSS.

Y aún siendo la experiencia de usuario algo crítico en cualquier proyecto, no le he dado la prioridad que se merece para no tardar demasiado en entregar esta prueba.

## Testing - Jest & Enzyme
Poco después de empezar el proyecto descubrí que create-react-app venía con Jest incluido y se usa junto a Enzyme, pero como no tengo experiencia con las herramientas de testing he preferido hacer tests sencillos para App (solamente render) y Canvas (render con el evento click). 

## Comentarios
Hay algunos puntos más que me gustaría comentar pero por no hacer esto demasiado largo me he ceñido a lo importante, si tenéis alguna duda o pregunta estaría encantado de responderla.
