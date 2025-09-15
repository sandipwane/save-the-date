# Hero Images Directory

This directory contains the hero images that are displayed on the Save the Date page. The images follow a sequential narrative system to create a visual journey for each visitor.

## Sequential Image System

The page uses a sophisticated sequential image system with the following features:

### Cache Version Management
- **Current Version**: `2.0.0` (defined in `index.html` as `CACHE_VERSION`)
- **IMPORTANT**: When adding or removing images, you MUST update the `CACHE_VERSION` constant in `index.html`

### How It Works
1. **First Visit**: Each user starts at a random point in the predefined sequence
2. **Sequential Display**: On each page refresh, the next image in the sequence is shown
3. **Continuous Journey**: The sequence wraps around, creating an infinite loop
4. **Persistent Experience**: User's position in the sequence is saved in localStorage
5. **Cache Invalidation**: When version changes, users start a new journey from a random point

### The Narrative Sequence
The images are arranged to tell a visual story:
1. `boyglasses-01.svg` - Beginning: anticipation
2. `girlcalendar-01.svg` - Planning the date
3. `futuregazing-01.svg` - Looking forward together
4. `stargazing-01.svg` - Dreaming under stars
5. `fistbump-01.svg` - Making commitment
6. `handheart-01.svg` - Love and affection
7. `dancing-01.svg` - Celebration begins
8. `rainhug-01.svg` - Through all weather
9. `moving-01.svg` - Journey together
10. `planting-01.svg` - Growing together
11. `joinus-01.svg` - Invitation to celebrate

### Adding New Images
1. Add your new SVG image to this directory
2. Update the `heroImages` array in `index.html` to include the new image path
3. Update the `initializeImageSequence()` function to include the new image in the narrative order
4. **UPDATE THE CACHE VERSION** in `index.html` (e.g., change from `2.0.0` to `2.1.0`)

### Removing Images
1. Delete the image file from this directory
2. Remove the image path from the `heroImages` array in `index.html`
3. Remove the image from the `initializeImageSequence()` function
4. **UPDATE THE CACHE VERSION** in `index.html` (e.g., change from `2.0.0` to `2.1.0`)

### Cache Version Guidelines
- Minor version bump (2.0.0 → 2.1.0): Adding or removing images
- Major version bump (2.0.0 → 3.0.0): Significant changes to sequence logic
- Patch version bump (2.0.0 → 2.0.1): Bug fixes that don't affect image selection

### LocalStorage Structure
The system stores the following in localStorage under the key `heroImageJourney`:
```json
{
  "cacheVersion": "2.0.0",
  "journeyStartIndex": 3,
  "currentSequenceIndex": 5,
  "sequenceOrder": ["boyglasses-01.svg", "girlcalendar-01.svg", ...],
  "lastUpdated": "2025-09-15T10:00:00.000Z"
}
```

### Key Functions in index.html
- `initializeImageSequence()` - Defines the narrative order
- `getSequenceStartIndex()` - Generates random starting point
- `loadUserJourneyData()` - Loads saved journey from localStorage
- `saveUserJourneyData()` - Saves journey progress
- `getNextImageInSequence()` - Calculates next image with wrap-around
- `displaySequentialHeroImage()` - Main orchestrator function
- `resetUserJourney()` - Clears journey data on cache invalidation

When the cache version changes, journey data is automatically reset to ensure compatibility.

## Easter Egg Feature
The sequential system acts as an easter egg - users who refresh multiple times will notice they're experiencing a consistent visual story, starting from their unique entry point but following the same narrative arc.