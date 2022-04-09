import {LineGuide} from './LineGuide.js'

export default class SheetCodeMusic {

    constructor() {
        this.container = document.getElementById('container-list-card') 
    }

    init(data, repertory) {
        this.container.setAttribute('sheet-code-music', repertory)
        this.sheetCodeMusic = data
        this.basePath = 'repertory-partition/'
        this.endPath = repertory  + '/'
        this.repertoryPath = this.basePath + this.endPath
        this.countPictures = data.notes_picture.length
    }

    createPartition() {

        let i = 0
        this.container.innerHTML = ''
        this.sheetCodeMusic.notes_picture.forEach(element => {
            i++
            this.container.innerHTML += this.createCard(this.repertoryPath + element, i)
        });
        
        const GuideLine = new LineGuide('.p-card', '#27ae60')
        GuideLine.init()  
        
    }


    /**
     * 
     * @param {string} path 
     * @param {number} id 
     * @returns HTMLelement
     */
    createCard(path, id) {

        let html =  `<div id="image-${id + 1}" id_card="${id + 1}" id_numero=${id + 1} class="p-card">
                        <div class="p-card__media" id_card_media="${id + 1}">
                            <img class="p-card__img" src="${path}" alt="" id_card_img="${id + 1}">
                        </div>
                        <div class="p-card__info is-open">
                            <h5>N°${id + 1}</h5>
                            <p>${path}</p>
                        </div>
                    </div>`

        return html
    }


    

}