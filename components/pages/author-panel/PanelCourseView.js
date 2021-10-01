import Link from 'next/link';
import {useEffect, useState} from "react";
import {CONSTS} from "../../../contst";
import Button from "../../parts/Button";

export default function PanelCourseView(props) {
    const [courseStatus, setCourseStatus] = useState(null);

    useEffect(()=>{
        switch (props.course.status){
            case 'pending-review':
                setCourseStatus('در حال بررسی');
                break;
        }
    }, [])

    return (
        <div className='panel-course-view-item'>
            <div className="image">
                <img src={CONSTS.imageApi+props.course.image} />
            </div>
            <div className="title">
                {props.course.title}
            </div>
            <div className="status">
                وضعیت: {courseStatus}
            </div>
            <div className="operation">
                <Button type={'primary'}><Link href={'#'}><a>ویرایش و افزودن جلسه جدید</a></Link></Button>
            </div>
        </div>
    )
}