## 1. Remove Custom Component

- [x] 1.1 Delete `docs/.vitepress/theme/components/Home.vue` file
- [x] 1.2 Verify no other files reference the Home component

## 2. Update Homepage Frontmatter

- [x] 2.1 Update `docs/index.md` with VitePress built-in hero frontmatter
- [x] 2.2 Update `docs/zh/index.md` with VitePress built-in hero frontmatter (Chinese)
- [x] 2.3 Restore original hero text and tagline from git history

## 3. Remove Dependencies

- [x] 3.1 Remove `@heroicons/vue` from `package.json` dependencies
- [x] 3.2 Run `npm install` to update `package-lock.json`

## 4. Build and Verify

- [x] 4.1 Run `npm run docs:build` to verify build succeeds
- [x] 4.2 Test homepage renders correctly in English
- [x] 4.3 Test homepage renders correctly in Chinese (`/zh/`)
- [x] 4.4 Verify all navigation links work correctly

## 5. Cleanup

- [x] 5.1 Remove old build artifacts from `docs/.vitepress/dist/`
- [x] 5.2 Rebuild documentation to generate fresh build output
- [x] 5.3 Verify no console errors in browser DevTools
