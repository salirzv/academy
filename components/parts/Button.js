export default function Button(props){
    if (props.type === 'primary'){
        return (
            <button onClick={props.click} className={'btn primary'} style={props.style}>{props.children}</button>
        )
    }
    if (props.type === 'success'){
        return (
            <button onClick={props.click} className={'btn btn-success'} style={props.style}>{props.children}</button>
        )
    }
}