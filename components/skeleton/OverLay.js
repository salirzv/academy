import ReactDOM from 'react-dom';
import {useEffect} from "react";

export default function OverLay(props){
    const styles = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999
    }

    useEffect(function (){
        document.body.style.overflow = 'hidden'
    })

    function handleClick(e){
        if (e.target.classList.contains('over-lay')) {
            ReactDOM.unmountComponentAtNode(document.getElementById('portal-root'))
            document.body.style.overflow = null;
        }
    }
    return (
        <div onClick={handleClick} style={styles} className={'over-lay'}>
            {props.children}
        </div>
    )
}