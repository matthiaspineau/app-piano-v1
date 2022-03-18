class NoteCard {

    constructor(note) {
        this.note = note
    }

    createNoteCard() {

        const noteCard = `
            <div id="image-${this.note.id + 1}" id_numero="${this.note.id + 1}" class="p-card">
                <div class="p-card__media">
                    <img class="p-card__img" src="${path}" alt="">
                </div>
                <div class="p-card__info is-open">
                    <h5>N°${id + 1}</h5>
                    <p>${path}</p>
                </div>
            </div>
        `
        return noteCard
    }


}

