export default class ColorPicker {

    itemCls = 'color-picker-item'

    colors = {
            c1 : '#27ae60',
            c2 : '#8e44ad',
            c3 : '#2980b9',
            c4 : '#2c3e50',
            c5 : '#95a5a6'
        }
    
 
    constructor() {
        this.wrapper = document.getElementById('color-picker-wrapper')
    }

    init() {
       this.createPickers() 
    }

    createPickers() {
        let span
        for(let key in this.colors) {
            
            span = document.createElement('span')
            span.style.background = this.colors[key]
            span.setAttribute('color', this.colors[key])
            span.classList.add(this.itemCls)
            this.wrapper.appendChild(span)
              
        }
        // this.attachEventOnPickerNode()
    }

    // attachEventOnPickerNode() {
    //     document.querySelectorAll(this.itemCls).forEach(element =>  {
    //         console.log(element.getAttribute('color'))
    //         return element.getAttribute('color')
    //     })
    // }



}