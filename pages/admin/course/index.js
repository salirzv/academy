import Head from 'next/head';
import {useEffect, useState} from "react";
import AdminBase from "../../../components/skeleton/AdminBase";
import {CONSTS} from "../../../contst";
import Button from "../../../components/parts/Button";
import {useRouter} from "next/router";
import NProgress from "nprogress";
import createFormData from "../../../components/createFormData";
import axios from "axios";
import MessageView from "../../../components/MessageView";
import Loading from "../../../components/Loading";
import ViewCourseTable from "../../../components/pages/admin-panel/course/ViewCourseTable";


export default function index() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.post(CONSTS.apiName+'admin/course/list')
            .then(response => {
                setLoading(!loading)
                let data = JSON.parse(response.data)
                if (data.length !== 0){
                    setCourses(data);
                }
            })
    }, [])

    return (
        <>
            <AdminBase>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین | دوره ها</title>
                </Head>
                <div className="dash-title">لیست دوره ها</div>
                {loading ? <Loading/> : <ViewCourseTable courses={courses} />}
            </AdminBase>
        </>
    )
}