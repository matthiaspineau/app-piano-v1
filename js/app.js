import {createPartition, createCardPartionImg, getListPartition} from './functions.js'

const link = document.querySelectorAll('.link')
const viewPartition = document.getElementById('view-partition')
const viewFormulaire = document.getElementById('view-formulaire')
const viewTest = document.getElementById('view-test')
const containerListCard = document.getElementById('container-list-card')
const btnLoadFile = document.getElementById('load')
const btnOnColumn = document.querySelectorAll('.on-column')
const btnOpenSidebar = document.getElementById('btn-open-sidebar')
const btnCloseSidebar = document.getElementById('btn-close-sidebar')
const containerSidebar = document.getElementById('view-partition__sidebar')
const btnDropdownControlCol = document.getElementById('dropdown-control-col__btn')
const contentDropdownControlCol = document.getElementById('dropdown-control-col__content')
const partitionList = document.getElementById('partition-list')
const titleOnLoad = document.getElementById('title-on-load')
const btnDrillDown = document.getElementById('btn-drill-down')
const btnWallpaperCloser = document.getElementById('wallpaper-closer')
const formOptionLimitCards = document.getElementById('option-limit-card-form')
const nbAllCards = document.getElementById('nb-all-cards')
const optionViewPartition = document.getElementById('option-view-partition')

/**
 * router link
 */
link.forEach(elt =>  {
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

/**
 * load title partition for select form
 */
window.addEventListener("DOMContentLoaded", (event) => {
    getListPartition(partitionList)
});

/**
 * select partion for loading
 */
partitionList.addEventListener('change', function(event) {
    let value = event.target.value
    titleOnLoad.dataset.pathRepertory = value
    titleOnLoad.dataset.pathJson = value
    if (value != 'default') {
        optionViewPartition.classList.add('is-visible')
        optionViewPartition.classList.remove('is-hidden')
    } else {
        optionViewPartition.classList.remove('is-visible')
        optionViewPartition.classList.add('is-hidden')
    }
})

/**
 * load partition
 */
btnLoadFile.addEventListener('click', function() {
    let pathJson = titleOnLoad.dataset.pathJson
    let pathRepertory = titleOnLoad.dataset.pathRepertory
    
    fetch('data-json/'+pathJson+'.json')
    .then( res => res.json())
    .then((data) => {
        createPartition(data,pathRepertory, containerListCard)
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
            btnWallpaperCloser.dataset.closer = ''
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
 * open select columns
 */
btnDropdownControlCol.addEventListener('click', function() {
    contentDropdownControlCol.classList.toggle('is-open')
    openWallpaperCloser()
    btnWallpaperCloser.dataset.closer = 'drowper-col'
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
 * open wallpaper closer
 */
function openWallpaperCloser() {
    btnWallpaperCloser.classList.add('is-open')
}
/**
 * remove wallpaper closer
 */
 function removeWallpaperCloser() {
    btnWallpaperCloser.classList.remove('is-open')
    btnWallpaperCloser.dataset.closer = ''
}

/**
 * btn wallpaper closer
 */
btnWallpaperCloser.addEventListener('click', function() {
    removeWallpaperCloser()
    btnWallpaperCloser.dataset.closer = 'drowper-col'

    let eltTargetWantClosing = btnWallpaperCloser.dataset.closer

    switch (eltTargetWantClosing) {
        case 'drowper-col':
            contentDropdownControlCol.classList.remove('is-open')
            removeWallpaperCloser()
            break;
        default:
            break;
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


