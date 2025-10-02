# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-friendly wedding invitation website for Sandip & Anokhi's December 2025 wedding. Static site with no build process, deployed via GitHub Pages.

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML/JavaScript (no framework)
- **Styling**: Tailwind CSS via CDN
- **Icons**: Lucide icons via CDN
- **RSVP Backend**: EmailJS service
- **Animations**: Canvas Confetti library
- **Hosting**: GitHub Pages (custom domain: invite.sandipanokhi.space)

### Key Components

1. **Main Pages**
   - `index.html`: Primary invitation with hero carousel, event details, RSVP modal
   - `credits.html`: Attribution page for hero images

2. **Hero Image System**
   - SVG illustrations in `hero-images/` folder
   - Carousel rotation with 8 preloaded images
   - Smooth transitions between images every 4 seconds

3. **RSVP Modal System**
   - EmailJS integration (service ID: service_y6pf3yo)
   - Form validation and submission handling
   - Confetti animation on positive RSVP
   - Local storage to prevent duplicate submissions

4. **Navigation**
   - Slide-out hamburger menu
   - Smooth scroll to sections
   - Mobile-first responsive design

## Development Commands

```bash
# No build process - serve static files directly
python3 -m http.server 8000  # Python 3
# or
npx serve                     # Node.js alternative

# Open browser to http://localhost:8000
```

## Key Implementation Details

### EmailJS Configuration
- Public key initialization in index.html:703
- Service ID: service_y6pf3yo
- Template ID: template_8ryuflv
- Email handling logic: index.html:703-800

### Image Optimization Strategy
- Hero images preloaded in HTML head (index.html:24-32)
- Fixed aspect ratio containers prevent layout shift
- Mobile: max-width 20rem, Desktop: max-width 24-28rem

### Critical CSS
- Navigation menu hidden on initial load to prevent flash
- Styles in index.html:82-99 handle initial states
- JavaScript removes hidden classes after load

### Event Details
- **Date**: December 02, 2025
- **Venue**: Turf Club Garden, Camp, Pune
- **Calendar Integration**: Add to Calendar button with multiple providers

## Deployment

GitHub Pages auto-deploys from main branch. CNAME file configures custom domain.

## Testing Considerations

1. **RSVP Form**: Test with/without attendance selection, verify EmailJS integration
2. **Responsive Design**: Check mobile/tablet/desktop breakpoints
3. **Navigation**: Verify smooth scroll and menu overlay behavior
4. **Image Carousel**: Confirm smooth transitions and preloading
5. **Calendar Links**: Test all provider integrations (Google, Apple, Outlook, Yahoo)

## Common Tasks

### Update Event Details
Edit content directly in index.html - search for venue/date strings

### Modify Hero Images
Replace SVG files in `hero-images/` and update preload links in index.html:24-32

### Adjust RSVP Email Template
See `docs/EMAILJS_SETUP.md` for template configuration

### Change Color Scheme
Modify Tailwind classes throughout HTML files - primary background is `bg-[#fcfcfc]`