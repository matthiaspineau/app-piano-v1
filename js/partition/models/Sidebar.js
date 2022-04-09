export default class Sidebar {

    constructor() {

        this.id_ref = 'view-partition__sidebar'

    }

    init() {
        this.templateLessons()
    }

    templateLessons() {
        let templateLessons = document.createElement('div')
        templateLessons.setAttribute('id', 'sidebar-lessons') 

        templateLessons.innerHTML = `
            <div id="add_lesson">ajouter lesson</div>
        `

        document.getElementById(this.id_ref).appendChild(templateLessons)
    }

    templateLessonsAdd() {
        
    }

    handlerAddLesson() {
        document.getElementById('add_lesson').addEventListener('click', () => {
            console.log('save lesson')
             
        })
    }


}