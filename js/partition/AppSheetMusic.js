import _DropDown from '../general/class/DropDown.js'
import _ColorPicker from './models/ColorPicker.js'
import _SheetCodeMusic from './models/SheetCodeMusic.js'
import _FieldSheetsMusic from './models/FieldSheetsMusic.js'
import _Lesson from './models/Lesson.js'
import _Modal from '../general/class/Modal.js'


export default class AppSheetMusic {

    constructor() {

    }

    main() {
 
        const DropDown = new _DropDown()
        DropDown.init()

        const FieldSheetsMusic = new _FieldSheetsMusic()
        FieldSheetsMusic.init()

        const SheetCodeMusic = new _SheetCodeMusic()

        const ColorPicker = new _ColorPicker
        ColorPicker.init()

        const Lesson = new _Lesson()
        Lesson.init()
        

        const Modal = new _Modal()


    

        FieldSheetsMusic.btnLoadFile.addEventListener('click', () => {

            fetch('data-json/'+FieldSheetsMusic.sheetMusicPathJson+'.json')
            .then( res => res.json())
            .then((data) => {

                SheetCodeMusic.init(data, FieldSheetsMusic.sheetMusicPathJson)
                SheetCodeMusic.createPartition()

                let cardsPartitions = document.querySelectorAll('.p-card')
                nbAllCards.textContent = '- ' + cardsPartitions.length
                Lesson.setTitleMusic(SheetCodeMusic.container.getAttribute('sheet-code-music'))

                Lesson.getListLessons()
            })
        })


        // open modal
        document.getElementById('click_1').addEventListener('click', () => {
            Modal.init()
        })

        // add lesson
        document.getElementById('lesson-add').addEventListener('click', () => {
        
            
            Lesson.createNewLesson()

            Modal.init()
            Modal.injectContent(Lesson.getHtmlNewLesson())

        })

        // get lesson
        // document.querySelector('.lesson-get').addEventListener('click', () => {
        //    Lesson.applyLessonOnCard()

        // })


        const containerListCard = document.getElementById('container-list-card')
        const btnOnColumn = document.querySelectorAll('.on-column')
        const btnOpenSidebar = document.getElementById('btn-open-sidebar')
        const btnCloseSidebar = document.getElementById('btn-close-sidebar')
        const containerSidebar = document.getElementById('view-partition__sidebar')
        const btnDrillDown = document.getElementById('btn-drill-down')
        const formOptionLimitCards = document.getElementById('option-limit-card-form')
        const nbAllCards = document.getElementById('nb-all-cards')

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
    }

} 