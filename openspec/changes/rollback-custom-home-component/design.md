## Context

The documentation site currently uses a custom `Home.vue` component with Heroicons SVG icons for the homepage hero section and feature grid. This was implemented in commit `b67ab5f` to provide a customized look, but adds:

- An additional Vue component file to maintain
- A dependency on `@heroicons/vue` package
- Custom styling that duplicates VitePress theme variables
- Complexity for future contributors who need to understand custom vs built-in components

The VitePress built-in hero layout supports all the required functionality: hero text, tagline, actions (buttons), and can be configured via frontmatter.

## Goals / Non-Goals

**Goals:**
- Remove custom Home component and Heroicons dependency
- Restore VitePress built-in hero layout configuration
- Maintain similar visual appearance and user experience
- Simplify codebase and reduce maintenance overhead
- Keep bilingual support (English/Chinese)

**Non-Goals:**
- Redesign the homepage visual appearance
- Change the feature grid layout or content
- Modify other pages or components
- Update branding or logo

## Decisions

### 1. Use VitePress Built-in Hero Layout

**Decision:** Revert to using VitePress `layout: home` frontmatter with built-in hero configuration.

**Rationale:**
- No custom component code to maintain
- Consistent with VitePress documentation standards
- Built-in support for all required features (hero text, actions, image)
- Better upgrade path for future VitePress versions

**Alternatives Considered:**
- Keep custom component: Rejected due to maintenance overhead
- Hybrid approach (custom features with built-in hero): Adds complexity, minimal benefit

### 2. Remove Heroicons Dependency

**Decision:** Remove `@heroicons/vue` from `package.json` dependencies.

**Rationale:**
- Only used by the custom Home component being removed
- Reduces bundle size and dependency count
- No other components use this library

**Alternatives Considered:**
- Keep for future use: Rejected - add dependencies when needed, not preemptively

### 3. Preserve Feature Grid Styling

**Decision:** Keep the custom feature grid CSS in Home.vue temporarily unused, or remove entirely.

**Rationale:**
- VitePress built-in features section uses different styling
- If feature grid customization is needed later, can be added back with clearer purpose
- Removing now simplifies the rollback

**Alternatives Considered:**
- Keep CSS for future use: Rejected - adds confusion about unused code

## Risks / Trade-offs

**[Visual differences in hero section]** → Mitigation: Review both English and Chinese homepages after changes, compare with git history screenshots

**[Loss of custom feature icons]** → Mitigation: VitePress supports emoji icons or can add SVG icons later if needed

**[Build output differences]** → Mitigation: Run full build and verify all pages render correctly

**[Dependency removal may affect lock file]** → Mitigation: Run `npm install` after removing dependency to update `package-lock.json`

## Migration Plan

### Deployment Steps

1. Remove `Home.vue` component file
2. Update `docs/index.md` with VitePress frontmatter configuration
3. Update `docs/zh/index.md` with VitePress frontmatter configuration (Chinese translation)
4. Remove `@heroicons/vue` from `package.json`
5. Run `npm install` to update dependencies
6. Run `npm run docs:build` to verify build succeeds
7. Test homepage in both English and Chinese

### Rollback Strategy

If issues are discovered:

1. Revert the change commit: `git revert HEAD`
2. Or restore files from git history:
   - `git checkout b67ab5f -- docs/.vitepress/theme/components/Home.vue`
   - `git checkout b67ab5f -- docs/index.md docs/zh/index.md`
3. Run `npm install` to restore dependencies
4. Rebuild documentation

## Open Questions

None - this is a straightforward rollback to a known working state.
