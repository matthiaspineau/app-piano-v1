export default class DropDown {

    attrClsBtn = 'component-dropdown-btn'
    attrClsContent = 'component-dropdown-content'
    attrIdWallpaper = 'wallpaper-closer'

    constructor() {
        this.wallpaperCloser = document.getElementById(this.attrIdWallpaper)
        this.nodesBtn = document.querySelectorAll('.' + this.attrClsBtn)
        this.refSelected = ''
    }


    init() {
        this.nodesBtn.forEach(element => {
            element.addEventListener('click', () => {

                let ref = element.getAttribute('drop-btn-ref')
                this.openWallpaperCloser()
                this.setRefSelected(ref)

                switch (ref) {
                    case 'color-picker':
                        this.toggleContent(ref)  
                        break;
                    case 'select-column':
                        this.toggleContent(ref)  
                        break;
                    default:
                        break;
                }
            })
        })
    }

    fetchAllBtn() {
        this.nodesBtn = document.querySelectorAll('.'+this.attrClsBtn)
    }



    toggleContent(contentRef) {

        let element = document.querySelector('.'+this.attrClsContent+'[drop-content-ref="'+ contentRef +'"]')
        let isOpen = element.classList.contains('is-open')
    
        if (isOpen) {
            element.classList.remove('is-open')
        } else {
            element.classList.add('is-open')
        }
    }



    attachEventClose() {
        this.wallpaperCloser.addEventListener('click', () => {

            this.wallpaperCloser.classList.remove('is-open')
    
            if (this.refSelected) {
                document.querySelector('.'+this.attrClsContent+'[drop-content-ref="'+ contentRef +'"]').classList.remove('is-open')
            }
        })
    }

    openWallpaperCloser() {
        this.wallpaperCloser.classList.add('is-open')

        this.attachEventClose()
    }


    setRefSelected(ref) {
        this.refSelected = ref
    }

    getRefSelected() {
        return this.refSelected
    }


}