import PanelCourseView from "./PanelCourseView";

export default function UserCreatedCourses(props){
    if (props.courses.length !== 0){
        return (
            props.courses.map((e, index)=>{
                return <PanelCourseView key={index} course={e} />
            })
        )
    }else{
        return (
            <div>empty</div>
        )
    }
}