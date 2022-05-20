export default class Modal {

    constructor() {
        if (Modal.exists) {
            return Modal.instance
        }
        this.modal = document.getElementById('modal')
        Modal.exists = true
        Modal.instance = this

    }

    init() {
        this.insertModal()
        this.handlerClose()
    }

    openModal() {
        this.modal.style.display = 'block'
        this.handlerClose()
    }

    closeModal() {
        this.modal.innerHTML = '';
        this.modal.style.display = 'none'
    }

    templateWrapper() {
        let wrapper = document.createElement('div')
        wrapper.innerHTML = `<div class="modal-wrapper">
                            <div class="modal-container">
                                <span class="modal-close">close</span>
                                <div class="modal-contain"></div>
                            </div>
                        </div>`

        return wrapper
    }

    injectContent(dataHtml) {
        this.modal.innerHTML = ''
        this.modal.appendChild(this.templateWrapper())
        this.modal.querySelector('.modal-contain').innerHTML = dataHtml
        this.openModal()
    }

    insertModal() {
        this.modal.appendChild(this.templateWrapper())
    }

    handlerClose() {
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.modal.style.display = 'none'
            this.closeModal()
        })
    }



    openWallpaperCloser() {
        this.wallpaperCloser.classList.add('is-open')
        this.wallpaperCloser.classList.add('bg-dark')

        this.attachEventClose()
    }

    attachEventClose() {
        this.wallpaperCloser.addEventListener('click', () => {

            this.wallpaperCloser.classList.remove('is-open')
    
            // if (this.refSelected) {
            //     document.querySelector('.component-dropdown-content[drop-content-ref="'+ this.refSelected +'"]').classList.remove('is-open')
            // }
        })
    }

}