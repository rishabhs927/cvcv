# Flipbook Integration

## Overview
The flipbook from `extras/RishabhFlipBook` has been successfully integrated into the main portfolio as an independent tab/window.

## What was integrated:

### 1. Flipbook Component (`app/Flipbook.js`)
- Self-contained flipbook functionality extracted from the original
- Uses flipbook data from `/content/flipbook/` directory
- Maintains all original features:
  - Color-adaptive backgrounds based on images
  - Swipe navigation on mobile
  - Scroll navigation on desktop
  - Interactive project showcase

### 2. Flipbook Styles (`app/Flipbook.css`)
- Scoped CSS to avoid conflicts with main portfolio
- Maintains flipbook's visual identity within the window

### 3. Desktop Integration
- Added new flipbook icon to desktop (`📖` with gradient background)
- Flipbook opens in a resizable window (800x600px default)
- Window can be moved, resized, and closed like other windows
- Maintains independent state when opened/closed

## How it works:

1. **Icon Click**: Double-clicking the flipbook icon opens the flipbook in a new window
2. **Independent Operation**: The flipbook works completely independently within its window
3. **Window Management**: Uses the same window system as other portfolio components
4. **Data Source**: Uses dedicated flipbook data from `/content/flipbook/profileData.json`

## File Structure:
```
app/
├── Flipbook.js          # Main flipbook component
├── Flipbook.css         # Flipbook-specific styles
├── page.js              # Updated to include flipbook integration
public/content/flipbook/ # Flipbook data and media (copied from extras)
```

## Usage:
1. Start the development server: `npm run dev`
2. Open the portfolio in browser
3. Double-click the flipbook icon (📖) on the desktop
4. The flipbook will open in a new window with full functionality

## Dependencies:
All required dependencies were already present in the main portfolio:
- `framer-motion` for animations
- `react-swipeable` for touch interactions
- `readcv` for data processing
- `@fontsource/anton` for typography

The integration maintains complete isolation while providing seamless access through the main portfolio interface.
