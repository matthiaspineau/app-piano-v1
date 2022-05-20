export default class Modal {

    constructor() {
        if (Modal.exists) {
            return Modal.instance
        }
        this.modal = document.getElementById('modal')
        Modal.exists = true
        Modal.instance = this

    }

    // init() {
    //     this.insertModal()
    //     this.handlerClose()
    // }

    createModal(params) {
        this.modal.appendChild(this.templateWrapper(params))
        this.openModal()
    }

    openModal() {
        this.modal.style.display = 'block'
        this.handlerClose()
    }

    templateWrapper(params) {
        let wrapper = document.createElement('div')
        wrapper.classList.add('modal-wrapper')
        wrapper.innerHTML = `<div class="modal-container">
                                <span class="modal-close">close</span>
                                <div class="modal-contain">
                                    <div>${params.title}</div>
                                    <div>${params.content}</div>
                                    <div>${params.action}</div>
                                </div>
                            </div>`

        return wrapper
    }

    handlerClose() {
        document.body.addEventListener('click', (e) => {
            if (e.target == document.querySelector('.modal-wrapper') || e.target == document.querySelector('modal-close') ) {
                this.modal.style.display = 'none'
                this.modal.innerHTML = '';
            }
        })
    }

}