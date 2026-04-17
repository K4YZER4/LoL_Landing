# ØRBIT#0B1T Portfolio - React Frontend

## Estructura del Proyecto

```
frontend/
├── public/
│   └── assets/          # Imágenes, videos y otros archivos estáticos
├── src/
│   ├── components/      # Componentes React modulares
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── CurrentElo.jsx
│   │   ├── ChampionsAndRoles.jsx
│   │   ├── SocialMedia.jsx
│   │   ├── Footer.jsx
│   │   └── LoadingScreen.jsx
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos con Tailwind CSS
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Instalación

```bash
cd frontend
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## Build para Producción

```bash
npm run build
```

Los archivos compilados se guardarán en la carpeta `dist/`

## Tecnologías Utilizadas

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de utilidades CSS
- **PostCSS** - Procesador de CSS

## Características

- Responsive design
- Animaciones suaves (scroll effects)
- Loading screen personalizado
- Glass morphism panels
- Secciones:
  - Hero section con titulo y nivel
  - Current Elo con estadísticas
  - Pool de campeones y roles
  - Social media links
  - Footer

## Assets

Los assets están ubicados en `public/assets/` e incluyen:

- `kanekiBackground.gif` - Fondo animado hero
- `kanekiSinFondo1.png` - Imagen Kaneki para social media
- `pinkFlowers.gif` - Flores animadas para content sections
- `bakgrounFlores.mp4` - Video de fondo
- `personaje.jpeg` - Imágenes de perfil
- Y más...

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Previsualiza el build de producción localmente

---

¡Listo para trabajar en React! 🚀
