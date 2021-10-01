import {useState} from "react";
import ReactDOM from "react-dom";

export default function OverLaySearch(props){
    const [input, setInput] = useState('');

    const {router} = props;

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleSubmit = (e = null) => {
        if (e !== null){
            e.preventDefault()
        }
        ReactDOM.unmountComponentAtNode(document.getElementById('portal-root'))
        document.body.style.overflow = null;
        router.push({
            pathname: '/search',
            query: {
                query: input
            }
        })
    }
    const handleIcon = () => {
        handleSubmit()
    }
    return (
        <div className={'over-lay-search'}>
            <div className="search-input">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={input} type="text" placeholder={'عبارت مورد نظر را وارد نمایید'} />
                </form>
                <div onClick={handleIcon} className="icon"/>
            </div>
        </div>
    )
}