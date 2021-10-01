export default function FloatingAvatar(props){
    return (
        <div className={'floating-avatar'} style={{
            borderRadius: '50%', position: 'absolute', right: props.right, top: props.top,
            background: `transparent url('${props.img}') no-repeat center center`, backgroundSize: '100%',
            width: props.size, height: props.size, display: 'block',
        }}>
            <div className="blur" style={{
                position: 'absolute', width: '120%', height: '120%',
                top: '-10%', right: '-10%', backdropFilter: `blur(${props.blur})`, borderRadius: '50%'
            }} />
        </div>
    )
}