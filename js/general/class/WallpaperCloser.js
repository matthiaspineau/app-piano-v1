export default class WallpaperCloser {

    btnWallpaperCloser
    contentRef
    
    constructor() {
        this.btnWallpaperCloser = document.getElementById('wallpaper-closer')
        this.contentRef = ''
    }

    openWallpaperCloser() {
        this.btnWallpaperCloser.classList.add('is-open')
    }

    removeWallpaperCloser() {
        this.btnWallpaperCloser.classList.remove('is-open')
        this.btnWallpaperCloser.dataset.closer = ''

        if (this.contentRef) {
            document.querySelector('.component-dropdown-content[drop-content-ref="'+ this.contentRef +'"]').classList.remove('is-open')
        }
    }

    setRefNeedClose(ref) {
        this.contentRef = ref
    }

    getRefNeedClose() {
        return this.contentRef
    }

 

}