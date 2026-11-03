# Memory Game

A two-player card-matching game built with TypeScript, Vite, and SCSS. Pick a theme and board size, then take turns finding matching pairs.

## Features

- **Three themes** with distinct card artwork — Code Vibes, Game, and Food.
- **Three board sizes** — 16, 24, or 36 cards (8, 12, or 18 pairs).
- **Two-player gameplay** with Blue and Orange player colors, a visible score, and an active-player indicator.
- **Card flips and match detection** for each pair of revealed cards.
- **End-of-game screens** that show when the round is over and display the winner.
- **An exit confirmation modal** for leaving the current game.
- **Responsive layouts** for different screen sizes.

## How to play

1. Choose a theme and board size in the settings.
2. On your turn, flip two cards to reveal their artwork.
3. Find matching pairs to score points. The board shows whose turn it is and keeps track of both players’ scores.
4. The round ends when all pairs have been found.

## Getting started

With Node.js and npm installed, run these commands from the repository root.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite to play.

The build script first checks types with `tsc -noEmit` and then creates the production build with Vite. Run the following commands to build and preview it locally.

```sh
npm run build
npm run preview
```

## Implementation

- **TypeScript** handles game state, card flips, match detection, scoring, and player turns.
- **Dynamic templates** render the settings, game board, dialogs, and end-of-game screens.
- **SCSS** styles the interface and adapts the layout to different screen sizes.
- **Session storage** (`sessionStorage`) retains settings when the page reloads in the same browser tab.
- **Vite** serves the app during development and bundles it for production. Theme images are loaded through `import.meta.glob()`, and individual SVG assets can be imported directly so Vite resolves their URLs during the build.
