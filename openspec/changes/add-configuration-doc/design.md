## Context

The XAdmin documentation site uses VitePress for static site generation. The sidebar navigation in `docs/.vitepress/config.js` already references a `/guide/configuration` page, but this file does not exist. This creates a broken link for users trying to find configuration documentation.

The project structure follows a bilingual pattern (English and Chinese) where each document has a corresponding translation under `docs/zh/`.

## Goals / Non-Goals

**Goals:**
- Create comprehensive configuration documentation for XAdmin package
- Follow existing documentation patterns and writing style
- Provide both English and Chinese translations
- Include practical code examples

**Non-Goals:**
- Modifying any existing documentation
- Changing VitePress configuration
- Adding custom Vue components (use built-in VitePress features)

## Decisions

1. **Use VitePress built-in features only**
   - Decision: Use standard Markdown with VitePress code blocks instead of custom components
   - Rationale: Recent commits show a rollback from custom Vue components back to built-in hero layout. Keeping documentation simple aligns with this direction.

2. **Structure documentation by configuration category**
   - Decision: Group related configuration options together (e.g., authentication, UI, grid)
   - Rationale: Makes it easier for users to find relevant settings

3. **Provide copy-paste ready examples**
   - Decision: Include complete configuration file examples, not just snippets
   - Rationale: Users can directly use these as starting points

## Risks / Trade-offs

- [Risk] Configuration options may change in future XAdmin versions → [Mitigation] Add version note at top of document
- [Risk] Translation may become outdated → [Mitigation] Keep Chinese doc structure matching English, mark as community translation if needed
