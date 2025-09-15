# Fix Image Flash on Page Refresh

## Problem Statement
When users refresh the wedding invitation page, there's a noticeable flash/flicker as images transition from empty to loaded. This creates a jarring user experience, especially noticeable on slower connections or when browser cache is cleared.

## Context
- **Project**: Wedding invitation for Sandip & Anokhi (December 02, 2025)
- **Tech Stack**: HTML, Tailwind CSS (via CDN), JavaScript
- **Image System**: Sequential narrative system where images tell a story from anticipation to celebration
- **Current Version**: Cache version 2.0.0
- **Affected Files**: `/index.html` (lines 68-74 for CSS, lines 157 & 256 for images, lines 362-381 for JS)

## Root Cause Analysis

### Current Behavior
1. Images start with empty `src=""` attribute
2. Custom CSS class `image-loading` sets `opacity: 0`
3. JavaScript loads after DOM, creating a gap between page render and image display
4. Transition from nothing → image is jarring despite opacity animation

### Why It Happens
- **Empty initial state**: No placeholder or background while loading
- **JavaScript dependency**: Images only appear after JS executes
- **Timing gap**: Visible delay between page paint and image load

## Proposed Solution

### Strategy: Use Tailwind Utility Classes for Smoother Transitions

### 1. **Replace Custom CSS with Tailwind Classes**
- Remove custom `image-loading` and `image-loaded` CSS classes
- Use Tailwind's built-in opacity and transition utilities
- Benefits: Cleaner code, better performance, consistent with project style

### 2. **Update Image Elements**
- Replace custom classes with Tailwind utilities:
  - `opacity-0` for initial state
  - `transition-opacity` for smooth transitions
  - `duration-500` for 500ms fade (slightly slower than current 400ms)
  - `ease-in-out` for natural acceleration curve
  - `will-change-opacity` for browser optimization hint

### 3. **Add Subtle Placeholder Background**
- Add `bg-gray-50` to image containers
- Provides subtle background during load
- Prevents harsh white-to-image flash

### 4. **Optimize Image Loading Function**
- Use `requestAnimationFrame` for smoother transitions
- Ensure image is rendered before removing opacity
- Work with Tailwind classes instead of custom CSS

### 5. **Optional Enhancement: Prefetch Next Image**
- Preload the next image in sequence
- Reduces load time for future refreshes
- Improves perceived performance

## Expected Results

- **Smoother fade-in**: 500ms transition with proper easing
- **No white flash**: Subtle background prevents jarring appearance
- **Better performance**: Browser optimization hints
- **Cleaner code**: Leveraging Tailwind's utility-first approach
- **Consistent experience**: Works across all devices and network speeds

## Success Criteria

- [ ] No visible flash when refreshing the page
- [ ] Images fade in smoothly over 500ms
- [ ] Sequential narrative system continues working correctly
- [ ] Works on both mobile and desktop views
- [ ] No degradation with slow network (test with Chrome DevTools 3G throttling)
- [ ] No JavaScript console errors
- [ ] LocalStorage journey data persists correctly

## Testing Requirements

1. **Clear cache test**: Clear browser cache and refresh - should see smooth fade
2. **Network throttling**: Test with Chrome DevTools "Slow 3G" setting
3. **Multiple refreshes**: Refresh 5+ times rapidly - each should be smooth
4. **Cross-device**: Test on mobile and desktop viewports
5. **Sequential system**: Verify images still follow the narrative sequence

## Important Notes

- Maintain the existing sequential image narrative system
- Don't change the order of images in the sequence
- Keep the current cache version unless making breaking changes
- Preserve all accessibility features (alt texts)
- Ensure the solution uses Tailwind CSS utilities wherever possible