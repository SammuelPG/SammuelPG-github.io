# Portfolio Personal

Portfolio web moderno y elegante creado para mostrar proyectos, habilidades y experiencia profesional.

## 🌟 Características

- **Diseño Moderno y Premium**: Gradientes vibrantes, efectos glassmorphism y animaciones suaves
- **Integración con GitHub API**: Muestra automáticamente tus repositorios públicos
- **Totalmente Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Navegación Fluida**: Scroll suave y navegación sticky
- **SEO Optimizado**: Meta tags y estructura semántica HTML5
- **Compatible con GitHub Pages**: Sin necesidad de build process

## 📁 Estructura del Proyecto

```
portfolio/
│
├── index.html          # Estructura principal HTML
├── styles.css          # Estilos y diseño
├── script.js           # JavaScript e integración GitHub API
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Ver Localmente

1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador web
3. ¡Listo! El portfolio debería funcionar perfectamente

### Opción 2: Publicar en GitHub Pages

1. Crea un nuevo repositorio en GitHub con el nombre `tu-usuario.github.io`
2. Sube todos los archivos del portfolio al repositorio
3. Ve a Settings → Pages en tu repositorio
4. Selecciona la rama `main` como fuente
5. Tu portfolio estará disponible en `https://tu-usuario.github.io`

## ⚙️ Personalización

### 1. Información Personal

Edita `index.html` y actualiza:
- Tu nombre (línea ~44)
- Tu título profesional (línea ~47)
- Descripción personal (líneas ~50-53)
- Cualidades personales (sección About)
- Información de contacto (sección Contact)

### 2. Habilidades

En `index.html`, sección Skills (líneas ~115-180), actualiza las habilidades según tu experiencia:
- Front-End
- Back-End
- Bases de Datos
- Herramientas & DevOps

### 3. GitHub Username

Para mostrar tus proyectos automáticamente:
1. Abre el portfolio en el navegador
2. Ingresa tu username de GitHub en el campo de texto
3. Haz clic en "Cargar Proyectos"
4. Tus repositorios públicos se mostrarán automáticamente

**Opcional**: Puedes pre-configurar tu username editando `index.html` línea ~189:
```html
<input 
    type="text" 
    id="githubUsername" 
    placeholder="Ej: octocat"
    value="TU-USERNAME-AQUI"
>
```

### 4. Colores y Tema

Edita las variables CSS en `styles.css` (líneas 5-50) para cambiar:
- Gradientes de colores
- Paleta de colores
- Espaciados
- Tipografía
- Efectos y sombras

### 5. Enlaces Sociales

En `index.html`, sección Contact (líneas ~245-285), actualiza:
- Email
- LinkedIn
- GitHub
- Twitter/X
- Ubicación

## 🎨 Características de Diseño

- **Paleta de Colores**: Esquema dark mode con gradientes púrpura/azul
- **Tipografía**: Inter (texto) y Outfit (títulos) de Google Fonts
- **Efectos**: Glassmorphism, blur, sombras y animaciones on-scroll
- **Animaciones**: Fade-in, hover effects, y floating orbs en el hero

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- GitHub REST API v3

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🌐 Compatibilidad de Navegadores

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Opera

## 📝 Licencia

Este proyecto es de uso libre. Siéntete libre de usarlo, modificarlo y compartirlo.

## 🤝 Contribuciones

¡Las contribuciones, issues y sugerencias son bienvenidas!

## 📧 Contacto

Si tienes preguntas o sugerencias, puedes contactarme a través de los enlaces en el portfolio.

---

**Hecho con ❤️ y JavaScript**
