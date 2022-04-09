export default class FieldSheetsMusic {


    constructor() {
        this.nodeParent = 'partition-list'
        this.optionViewPartition = document.getElementById('option-view-partition')
        this.btnLoadFile = document.getElementById('load')
    }

    init() {
        fetch('data-json/list-partition.json')
        .then( res => res.json())
        .then((data) => {
            this.FieldSheetsMusic = data.partitions 

            this.createSelectFieldSheetsMusic()   
            this.sheetMusicOnChange() 
        })
    }

 

    createSelectFieldSheetsMusic() {

        let select
        select = document.createElement('select')
        select.setAttribute('id', 'sheets-music')
        select.setAttribute('name', 'sheets-music')
        select.classList.add('form-control')
        select.classList.add('form-control-sm')
     
        let htmlOptions = `<option value="default" default>Selectionner un titre</option>`
        let jsonPath
     
        this.FieldSheetsMusic.forEach(elt => {
   
            jsonPath = elt['path-json']
            
            htmlOptions = `<option value="${jsonPath}">${elt.title}</option>`
            select.innerHTML += htmlOptions

        })

        document.getElementById(this.nodeParent).appendChild(select)
    
    }

    sheetMusicOnChange() {
        document.getElementById('sheets-music').addEventListener('change', (e) => {
            let sheetMusicSelected = e.target.value
            this.sheetMusicPathRepertory = sheetMusicSelected
            this.sheetMusicPathJson = sheetMusicSelected

            if (sheetMusicSelected != 'default') {
                this.optionViewPartition.classList.add('is-visible')
                this.optionViewPartition.classList.remove('is-hidden')
            } else {
                this.optionViewPartition.classList.remove('is-visible')
                this.optionViewPartition.classList.add('is-hidden')
            }
        })
    }

    // loadFile() {
    //     this.pathJson = this.sheetMusicPathRepertory.dataset.pathJson
    //     this.pathRepertory = this.sheetMusicPathRepertory.dataset.pathRepertory
    // }

}