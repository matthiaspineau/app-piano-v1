class LineGuide {

    constructor(node) {
       this.targetNodes = document.querySelectorAll(node)
       this.color = 'green'
    }

    init() {
        this.targetNodes.forEach(element => {
            element.addEventListener('click', (e) => {
                this.drawLineGuide(e)
            })
        });
    }

    drawLineGuide(e) {
 
        let height = e.target.offsetHeight
        let width = e.target.offsetWidth
        let layerX = e.layerX
        let layerY = e.layerY
        let attrId = e.target.parentNode.getAttribute('id_card_media')
    
        let valueX = (layerX / width) * 100
        let valueY = (layerY / height) * 100
    
        let adjust = {
            x: valueX,
            y: valueY
        }
    
        this.createLine('div[id_card_media="'+attrId+'"]', adjust)
    
    }  

    removeLine(eltNode) {
        eltNode.addEventListener('click', (e) => {
            e.stopPropagation()
            let attrUuid = e.target.getAttribute('uuid')
            document.querySelector('div[uuid="'+attrUuid+'"]').remove()
        })
    }

    createLine(elt, adjust) {
        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.left = adjust.x +'%'
        div.style.top = adjust.y +'%'
        div.style.bottom = '0px'
        div.style.height = '100%'
        div.style.width = '3px'
        div.style.borderRadius = '5px 5px'
        div.style.background = this.getColor()
        
        let uuid = Math.random().toString(16).slice(2)
        
        div.setAttribute('uuid', uuid)
        
        document.querySelector(elt).appendChild(div)

        this.removeLine(div)
    }

    getColor() {
        return this.color
    }


}

export {LineGuide}