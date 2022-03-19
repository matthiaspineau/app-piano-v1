import {LineGuide} from './partition/models/LineGuide.js'

/**
 * insert toute les cards dans la target
 * @param {array} data 
 * @param {string} repertory 
 * @param {Node element} target 
 */
function createPartition(data,repertory, target) {
    let path = 'repertory-partition/' +repertory +'/'
    let i = 0
    target.innerHTML = ''
    data.notes_picture.forEach(element => {
        let card = createCardPartionImg(path + element, i)
        i++
        target.innerHTML += card
    });
    const GuideLine = new LineGuide('.p-card')
    GuideLine.init()   
}


/**
 * 
 * @param {string} path 
 * @param {number} id 
 * @returns HTMLelement
 */
function createCardPartionImg(path, id) {

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

export {createPartition, createCardPartionImg}