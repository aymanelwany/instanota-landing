# CLAUDE.md - Guidelines for Instanota Landing Page

## Development Commands
- **Start Local Server**: `npx http-server` or simply open `index.html` in browser
- **Deploy to GitHub Pages**: Push to main branch

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- RTL layout with `dir="rtl"` and `lang="ar"`
- BEM-like class naming (e.g., `feature-card`, `feature-icon`)
- Maintain nested structure for readability

### CSS
- Use CSS variables from `:root` for colors and common values
- Mobile-first responsive design with media queries
- Component-based organization
- Transitions with `var(--transition)` for consistency

### JavaScript
- Event initialization in `DOMContentLoaded`
- Clean function-based organization
- Use ES6+ features where appropriate
- Simple error handling with user-friendly alerts in Arabic
- Prefer `querySelector` and `querySelectorAll` for DOM selection

### Assets
- Store images in `/images` directory
- Use optimized image formats for web
- Follow naming convention: descriptive-name-number.format

### Responsiveness
- Test on multiple screen sizes (desktop, tablet, mobile)
- Ensure content is readable on all devices