# Mensajes de Agradecimiento para Antonio - Comunidad Endeavor España

Página web interactiva que muestra mensajes de agradecimiento cargados directamente desde un archivo Excel.

## Estructura de Archivos

```
Regalo Antonio/
├── index.html              # Página principal
├── styles.css              # Estilos y diseño responsive
├── script.js               # Lógica de carga de Excel e interactividad
├── Mensajes_Antonio.xlsx   # Archivo Excel con los mensajes
└── README.md               # Este archivo
```

## Características

- **Carga dinámica de Excel**: Lee el archivo Excel directamente desde el navegador usando SheetJS
- **Diseño responsive**: Se adapta perfectamente a móvil, tablet y desktop
- **Selector inteligente**: Dropdown alfabético para navegar rápidamente entre mensajes
- **Animaciones suaves**: Transiciones elegantes y scroll animado
- **Colores Endeavor**: Diseño corporativo con azules característicos
- **Manejo de errores**: Mensajes informativos si hay problemas de carga
- **Formato simplificado**: Solo necesita 3 columnas (Nombre, Apellido, Mensaje)

## Requisitos del Archivo Excel

El archivo `Mensajes_Antonio.xlsx` debe tener **únicamente** las siguientes columnas:

| Columna  | Descripción                   | Requerido |
|----------|-------------------------------|-----------|
| Nombre   | Nombre de la persona          | Sí        |
| Apellido | Apellido de la persona        | Sí        |
| Mensaje  | Mensaje de agradecimiento     | Sí        |

**Notas importantes:**
- El archivo debe llamarse exactamente `Mensajes_Antonio.xlsx` y estar en la misma carpeta que `index.html`
- El código también acepta nombres de columnas en inglés: `name`, `surname`, `message`
- Solo se mostrarán las filas que tengan un mensaje (no vacío)
- Los mensajes se ordenan alfabéticamente por nombre completo

## Uso Local

1. Asegúrate de tener todos los archivos en la misma carpeta
2. Coloca tu archivo `Mensajes-Antonio.xlsx` en la carpeta raíz
3. Abre `index.html` en tu navegador

**Nota**: Debido a restricciones CORS, necesitarás usar un servidor local:

```bash
# Opción 1: Python 3
python3 -m http.server 8000

# Opción 2: Node.js (npx)
npx serve

# Opción 3: PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Instala Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Desde la carpeta del proyecto, ejecuta:
   ```bash
   vercel
   ```
4. Sigue las instrucciones en pantalla
5. El archivo Excel se subirá automáticamente con el resto de archivos

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos (incluyendo el Excel)
3. Ve a Settings > Pages
4. Selecciona la rama `main` como fuente
5. Guarda y espera unos minutos
6. Tu página estará disponible en `https://tu-usuario.github.io/nombre-repo`

## Despliegue en Netlify

### Opción A: Drag & Drop
1. Ve a [Netlify](https://www.netlify.com)
2. Arrastra la carpeta completa a la zona de "Deploy"
3. ¡Listo!

### Opción B: Git
1. Sube tu proyecto a GitHub
2. Conecta Netlify con tu repositorio
3. Netlify se encargará del despliegue automático

## Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --endeavor-blue: #0052CC;
    --endeavor-blue-dark: #2C5AA0;
    --endeavor-blue-light: #4C9AFF;
}
```

### Cambiar Textos
Edita `index.html`:
- Línea 7: Título de la página
- Línea 13: Título principal
- Línea 14: Subtítulo
- Línea 49: Mensaje del footer

## Solución de Problemas

### El Excel no carga
- Verifica que el archivo se llame exactamente `Mensajes_Antonio.xlsx`
- Asegúrate de estar usando un servidor local (no abrir el HTML directamente)
- Revisa la consola del navegador (F12) para ver errores específicos

### Las columnas del Excel no se reconocen
- Verifica que las columnas se llamen exactamente `Nombre`, `Apellido` y `Mensaje`
- También puedes usar los nombres en inglés: `name`, `surname`, `message`
- Asegúrate de que las columnas tengan exactamente estos nombres (mayúsculas/minúsculas importan)

### Errores de CORS
- No abras `index.html` directamente desde el sistema de archivos
- Usa uno de los métodos de servidor local mencionados arriba
- Al desplegar en Vercel/Netlify/GitHub Pages no tendrás este problema

## Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- [SheetJS](https://sheetjs.com/) - Lectura de archivos Excel
- Fetch API - Carga de archivos

## Soporte de Navegadores

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Navegadores móviles modernos

---

Creado con ❤️ para la Comunidad Endeavor España
