import {createPartition} from './functions.js'
import CLSWallpaperCloser from './general/class/WallpaperCloser.js'
import CLSColorPicker from './partition/models/ColorPicker.js'
import CLSSheetsMusic from './partition/models/SheetsMusic.js'
import { Router } from './router/router.js'


const containerListCard = document.getElementById('container-list-card')
const btnOnColumn = document.querySelectorAll('.on-column')
const btnOpenSidebar = document.getElementById('btn-open-sidebar')
const btnCloseSidebar = document.getElementById('btn-close-sidebar')
const containerSidebar = document.getElementById('view-partition__sidebar')
const btnDropdownControlCol = document.getElementById('dropdown-control-col__btn')
const contentDropdownControlCol = document.getElementById('dropdown-control-col__content')
const btnDrillDown = document.getElementById('btn-drill-down')
const formOptionLimitCards = document.getElementById('option-limit-card-form')
const nbAllCards = document.getElementById('nb-all-cards')
const optionViewPartition = document.getElementById('option-view-partition')



window.addEventListener("DOMContentLoaded", (event) => {

    const RouterSite = new Router
    RouterSite.init()

    const WallpaperCloser = new CLSWallpaperCloser()

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
            WallpaperCloser.btnWallpaperCloser.dataset.closer = ''
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
    WallpaperCloser.openWallpaperCloser()
    WallpaperCloser.btnWallpaperCloser.dataset.closer = 'drowper-col'
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
 * btn wallpaper closer
 */
 WallpaperCloser.btnWallpaperCloser.addEventListener('click', function() {
    WallpaperCloser.removeWallpaperCloser()
    WallpaperCloser.btnWallpaperCloser.dataset.closer = 'drowper-col'

    let eltTargetWantClosing = WallpaperCloser.btnWallpaperCloser.dataset.closer

    switch (eltTargetWantClosing) {
        case 'drowper-col':
            contentDropdownControlCol.classList.remove('is-open')
            WallpaperCloser.removeWallpaperCloser()
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

// -------------
document.querySelectorAll('.component-dropdown-btn').forEach(element => {
    element.addEventListener('click', () => {
        let ref = element.getAttribute('drop-btn-ref')
        WallpaperCloser.openWallpaperCloser()
        WallpaperCloser.setRefNeedClose(ref)
        switch (ref) {
            case 'color-picker':
                toggleContent(ref)  
                break;
        
            default:
                break;
        }
    })
});

function toggleContent(contentRef) {

    let element = document.querySelector('.component-dropdown-content[drop-content-ref="'+ contentRef +'"]')
    let isOpen = element.classList.contains('is-open')

    if (isOpen) {
        element.classList.remove('is-open')
    } else {
        element.classList.add('is-open')
    }
}



});
