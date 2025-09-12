# Hero Images Directory

This directory contains the hero images that are displayed on the Save the Date page. The images cycle through on each page refresh to provide variety.

## Image Rotation System

The page uses a smart image rotation system with the following features:

### Cache Version Management
- **Current Version**: `1.0.0` (defined in `index.html` as `CACHE_VERSION`)
- **IMPORTANT**: When adding or removing images, you MUST update the `CACHE_VERSION` constant in `index.html`

### How It Works
1. On each page refresh, a random image is selected from the available pool
2. Recently shown images (last 2-3) are tracked to avoid immediate repetition
3. The system ensures variety by excluding recent images from selection
4. When all images have been shown recently, the history resets

### Adding New Images
1. Add your new SVG image to this directory
2. Update the `heroImages` array in `index.html` to include the new image path
3. **UPDATE THE CACHE VERSION** in `index.html` (e.g., change from `1.0.0` to `1.1.0`)

### Removing Images
1. Delete the image file from this directory
2. Remove the image path from the `heroImages` array in `index.html`
3. **UPDATE THE CACHE VERSION** in `index.html` (e.g., change from `1.0.0` to `1.1.0`)

### Cache Version Guidelines
- Minor version bump (1.0.0 → 1.1.0): Adding or removing images
- Major version bump (1.0.0 → 2.0.0): Significant changes to rotation logic
- Patch version bump (1.0.0 → 1.0.1): Bug fixes that don't affect image selection

### Current Images
- `dancing-01.svg`
- `joinus-01.svg`
- `moving-01.svg`
- `rainhug-01.svg`
- `star-gazing-01.svg`

### LocalStorage Structure
The system stores the following in localStorage under the key `heroImageData`:
```json
{
  "cacheVersion": "1.0.0",
  "recentImages": ["dancing-01.svg", "moving-01.svg"],
  "lastShownImage": "moving-01.svg"
}
```

When the cache version changes, this data is automatically reset to ensure compatibility.