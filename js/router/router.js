class Router {

    constructor() {
        
    }

    init() {
        this.links = document.querySelectorAll('.link')

        const viewPartition = document.getElementById('view-partition')
        const viewFormulaire = document.getElementById('view-formulaire')
        const viewTest = document.getElementById('view-test')
  
        this.links.forEach(elt =>  {
            elt.addEventListener('click', () => {
                let goTo = elt.dataset.link
                let lastActive = document.querySelector('.link[data-active="true"]')
                if (lastActive) {
                    lastActive.dataset.active = false
                }
                elt.dataset.active = true
                switch (goTo) {
                   case 'go-partition':
                        viewPartition.classList.add('is-open')
                        viewFormulaire.classList.remove('is-open')
                        viewTest.classList.remove('is-open')
                       break;
                    case 'go-formulaire':
                        viewFormulaire.classList.add('is-open')
                        viewPartition.classList.remove('is-open')
                        viewTest.classList.remove('is-open')
                        break;
                    case 'go-test':
                        viewTest.classList.add('is-open')
                        viewPartition.classList.remove('is-open')
                        viewFormulaire.classList.remove('is-open')
                        break;
                   default:
                       break;
               }
            })
        })
    }

}

export {Router}