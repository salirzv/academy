export default function createFormData(array){
    let formData = new FormData();
    array.forEach((e)=>{
        if (e.getAttribute('type') === 'file'){
            formData.append(e.id, e.files[0]);
        }else{
            formData.append(e.id, e.value);
        }
    })
    return formData;
}