import Image from 'next/image'
import Link from 'next/link'

export default function CourseView(props) {
    return (
        <div style={props.styles} className='course-view-item'>
            <div className="image">
                <Image src={props.img} layout={'fill'}/>
            </div>
            <div className="title">
                <Link href={`/course/${props.slug}`}><a>{props.title}</a></Link>
            </div>
            <div className="desc">
                {props.desc}
            </div>
            <div className="author">
                <div className="image-container">
                    <div className="author-image">
                        <Image src={props.author.image} layout={"fill"}/>
                    </div>
                </div>
                <div className="name">
                    {props.author.name}
                </div>
            </div>
            <div className="options">
                <div className="right">
                    <div className="right-item">
                        <div id={'clock'} className="icon" />
                        <div className="text">{props.course.duration} ساعت</div>
                    </div>
                    <div className="right-item">
                        <div id={'camera'} className="icon" />
                        <div className="text">{props.course.sessions} جلسه</div>
                    </div>
                    <div className="right-item">
                        <div className="text">{props.course.price.toLocaleString()} تومان</div>
                    </div>
                </div>
            </div>
        </div>
    )
}