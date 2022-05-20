export default class Note {

    alphanumeric = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#']
    syllabic = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do #', 're #', 'mi #', 'fa #', 'sol #']
    numbered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    number_selected

    constructor() {

    }

    init() {
        this.notesListing = document.querySelectorAll('.note_key')
        this.cardScreenShot = document.querySelectorAll('.p-card')
        this.handlerSelectNoteFromListing()
    }

    handlerInsertNoteInCardScreenShot() {
          this.cardScreenShot.forEach(elt => {
            elt.addEventListener('click', (e) => {
                this.insertNote(e)
            })
        }) 
    }

    insertNoteFromLesson(notesLesson) {

        notesLesson.notes.forEach(notes => {
            let card = document.querySelectorAll('.p-card [id_card_media="'+ notes.card_id +'"]')
            console.log(card)
            notes.card_notes.forEach(note => {
                let div = document.createElement('div')
                div.classList.add('note')
                div.setAttribute('id-card-parent', notes.card_id)
                div.setAttribute('id-note', note.id_note)
                div.setAttribute('id-keyboard', note.id_keyboard)
                div.setAttribute('id-text', note.id_text)
                div.textContent = note.id_text
                div.style.top = note.top
                div.style.left = note.left
                card[0].appendChild(div)
            })

        })
    }

    insertNote(e) {
        let height = e.target.offsetHeight
        let width = e.target.offsetWidth
        let layerX = e.layerX
        let layerY = e.layerY
        let attrId = e.target.parentNode.getAttribute('id_card_media')
    
        let valueX = ((layerX / width) * 100) - 3
        let valueY = ((layerY / height) * 100) - 3
    
        let adjust = {
            x: valueX,
            y: valueY,
        }

        let params = {
            id_card: attrId, 
            id_note: this.number_selected,
            id_keyboard: this.alphanumeric[this.number_selected - 1],
            id_text: this.alphanumeric[this.number_selected - 1]
        }

    
        this.noteTemplate('div[id_card_media="'+attrId+'"]', adjust, params)
    }


    noteTemplate(elt, adjust, params) {

        let div = document.createElement('div')
        div.classList.add('note')

        //params
        div.setAttribute('id-card-parent', params.id_card)
        div.setAttribute('id-note', params.id_note)
        div.setAttribute('id-keyboard', params.id_keyboard)
        div.setAttribute('id-text', params.id_text)
        div.setAttribute('uuid-note', Math.random().toString(16).slice(2))

        // adjust
        div.style.position = 'absolute'
        div.style.left = adjust.x +'%'
        div.style.top = adjust.y +'%'
        
        // text
        div.textContent = params.id_text
        
        document.querySelector(elt).appendChild(div)

        this.handlerRemoveNote(div)
    }

    handlerSelectNoteFromListing() {

        this.notesListing.forEach(elt => {
            elt.addEventListener('click', () => {
                let id_key = elt.getAttribute('id-note-key')
                this.number_selected = id_key
            })
        }) 

        this.handlerInsertNoteInCardScreenShot()
    }

    handlerRemoveNote(eltNode) {
        eltNode.addEventListener('click', (e) => {
            e.stopPropagation()
            let attrUuidNote = e.target.getAttribute('uuid_note')
            document.querySelector('div[uuid_note="'+attrUuidNote+'"]').remove()
        })
    }
    

    saveNotes() {

        let notes_saved = []
        let needAddCard = false
        

        document.querySelectorAll('.p-card').forEach( elt => {

            let card = {
                card_id: "",
                card_notes:  [] 
            }

            needAddCard = false

            elt.querySelectorAll('.note').forEach(note => {
                let note_param = {}
                note_param.position = note.style.position
                note_param.top = note.style.top
                note_param.left = note.style.left
                // note_style.bottom = note.style.bottom
                note_param.background = note.style.background

                note_param.id_card_parent = note.getAttribute('id-card-parent')
                note_param.id_note = note.getAttribute('id-note')
                note_param.id_keyboard = note.getAttribute('id-keyboard')
                note_param.id_text = note.getAttribute('id-text')

                // console.log(note_style)
                card.card_notes.push(note_param)
                needAddCard = true
            })

            if (needAddCard) {

                card.card_id = elt.getAttribute('id_card')
                
                notes_saved.push(card)
            }

        })

        let notes_lesson = {
            'notes': notes_saved
        }

        notes_lesson = JSON.stringify(notes_lesson)

        return notes_lesson

    }

}