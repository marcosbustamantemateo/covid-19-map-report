# COVID-19 Reports World Map

Aplicación web para visualizar información en tiempo real sobre COVID-19 por países, con mapa interactivo y estadísticas detalladas.

🌐 **[Live Demo](https://covid-19-dd7e1.web.app/)**

![COVID-19 Reports](images.PNG)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Construcción y Despliegue](#-construcción-y-despliegue)
- [Internacionalización (i18n)](#-internacionalización-i18n)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [API y Fuentes de Datos](#-api-y-fuentes-de-datos)
- [Contribuir](#-contribuir)

---

## ✨ Características

- 🗺️ **Mapa interactivo mundial** con marcadores por país
- 📊 **Estadísticas detalladas** de casos, muertes, recuperados y pruebas
- 🔍 **Sistema de comparación** entre múltiples países
- 🌐 **Multiidioma** (Español e Inglés) con selector dropdown
- 📱 **Diseño responsive** adaptado a móviles y tablets
- 🔄 **Actualización en tiempo real** de datos
- 🎨 **Interfaz moderna** con gradientes y animaciones
- 💾 **Modo offline** con PWA (Progressive Web App)
- 🔎 **Búsqueda y filtrado** de países
- 📈 **Ordenamiento dinámico** por diferentes métricas

---

## 🛠 Tecnologías

### Framework y Librerías Principales
- **[Gatsby](https://www.gatsbyjs.com/)** v2.32.13 - Framework de React para sitios estáticos
- **[React](https://reactjs.org/)** v16.13.1 - Librería de UI
- **[React Leaflet](https://react-leaflet.js.org/)** v2.6.3 - Mapas interactivos
- **[Leaflet](https://leafletjs.com/)** v1.6.0 - Motor de mapas

### Internacionalización
- **[i18next](https://www.i18next.com/)** v21.10.0 - Framework de internacionalización
- **[react-i18next](https://react.i18next.com/)** v11.18.6 - Bindings de React para i18next

### Estilos
- **[Sass](https://sass-lang.com/)** - Preprocesador CSS
- **CSS Modules** - Estilos con scope
- **Gradientes y animaciones** personalizadas

### Datos y APIs
- **[Axios](https://axios-http.com/)** v0.19.2 - Cliente HTTP
- **Disease.sh API** - Datos de COVID-19 en tiempo real

### PWA y Offline
- **gatsby-plugin-offline** v3.1.2 - Service Worker para modo offline
- **gatsby-plugin-manifest** v2.3.3 - Manifiesto de PWA

### Iconos
- **[Font Awesome](https://fontawesome.com/)** v5.13.0 - Iconos vectoriales

### Testing
- **[Jest](https://jestjs.io/)** v25.2.7 - Framework de testing
- **[Enzyme](https://enzymejs.github.io/enzyme/)** v3.11.0 - Utilidades de testing para React

### Linting y Formato
- **[ESLint](https://eslint.org/)** v6.8.0 - Linter de JavaScript
- **[Prettier](https://prettier.io/)** v2.0.2 - Formateador de código

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v12.x o superior
- **npm** v6.x o superior (o **yarn** v1.22.x)
- **Git** para clonar el repositorio

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/covid-19-map-report.git
cd covid-19-map-report/coronavirus-map
```

### 2. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

> **Nota:** Se usa `--legacy-peer-deps` debido a conflictos de dependencias entre versiones de Gatsby y otros plugins.

### 3. Verificar instalación

```bash
npm list react react-dom gatsby
```

---

## 💻 Desarrollo

### Iniciar servidor de desarrollo

```bash
npm start
# o
gatsby develop
```

La aplicación estará disponible en:
- **Local:** http://localhost:8000
- **GraphiQL:** http://localhost:8000/___graphql

### Hot Reload

El servidor de desarrollo incluye hot reload automático. Los cambios en el código se reflejarán instantáneamente en el navegador.

### Limpiar caché

Si experimentas problemas, limpia la caché de Gatsby:

```bash
gatsby clean
```

---

## 🏗 Construcción y Despliegue

### Construcción para producción

```bash
npm run build
# o
gatsby build
```

Los archivos estáticos se generarán en la carpeta `public/`.

### Servir build localmente

```bash
gatsby serve
```

Disponible en: http://localhost:9000

### Despliegue en Firebase

```bash
# Instalar Firebase CLI (primera vez)
npm install -g firebase-tools

# Login en Firebase
firebase login

# Inicializar Firebase (si no está configurado)
firebase init

# Desplegar
firebase deploy
```

### Despliegue en Netlify

1. Conecta tu repositorio en [Netlify](https://netlify.com)
2. Configuración de build:
   - **Build command:** `gatsby build`
   - **Publish directory:** `public`
3. Deploy automático en cada push a la rama principal

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

---

## 🌐 Internacionalización (i18n)

La aplicación soporta múltiples idiomas con **español como idioma por defecto**.

### Idiomas Disponibles

- 🇪🇸 **Español (ES)** - Por defecto
- 🇬🇧 **English (EN)**

### Configuración

El sistema i18n está configurado en:
- **Configuración:** `src/i18n.js`
- **Traducciones:** `src/locales/[idioma]/translation.json`
- **Inicialización:** `gatsby-browser.js`

### Archivos de Traducción

```
src/locales/
├── es/
│   └── translation.json  # Español
└── en/
    └── translation.json  # Inglés
```

### Uso en Componentes

#### Componente Funcional

```javascript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('header.title')}</h1>;
};
```

#### Componente de Clase

```javascript
import { withTranslation } from 'react-i18next';

class MyComponent extends Component {
  render() {
    const { t } = this.props;
    return <h1>{t('header.title')}</h1>;
  }
}

export default withTranslation()(MyComponent);
```

### Agregar Nuevas Traducciones

1. Edita `src/locales/es/translation.json`
2. Edita `src/locales/en/translation.json`
3. Usa la clave en tu componente: `t('miSeccion.miClave')`

### Selector de Idioma

El selector de idioma es un dropdown con banderas ubicado en el header. Características:
- **Persistencia:** El idioma seleccionado se guarda en `localStorage`
- **Iconos:** Banderas de emojis (🇪🇸 🇬🇧)
- **Responsive:** Adaptado para móviles
- **Click fuera:** Se cierra al hacer clic fuera del dropdown

### Agregar Nuevo Idioma

1. Crea el archivo de traducción:
   ```bash
   mkdir -p src/locales/fr
   touch src/locales/fr/translation.json
   ```

2. Agrega las traducciones en el nuevo archivo

3. Importa en `src/i18n.js`:
   ```javascript
   import translationFR from './locales/fr/translation.json';
   
   const resources = {
     es: { translation: translationES },
     en: { translation: translationEN },
     fr: { translation: translationFR },
   };
   ```

4. Agrega el idioma en `LanguageSelector.js`:
   ```javascript
   const languages = [
     { code: 'es', name: 'Español', flag: '🇪🇸' },
     { code: 'en', name: 'English', flag: '🇬🇧' },
     { code: 'fr', name: 'Français', flag: '🇫🇷' },
   ];
   ```

---

## 📁 Estructura del Proyecto

```
coronavirus-map/
├── config/                    # Configuración de herramientas
│   ├── eslint.config.js
│   ├── jest.config.js
│   └── ...
├── public/                    # Build de producción (generado)
├── src/
│   ├── assets/
│   │   ├── images/           # Imágenes estáticas
│   │   └── stylesheets/      # Estilos SCSS
│   │       ├── application.scss
│   │       ├── components/   # Estilos de componentes
│   │       │   ├── _header.scss
│   │       │   └── ...
│   │       ├── pages/        # Estilos de páginas
│   │       └── settings/     # Variables y mixins
│   ├── components/           # Componentes React
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   ├── Map.js
│   │   ├── LanguageSelector.js
│   │   └── ...
│   ├── data/                 # Servicios de datos
│   │   └── map-services.js   # Llamadas a API
│   ├── hooks/                # Custom React Hooks
│   ├── lib/                  # Utilidades
│   ├── locales/              # Traducciones i18n
│   │   ├── es/
│   │   │   └── translation.json
│   │   └── en/
│   │       └── translation.json
│   ├── models/               # Modelos de datos
│   ├── pages/                # Páginas de Gatsby
│   │   ├── index.js         # Página principal (mapa)
│   │   ├── details.js       # Página de detalles
│   │   └── 404.js           # Página de error
│   └── i18n.js              # Configuración i18n
├── tests/                    # Tests
│   ├── __mocks__/
│   └── ...
├── firebase.json             # Configuración de Firebase
├── gatsby-browser.js         # API de navegador de Gatsby
├── gatsby-config.js          # Configuración de Gatsby
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm start               # Inicia servidor de desarrollo
npm run develop         # Alias de start
npm run clean           # Limpia caché de Gatsby
```

### Construcción

```bash
npm run build           # Build de producción
npm run serve           # Sirve build localmente
```

### Testing

```bash
npm test                # Ejecuta tests
npm run test:watch      # Tests en modo watch
```

### Linting y Formato

```bash
npm run lint            # Ejecuta ESLint
npm run format          # Formatea código con Prettier
npm run format:check    # Verifica formato sin cambiar
```

---

## 🔌 API y Fuentes de Datos

### Disease.sh API

La aplicación consume datos de [Disease.sh](https://disease.sh/), una API gratuita de datos de COVID-19.

**Endpoint principal:**
```
https://disease.sh/v3/covid-19/countries
```

**Respuesta de ejemplo:**
```json
{
  "country": "Spain",
  "cases": 1234567,
  "deaths": 12345,
  "recovered": 1234567,
  "tests": 12345678,
  "casesPerOneMillion": 12345,
  "deathsPerOneMillion": 123,
  "testsPerOneMillion": 123456,
  "updated": 1234567890123,
  "countryInfo": {
    "lat": 40,
    "long": -4,
    "flag": "https://...",
    "_id": 724
  }
}
```

### Servicio de Datos

El archivo `src/data/map-services.js` gestiona las llamadas a la API:

```javascript
import axios from 'axios';

const fetchCountries = async () => {
  const response = await axios.get(
    'https://disease.sh/v3/covid-19/countries'
  );
  return response.data;
};

export default { fetchCountries };
```

### Rate Limiting

La API tiene rate limiting. Para desarrollo intenso, considera:
- Cachear respuestas localmente
- Implementar debouncing en llamadas
- Usar variables de entorno para endpoints alternativos

---

## 🎨 Personalización

### Colores del Tema

Los colores principales están definidos en `src/assets/stylesheets/settings/_colors.scss`:

```scss
$primary: #667eea;
$secondary: #764ba2;
$gradient: linear-gradient(135deg, $primary 0%, $secondary 100%);
```

### Configuración del Mapa

En `src/pages/index.js`:

```javascript
const LOCATION = {
  lat: 40,    // Latitud central
  lng: 4,     // Longitud central
};
const DEFAULT_ZOOM = 2;  // Zoom inicial
```

### Metadatos

Edita `gatsby-config.js` para cambiar metadatos de SEO, PWA, etc.

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con cobertura
npm test -- --coverage

# En modo watch
npm test -- --watch
```

### Estructura de Tests

```
tests/
├── __mocks__/          # Mocks de módulos
├── lib/                # Tests de utilidades
└── models/             # Tests de modelos
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'gatsby'"

```bash
npm install --legacy-peer-deps
gatsby clean
```

### Error: "Window is not defined"

Asegúrate de usar `typeof window !== 'undefined'` antes de acceder a APIs del navegador.

### El mapa no se muestra

1. Verifica que Leaflet CSS esté cargado
2. Revisa la consola del navegador
3. Comprueba que la API responda correctamente

### Conflictos de dependencias

Usa siempre `--legacy-peer-deps` al instalar nuevas dependencias:

```bash
npm install [paquete] --save --legacy-peer-deps
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

## 👨‍💻 Autor

**Marcos Bustamante Mateo**
- Website: [marcosbustamantemateo.com](https://www.marcosbustamantemateo.com)

---

## 🙏 Agradecimientos

- [Disease.sh](https://disease.sh/) por proporcionar la API de datos
- [Leaflet](https://leafletjs.com/) por la librería de mapas
- [Gatsby](https://www.gatsbyjs.com/) por el framework
- Comunidad open source por las contribuciones

---

**⚠️ Nota:** Los datos mostrados son informativos. Consulta fuentes oficiales para información médica oficial.
