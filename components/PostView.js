import Image from "next/image";

export  default function PostView(props){
    return (
        <div className={'post-view'}>
            <div className="image">
                <Image src={props.img} layout={'fill'}/>
            </div>
            <div className="title">
                <a href={props.link}>{props.title}</a>
            </div>
            <div className="desc">
                {props.desc}
            </div>
            <div className="options">
                <div className="date">{props.date}</div>
                <div className="category">{props.category}</div>
                <div className="more">
                    <a href={props.link}>مطالعه کامل</a>
                </div>
            </div>
        </div>
    )
}