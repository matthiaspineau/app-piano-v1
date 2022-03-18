class PartitionCreator {

    constructor(info) {
        let data = JSON.parse(info)

        this.title = data.title
        this.composed_by = data.composed_by
        this.arranged_by = data.arranged_by
        this.nb_note_picture = Number(data.nb_note_picture)
        this.ext_note_picture = data.ext_note_picture
        this.official_link = data.official_link
        this.secondary_link = data.secondary_link
        this.part = data.part
        this.version = Number(data.version)
        this.notes_picture = [] 
    }


    generateRowsPictureNoteName() {

        for (var i = 1; i <= this.nb_note_picture; i++) {
            let name
            name = this.formatStringHyphen(this.title) + '-' + this.formatStringHyphen(this.arranged_by)

            if (this.getPart() > 1 || this.getPart() != '') {
                name += '-part_' + this.getPart()
            } 

            if (this.getVersion() > 1 || this.getVersion() != '') {
                name += '-v_' + this.getVersion()
            } 

            name += '-' + i
            name += '.' + this.ext_note_picture
            this.notes_picture.push(name)
        };

    }

    formatStringHyphen(str) {

        return str.trim().replaceAll(' ', '-');
    }

    formatJsonPartionFinal() {
        let json = {}

        json.title = this.title
        json.composed_by = this.composed_by
        json.arranged_by = this.arranged_by
        json.nb_note_picture = this.nb_note_picture
        json.official_link = this.official_link
        json.secondary_link = this.secondary_link
        json.part = this.part
        json.version = this.version
        json.notes_picture = this.notes_picture

        json = JSON.stringify(json)

        return json
    }

    
    formatFolderRepositoryName() {
        let title = this.formatStringHyphen(this.title)

        if (this.getPart() > 1 || this.getPart() != '') {
            title = title + '-part_' + this.getPart()
        } 
        
        if (this.getVersion() > 1 || this.getVersion() != '') {
            title = title + '-v_' + this.getVersion()
        } 
        
        return title + '.json'
    }
    
    formatFilePartitionName() {
        
        let title = this.formatStringHyphen(this.title)

        if (this.getPart() > 1 || this.getPart() != '') {
            title = title + '-part_' + this.getPart()
        } 
        
        if (this.getVersion() > 1 || this.getVersion() != '') {
            title = title + '-v_' + this.getVersion()
        } 
        
        return title
    }
    
    getVersion() {
        return this.version
    }

    getPart() {
        return this.part
    }


}


export { PartitionCreator }