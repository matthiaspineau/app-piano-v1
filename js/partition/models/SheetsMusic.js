export default class SheetsMusic {


    constructor() {
        this.nodeParent = 'partition-list'
        this.optionViewPartition = document.getElementById('option-view-partition')
        this.btnLoadFile = document.getElementById('load')
    }

    init() {
        fetch('data-json/list-partition.json')
        .then( res => res.json())
        .then((data) => {
            this.sheetsMusic = data.partitions 

            this.createSelectSheetsMusic()   
            this.sheetMusicOnChange() 
        })
    }

 

    createSelectSheetsMusic() {

        let select = document.createElement('select')
        select.setAttribute('id', 'sheets-music')
        select.setAttribute('name', 'sheets-music')
        select.classList.add('form-control')
        select.classList.add('form-control-sm')
     
        let htmlOptions = `<option value="default" default>Selectionner un titre</option>`
        let jsonPath
     
        this.sheetsMusic.forEach(elt => {
   
            jsonPath = elt['path-json']
            
            htmlOptions = `<option value="${jsonPath}">${elt.title}</option>`
            select.innerHTML += htmlOptions

        })

        document.getElementById(this.nodeParent).appendChild(select)
    
    }

    sheetMusicOnChange() {
        document.getElementById('sheets-music').addEventListener('change', (e) => {
            let value = e.target.value
            this.sheetMusicPathRepertory = value
            this.sheetMusicPathJson = value

            console.log(this.sheetMusicPathJson)

            if (value != 'default') {
                    this.optionViewPartition.classList.add('is-visible')
                    this.optionViewPartition.classList.remove('is-hidden')
                } else {
                    this.optionViewPartition.classList.remove('is-visible')
                    this.optionViewPartition.classList.add('is-hidden')
                }
        })
    }

    loadFile() {
        this.pathJson = this.sheetMusicPathRepertory.dataset.pathJson
        this.pathRepertory = this.sheetMusicPathRepertory.dataset.pathRepertory
    }

}