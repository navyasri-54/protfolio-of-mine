# Portfolio — Siddamsetti Navya Sri Maha Lakshmi

A premium, dark-themed personal portfolio built with **only HTML5, CSS3 and vanilla JavaScript (ES6)** — no frameworks, no libraries.

## Structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css        # variables, layout, components
│   ├── responsive.css   # media queries
│   └── animations.css   # keyframes + reveal-on-scroll
├── js/
│   ├── app.js            # loader, navbar, scrollspy, filters, form
│   ├── particles.js       # canvas particle background + starfield
│   ├── cursor.js          # custom cursor, magnetic buttons, ripple
│   └── animations.js      # reveal, counters, skill rings, tilt, typing
├── assets/
│   ├── images/profile.png
│   ├── certificates/
│   ├── icons/
│   └── resume.pdf
└── README.md
```

## Features

- Animated loading screen with progress bar
- Aurora + particle + starfield animated background (no static image)
- Glassmorphism sticky navbar with glowing underline + scroll-spy + mobile hamburger menu
- Custom glowing cursor with magnetic buttons and ripple clicks
- Hero with typing animation, rotating gradient border, parallax profile photo
- Animated stat counters, skill progress rings, project tilt cards with filtering
- Timeline-based experience section, certificate grid, resume download card
- Validated contact form with floating labels
- Scroll progress bar, back-to-top, respects `prefers-reduced-motion`

## Running locally

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Customizing

- Colors and fonts are defined as CSS variables at the top of `css/style.css`.
- Swap `assets/images/profile.png` and `assets/resume.pdf` with your own files (keep the same filenames, or update the paths in `index.html`).
- Project, skill and certificate content lives directly in `index.html`.
