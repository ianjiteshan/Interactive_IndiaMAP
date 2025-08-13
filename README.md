# Interactive India States Map

A modern, responsive interactive map of India showing all states and union territories with detailed information including capitals, population, and area.

## Features

- **Interactive Map**: Click on any state to view detailed information
- **State Information**: Displays capital, population, and area for each state
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **Hover Effects**: States highlight when you hover over them
- **Zoom Controls**: Explore different regions with map zoom functionality

## Live Demo

🌐 **Deployed Application**: [https://jardaund.manus.space](https://jardaund.manus.space)

## Technology Stack

- **Frontend**: React 19 with Vite
- **Mapping Library**: Leaflet.js with React-Leaflet
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Data**: GeoJSON format for state boundaries
- **Deployment**: Cloudflare Workers

## Local Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Extract the source code:
   ```bash
   tar -xzf india-interactive-map-source.tar.gz
   cd india-interactive-map
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev --host
   # or
   npm run dev -- --host
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
# or
npm run build
```

The built files will be in the `dist/` directory.

## Data Sources

- **State Boundaries**: geoBoundaries project (Open License CC BY 4.0)
- **State Information**: Compiled from various official sources including:
  - Census of India
  - State government websites
  - Wikipedia

## Project Structure

```
india-interactive-map/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── IndiaMap.jsx  # Main map component
│   ├── assets/
│   │   └── india_states_simplified.geojson
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## Key Features Implementation

### Interactive State Selection
- Click events on GeoJSON features
- Dynamic state information display
- Visual feedback with hover effects

### Dark Mode Support
- CSS custom properties for theming
- Automatic map tile switching
- Persistent theme state

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Touch-friendly controls

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

## Acknowledgments

- geoBoundaries project for providing high-quality administrative boundary data
- OpenStreetMap contributors for map tiles
- Leaflet.js community for the excellent mapping library

