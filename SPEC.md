# Elena Vasquez - Clay Sculptor & Portrait Artist Portfolio

## Concept & Vision

A nostalgic, gallery-like digital experience that feels like stepping into a sun-drenched Mediterranean atelier. The website channels the warmth of terracotta workshops and the intimacy of an artist's studio, with aged paper textures, hand-drawn flourishes, and the organic imperfection of handmade art. Every element should feel tactile, as if you could run your fingers across it.

## Design Language

### Aesthetic Direction
Mediterranean vintage meets Victorian curiosity cabinet — warm, earthy tones reminiscent of aged manuscripts and clay, combined with ornate decorative elements that evoke old-world craftsmanship.

### Color Palette
- **Primary**: `#8B7355` (Warm Umber)
- **Secondary**: `#C4A77D` (Aged Gold)
- **Accent**: `#9E4A3D` (Terracotta)
- **Background**: `#F5EDE0` (Aged Parchment)
- **Dark Background**: `#2C2416` (Dark Walnut)
- **Text**: `#3D3226` (Deep Sepia)
- **Light Text**: `#F0E6D8` (Cream)

### Typography
- **Headings**: "Playfair Display" — elegant serif with high contrast
- **Subheadings**: "Cormorant Garamond" — refined, classical feel
- **Body**: "Crimson Text" — readable with vintage character
- **Accents**: "Tangerine" — for decorative flourishes

### Spatial System
- Generous whitespace evoking gallery walls
- Content sections with asymmetric layouts
- Deliberate breathing room between elements
- Full-viewport hero with dramatic imagery

### Motion Philosophy
- Slow, graceful reveals (600-800ms) suggesting the patience of artistic creation
- Parallax scrolling for depth and dimension
- Subtle hover transformations that feel like touching art
- Page elements fade and rise like objects being unveiled

### Visual Assets
- Unsplash images for sculptures and portraits (specific queries for clay art, portrait sketches)
- Decorative SVG flourishes: ornamental dividers, corner decorations
- Subtle paper texture overlay throughout
- Hand-drawn style borders and frames

## Layout & Structure

### Hero Section
- Full viewport height with layered parallax background
- Artist name in large display type with decorative underline
- Tagline in elegant italic script
- Subtle scroll indicator

### About Section
- Split layout: portrait photo left, bio text right
- Ornate frame around the photo
- Timeline showing education (Barcelona) and experience (3 years)
- Quote about her artistic philosophy

### Gallery Section - Clay Sculptures
- Masonry-style grid with varied sizes
- Images in vintage frames that lift on hover
- Category label and piece title below each
- Lightbox view on click

### Gallery Section - Portraits
- Horizontal scrolling gallery with peek preview
- Paper sketch aesthetic for portrait thumbnails
- Drawer-style reveal animation

### Process Section
- Three-step creative journey
- Illustrated with decorative icons
- Handwritten-style annotations

### Contact Section
- Elegant form with vintage input styling
- Studio location hint (Barcelona-inspired)
- Social links with hover effects

### Footer
- Minimal with ornamental border
- Copyright with decorative flourish

## Features & Interactions

### Gallery Lightbox
- Click any artwork to open fullscreen view
- Smooth scale-in animation
- Title and description overlay
- Close on click outside or X button
- Keyboard navigation (arrow keys, escape)

### Scroll Animations
- Elements fade up and in as they enter viewport
- Staggered timing for grouped items
- Parallax on decorative elements

### Hover States
- Gallery frames lift with shadow deepening
- Buttons with color shift and subtle scale
- Links with underline animation
- Navigation items with golden glow

### Smooth Scrolling
- Native smooth scroll for navigation
- Active section highlighting in nav

## Component Inventory

### Navigation
- Fixed top bar, transparent initially, solid on scroll
- Logo/name left, nav links right
- Hover: golden underline animation
- Mobile: slide-in drawer

### Hero
- Full-height background with texture overlay
- Centered text with decorative flourishes above/below
- Animated scroll indicator

### Section Headers
- Large serif title
- Ornamental divider below
- Subtle entrance animation

### Artwork Card
- Image with vintage frame border
- Title in italic below
- Hover: lift + shadow + slight zoom
- Click: opens lightbox

### Process Card
- Numbered step with decorative circle
- Icon illustration
- Title and description
- Subtle background pattern

### Contact Form
- Stacked inputs with floating labels
- Vintage-styled borders
- Submit button with loading state
- Success/error feedback

### Footer
- Decorative top border
- Centered content
- Social icons row

## Technical Approach

- Single HTML file with embedded CSS and JavaScript
- Vanilla JavaScript for interactions (no framework needed)
- CSS Grid and Flexbox for layouts
- Intersection Observer for scroll animations
- CSS custom properties for theming
- Responsive breakpoints: 768px, 1024px
