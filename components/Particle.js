export default function Particle(props) {
    return (
        <div className='particle' style={{
            width: props.width + 'px', height: props.width + 'px',
            borderRadius: '50%', backgroundColor: props.color,
            boxShadow: `0 0 24px -2px ${props.color}`, opacity: '50%', position: 'absolute',
            right: props.right, top: props.top
        }}/>
    )
}