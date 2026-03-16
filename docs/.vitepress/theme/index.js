// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Home from './components/Home.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register custom Home component globally
    // It will auto-detect language based on route
    app.component('Home', Home)
  },
}
