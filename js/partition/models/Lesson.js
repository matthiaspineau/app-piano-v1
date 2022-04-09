import {LineGuide} from './LineGuide.js'

export default class Lesson {

    constructor() {
        this.lesson = document.getElementById('lesson')
        this.titleMusic = ''
        this.newNameLesson = ''
        this.newId = ''
        this.newLesson = ''
        this.lessonsList = []
        this.idsLessons = []
    }

    init() {
        this.lesson.appendChild(this.templateWrapper())
        // this.handler()
      
    }

    templateWrapper() {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `<div class="lesson-wrapper">
                                <div class="lesson-list">pas de lesson</div>
                                <div id="lesson-add" class="lesson-add">créé une lesson</div>
                                <div class="lesson-get">get</div>
                            </div>`
        return wrapper
    }

    getListLessons() {
        
        fetch('repertory-lesson/'+ this.titleMusic + '/list-lesson.json')
        .then( res => res.json())
        .then((data) => {
           
            let ids = data.lessons.ids
            this.newId = Math.max(...ids) + 1
            this.newNameLesson = 'lesson-' + this.newId + '.json'
          
            ids.forEach(elt => {
                this.idsLessons.push(elt)
            });

            this.lesson.appendChild(this.getHtmlLessonsList())

            this.handlerLoadLesson()
            
        })
    }

    getHtmlLessonsList() {
        let ul = document.createElement('ul')
        this.idsLessons.forEach( lesson => {
            let li = document.createElement('li')
            li.setAttribute('id_lesson', lesson)
            li.classList.add('lesson-item')
            li.textContent = 'lesson-' + lesson
            ul.appendChild(li)
        })

        return ul
    }

    handlerLoadLesson() {
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.addEventListener('click', () => {
                this.applyLessonOnCard(item.getAttribute('id_lesson'))
            })
        })
    }

    setTitleMusic(title) {
        this.titleMusic = title
    }
    

    applyLessonOnCard(lesson) {
        fetch(`repertory-lesson/${this.titleMusic}/lesson-${lesson}.json`)
        .then( res => res.json())
        .then((data) => {
            const GuideLine = new LineGuide('.p-card', '#27ae60')
            GuideLine.init() 
            GuideLine.createLesson(data)
        })
    }

    createNewLesson() {

        let lesson = []

        document.querySelectorAll('.p-card').forEach(elt => {

            let card = {
                card_id: "",
                card_line:  [] 
            }

            let needAddCArd = false

            // console.log(elt)

            elt.querySelectorAll('.line_guide').forEach(line => {
                let line_style = {}
                line_style.position = line.style.position
                line_style.left = line.style.left
                line_style.top = line.style.top
                line_style.bottom = line.style.bottom
                line_style.height = line.style.height
                line_style.width = line.style.width
                line_style.borderRadius = line.style.borderRadius
                line_style.background = line.style.background

                // console.log(line_style)
                card.card_line.push(line_style)
                needAddCArd = true
            })

            if (needAddCArd) {

                card.card_id = elt.getAttribute('id_card')
                
                lesson.push(card)
            }
             
        })

        let finalLesson = {
            'lesson': lesson
        }

        finalLesson = JSON.stringify(finalLesson)

        this.setNewLesson(finalLesson)

        // console.log(finalLesson)

    }

    setNewLesson(lesson) {
        this.newLesson = lesson
    }

    getNewLesson() {
        return this.newLesson
    }

    getHtmlCodeNewLesson() {
        let content = this.getNewLesson()
        let html = `<code class="pre-lesson">${content}</code>`
        return html
    }

    getHtmlNewLesson() {
        let html = `<div>
                        <h3>Ajout lesson pour ${this.titleMusic}</h3>
                        
                        <p>Cree le fichier : ${this.newNameLesson} dans le repertoire : repertory-lesson/${this.titleMusic}</p>
                        <p>Nom du fichier: <span>${this.titleMusic}.json</span></p>

                        <p>Nom lesson: <span>${this.newNameLesson}</span></p>

                        <p>Ajouter le numero '${this.newId}' dans le fichier list-lesson.json</p>
                        
                        <p>Dans le fichier lesson.json coller le code
                            <code>
                                ${this.newLesson}
                            </code>
                        </p>
                    </div>`

        return html
    }

    // handler() {
    //     document.getElementById('lesson-add').addEventListener('click', () => {
    //         console.log('click lesson-add')
    //         this.createNewLesson()
    //     })
    // }

   
}
