// import {createPartition} from './functions.js'
import CLSDropDown from './general/class/DropDown.js'
import CLSColorPicker from './partition/models/ColorPicker.js'
import CLSSheetsMusic from './partition/models/SheetsMusic.js'
import { Router } from './router/router.js'
import {LineGuide} from './partition/models/LineGuide.js'

const containerListCard = document.getElementById('container-list-card')
const btnOnColumn = document.querySelectorAll('.on-column')
const btnOpenSidebar = document.getElementById('btn-open-sidebar')
const btnCloseSidebar = document.getElementById('btn-close-sidebar')
const containerSidebar = document.getElementById('view-partition__sidebar')
const btnDrillDown = document.getElementById('btn-drill-down')
const formOptionLimitCards = document.getElementById('option-limit-card-form')
const nbAllCards = document.getElementById('nb-all-cards')

window.addEventListener("DOMContentLoaded", (event) => {
   
    const RouterSite = new Router
    RouterSite.init()

    const DropDown = new CLSDropDown()
    DropDown.init()

    const SheetsMusic = new CLSSheetsMusic()
    SheetsMusic.init()

    const ColorPicker = new CLSColorPicker
    ColorPicker.init()

 

    SheetsMusic.btnLoadFile.addEventListener('click', () => {

        fetch('data-json/'+SheetsMusic.sheetMusicPathJson+'.json')
        .then( res => res.json())
        .then((data) => {
            createPartition(data,SheetsMusic.sheetMusicPathRepertory, containerListCard)
            let cardsPartitions = document.querySelectorAll('.p-card')
            nbAllCards.textContent = '- ' + cardsPartitions.length
        })
    })



/**
 * Choice nb column
 */
btnOnColumn.forEach(elt => {
    elt.addEventListener('click', () => {
        let lastActive = document.querySelector('.on-column[data-active="true"]')
        if (lastActive) {
            lastActive.dataset.active = false
        } 
        elt.dataset.active = true
        containerListCard.dataset.oncol = elt.dataset.column
    })
})

/**
 * open sidebar
 */
btnOpenSidebar.addEventListener('click', function() {
    containerSidebar.classList.add('is-open')
    btnOpenSidebar.classList.add('is-hidden')
})
/**
 * close sidebar
 */
btnCloseSidebar.addEventListener('click', function() {
    containerSidebar.classList.remove('is-open')
    btnOpenSidebar.classList.remove('is-hidden')
})


/**
 * btn drilldown
 */
btnDrillDown.addEventListener('click', function() {
    if (containerListCard.dataset.drill == "true") {
        containerListCard.dataset.drill = false
    } else {
        containerListCard.dataset.drill = true
    }
})

/**
 * event
 * option limit card
 */
formOptionLimitCards.addEventListener('change', function(e) {
    let cardsPartitionsItems = document.querySelectorAll('.p-card')
    let value = Number(e.target.value)
  
    if (value > 0) {
  
        cardsPartitionsItems.forEach(elt => {
            if (Number(elt.getAttribute('id_numero')) < value) {
                elt.classList.add('is-hidden')
            } else {
                elt.classList.remove('is-hidden')
            }
        })

    } else {
        cardsPartitionsItems.forEach(elt => {
            elt.classList.remove('is-hidden')
        })
        formOptionLimitCards.value = 1
    } 
    
})

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
    
    const GuideLine = new LineGuide('.p-card', '#27ae60')
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


});
