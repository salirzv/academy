import Link from 'next/link';

const EmptyList = (props) => {
    return (
        <>
            <div className="empty-list-container">
                <div className="empty-list-image">
                    <img draggable={'false'}  src="/img/empty-list.png" alt=""/>
                </div>
                <div className="empty-text">
                    موردی جهت نمایش وجود ندارد
                </div>
                {props.withlink ? <div className={'go-to-page'}>
                    <p>دوره های آموزشی در <Link href={'/search'}><a>این قسمت</a></Link> قابل مشاهده هستند</p>
                </div> : null}
            </div>
        </>
    )
}

export default EmptyList;