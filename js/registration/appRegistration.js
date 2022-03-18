import {PartitionCreator} from './models/PartitionCreator.js'

const btnSaveInformation = document.getElementById('btn-save-information')
const restitFolderName = document.getElementById('restit-folder-name')
const restitFileName = document.getElementById('restit-file-name')
const restitPartionFinal = document.getElementById('restit-json-partion-final')
// const formRegistrationPartionInformation = document.getElementById('form-registration-partion-information')


btnSaveInformation.addEventListener('click', function(e) {
    e.preventDefault()

    const formRegistrationPartionInformation = document.getElementById('form-registration-partion-information')
    let formData = new FormData(formRegistrationPartionInformation)

    let data = {};

    for (let [key, value] of formData) {
        data[key] = value;
    }

    data = JSON.stringify(data);

  

    const newPartitionCreator  = new PartitionCreator(data)
    // console.log(newPartitionCreator)
    newPartitionCreator.generateRowsPictureNoteName()

    restitFolderName.innerHTML =  newPartitionCreator.formatFolderRepositoryName()
    restitFileName.innerHTML =  newPartitionCreator.formatFilePartitionName()
    restitPartionFinal.innerHTML = newPartitionCreator.formatJsonPartionFinal()


    // restitPartionFinal.addEventListener('click', function(e){
    
    //     var content = JSON.stringify(restitPartionFinal.innerHTML);

    //     navigator.clipboard.writeText(restitPartionFinal)
    //         .then(() => {
    //         console.log("Text copied to clipboard...")
    //     })
    //         .catch(err => {
    //         console.log('Something went wrong', err);
    //     })
    // });
    


})