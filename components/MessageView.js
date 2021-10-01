import Noty from 'noty';

export default function MessageView(type, message){
    if (type === 'danger'){
        new Noty({
            theme: 'bootstrap-v4',
            type: 'error',
            layout: 'bottomRight',
            text: message,
            timeout: 3000
        }).show()
    }
    if (type === 'success'){
        new Noty({
            theme: 'bootstrap-v4',
            type: 'success',
            layout: 'bottomRight',
            text: message,
            timeout: 3000
        }).show()
    }
}