class LineGuide {

    constructor(node, color) {
       this.targetNodes = document.querySelectorAll(node)
       this.color = color
    }

    init() {
        this.targetNodes.forEach(element => {
            element.addEventListener('click', (e) => {
                this.drawLineGuide(e)
            })
        });
    }

    createLesson(data) {
        data.lesson.forEach( elt => {
            
            elt.card_line.forEach( line  => {
                let adjust = {
                    fromLesson: true,
                    position: line.position,
                    left: line.left,
                    top: line.top,
                    bottom: line.bottom,
                    height: line.height,
                    width: line.width,
                    borderRadius: line.borderRadius,
                    background: line.background,
                }
                this.createLine('div[id_card_media="'+elt.card_id+'"]', adjust)
            })
        })
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
            fromLesson: false,
            x: valueX,
            y: valueY,
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
        div.classList.add('line_guide')

        if (!adjust.fromLesson) {

            div.style.position = 'absolute'
            div.style.left = adjust.x +'%'
            div.style.top = adjust.y +'%'
            div.style.bottom = '0px'
            div.style.height = '100%'
            div.style.width = '3px'
            div.style.borderRadius = '5px 5px'
            div.style.background = this.getColor()

        } else {
            div.style.position = adjust.position
            div.style.left = adjust.left
            div.style.top = adjust.top
            div.style.bottom = adjust.bottom
            div.style.height = adjust.height
            div.style.width = adjust.width
            div.style.borderRadius = adjust.borderRadius
            div.style.background = adjust.background
        }

        
        let uuid = Math.random().toString(16).slice(2)
        
        div.setAttribute('uuid', uuid)
        
        document.querySelector(elt).appendChild(div)

        this.removeLine(div)
    }

    getColor() {
        return this.color
    }

    setColor(color) {
        this.color = color
    }


}

export {LineGuide}