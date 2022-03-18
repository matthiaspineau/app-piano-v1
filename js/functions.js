import {LineGuide} from './partition/models/LineGuide.js'

const GuideLine = new LineGuide()


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
    createEventDrawLineGuide()
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

/**
 * create Event Draw LineGuide
 */
function createEventDrawLineGuide() {
    document.querySelectorAll('.p-card').forEach(elt => {
        elt.addEventListener('click', drawLineGuide)
    })
}

/**
 * Draw line guide
 * @param {*} data 
 * @param {*} nodeTarget 
 */
function drawLineGuide(e) {
    console.log(e.layerY)
    let layerY = e.layerY
    let layerX = e.layerX
    let parent = e.target.parentNode
    let attrId = parent.getAttribute('id_card_media')

    let adjust = {
        x: layerX,
        y: layerY
    }

    GuideLine.createLine('div[id_card_media="'+attrId+'"]', adjust)

}

/**
 * cree 'option' du champ select partition
 * @param {array} data 
 * @param {node element} nodeTarget 
 */
function createOptionListPartition(data, nodeTarget) {
let html = `<option value="default" default>Selectionner un titre</option>`
    nodeTarget.innerHTML += html
    data.forEach(elt => {

        let jsonPath = elt['path-json']
      
        html = `<option value="${jsonPath}">${elt.title}</option>`
        nodeTarget.innerHTML += html
    })
}

/**
 * recupere la liste des partions
 * @param {node element} nodeTarget 
 */
function getListPartition(nodeTarget) {
    let list
    fetch('data-json/list-partition.json')
    .then( res => res.json())
    .then((data) => {
        list = data.partitions
        createOptionListPartition(list,nodeTarget)

    })
}

// function fetchListPartition() {
//     fetch('data-titre/list-partition.json')
//     .then( res => res.json())
//     .then((data) => {
//         return data.partitions
//     })
// }

export {createPartition, createCardPartionImg, getListPartition}