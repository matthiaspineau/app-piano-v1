import { Router } from './router/router.js'
import _AppSheetMusic from './partition/AppSheetMusic.js'

window.addEventListener("DOMContentLoaded", (event) => {
   
    const RouterSite = new Router
    RouterSite.init()

    const AppSheetMusic = new _AppSheetMusic()
    AppSheetMusic.main()

});
