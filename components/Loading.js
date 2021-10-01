import Loader from 'react-loader-spinner';

export default function Loading(){
    return (
        <Loader style={{display: 'flex', justifyContent: 'center'}} type={'Circles'} color={'#003A99'} width={30} height={30}/>
    )
}