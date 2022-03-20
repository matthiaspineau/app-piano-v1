export default class DropDown {

    attrClsBtn = 'component-dropdown-btn'
    attrClsContent = 'component-dropdown-content'
    attrIdWallpaper = 'wallpaper-closer'

    constructor() {
        if (DropDown.exists) {
            return DropDown.instance
        }

        this.wallpaperCloser = document.getElementById(this.attrIdWallpaper)
        this.nodesBtn = document.querySelectorAll('.' + this.attrClsBtn)
        this.refSelected = ''

        DropDown.exists = true
        DropDown.instance = this
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

        let content = document.querySelector('.component-dropdown-content[drop-content-ref="'+ contentRef +'"]')
        let isOpen = content.classList.contains('is-open')
    
        if (isOpen) {
            content.classList.remove('is-open')
        } else {
            content.classList.add('is-open')
        }
    }



    attachEventClose() {
        this.wallpaperCloser.addEventListener('click', () => {

            this.wallpaperCloser.classList.remove('is-open')
    
            if (this.refSelected) {
                document.querySelector('.component-dropdown-content[drop-content-ref="'+ this.refSelected +'"]').classList.remove('is-open')
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