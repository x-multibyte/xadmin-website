## Why

The custom Home component implementation adds unnecessary complexity and maintenance overhead. The VitePress built-in hero layout provides the same functionality with less code to maintain and better consistency with the rest of the documentation site.

## What Changes

- Remove custom `Home.vue` component from `.vitepress/theme/components/`
- Revert `docs/index.md` and `docs/zh/index.md` to use VitePress built-in hero layout
- Remove Heroicons Vue dependency (`@heroicons/vue`)
- Restore standard VitePress frontmatter configuration for homepage

## Capabilities

### New Capabilities
<!-- No new capabilities - this is a rollback -->

### Modified Capabilities
<!-- No existing capabilities are being modified - this is a UI simplification -->

## Impact

- **Files Removed**: `docs/.vitepress/theme/components/Home.vue`
- **Files Modified**: `docs/index.md`, `docs/zh/index.md`
- **Dependencies**: Remove `@heroicons/vue` from `package.json`
- **Breaking Changes**: None - visual appearance remains similar, only implementation changes
- **Build Output**: All generated files in `docs/.vitepress/dist/` will be regenerated
