# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **XAdmin Documentation Site** - a VitePress-powered documentation website for XAdmin, a modern Laravel admin panel builder based on Livewire v4.

- **Framework**: VitePress 1.6.4 (Vue 3-based static site generator)
- **Deployment**: GitHub Pages at `https://x-multibyte.github.io/xadmin-website/`
- **Base Path**: `/xadmin-website/` (configured for GitHub Pages)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
docs/
├── .vitepress/
│   ├── config.js          # Main VitePress config with i18n (en/zh)
│   ├── theme/
│   │   ├── index.js       # Theme entry (extends default theme)
│   │   └── style.css      # Custom styles
│   └── dist/              # Build output (gitignored)
├── index.md               # English homepage
├── guide/                 # Guide documentation
├── components/            # Component documentation
├── examples/              # Example tutorials
├── api/                   # API reference docs
└── zh/                    # Chinese translations (mirror structure)
```

## i18n Architecture

The site supports English (default) and Chinese (zh-CN):

- **Config**: `docs/.vitepress/config.js` defines two locales under `locales` key
- **Content**: Chinese docs mirror English structure under `docs/zh/`
- **Navigation**: Each locale has its own nav, sidebar, and footer config
- **Language Switcher**: Available in the top navigation

When adding new documentation:
1. Create the English version first
2. Create the corresponding Chinese version under `docs/zh/`
3. Add entries to both locale configurations in `config.js`

## OpenSpec Workflow

This repository uses an experimental OpenSpec workflow for managing changes:

- **Config**: `openspec/config.yaml`
- **Prompts**: `.github/prompts/` contains 11 AI prompts for the workflow
- **Skills**: `.github/skills/` contains 11 skill definitions

The workflow commands (defined in prompts) include:
- `opsx-new` - Create a new change
- `opsx-apply` - Apply a change
- `opsx-verify` - Verify a change
- `opsx-continue` - Continue working on a change
- `opsx-archive` - Archive a completed change
- `opsx-sync` - Sync specs to main

## Key Configuration Details

**VitePress Config** (`docs/.vitepress/config.js`):
- Theme color: `#FF2D20` (Laravel red)
- Search: Local provider
- Markdown: Line numbers enabled
- Dead links: Ignored during development (`ignoreDeadLinks: true`)

**GitHub Actions** (`.github/workflows/deploy.yml`):
- Triggers on pushes to `main` affecting docs, public, or package files
- Node.js 20
- Deploys to GitHub Pages from `docs/.vitepress/dist`

## Adding Documentation

1. Create `.md` files in the appropriate section folder (`guide/`, `components/`, `examples/`, `api/`)
2. Add entries to the sidebar configuration in `docs/.vitepress/config.js` for both locales
3. Use frontmatter for page metadata:
   ```yaml
   ---
   title: Page Title
   description: Page description
   ---
   ```
4. For homepage features, use VitePress frontmatter hero format (see `docs/index.md`)
