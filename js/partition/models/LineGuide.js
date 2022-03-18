class LineGuide {

    constructor() {
        this.cardsId = []
    }

    addIdCards(id) {
        if (this.cardsId.indexOf(id) !== 0) {

            this.cardsId.push(id)
        }
        return this.cardsId
    }   

    removeIdCards(id) {
        this.cardsId.filter(idCard => idCard !== id)
        return this.cardsId
    }


    createLine(elt, adjust) {
        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.left = adjust.x +'px'
        div.style.top = adjust.y +'px'
        div.style.bottom = '0px'
        div.style.height = '100%'
        div.style.width = '3px'
        div.style.background = 'green'
        
        let uuid = Math.random().toString(16).slice(2)
        
        // div.style.borderRadius = '5px'
        div.setAttribute('uuid', uuid)

        
        document.querySelector(elt).appendChild(div)
        div.addEventListener('click', function(e) {
            e.stopPropagation()
            let attrUuid = e.target.getAttribute('uuid')
            document.querySelector('div[uuid="'+attrUuid+'"]').remove()
        })
    }


}

export {LineGuide}