import dynamic from 'next/dynamic';

function Dynamic(props){
    return (
        <>
            {props.children}
        </>
    )
}

export default dynamic(() => Promise.resolve(Dynamic), { ssr:false })