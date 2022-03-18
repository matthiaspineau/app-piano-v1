class Api {

    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this.url = url
    }
    
    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log('error Api', err))
    }
}

class NoteApi extends Api {

    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getNotes() {
        return await this.get()
    }

}