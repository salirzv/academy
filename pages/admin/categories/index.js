import Head from 'next/head';
import {useEffect, useState} from "react";
import AdminBase from "../../../components/skeleton/AdminBase";
import {CONSTS} from "../../../contst";
import axios from "axios";
import Loading from "../../../components/Loading";
import ViewCourseTable from "../../../components/pages/admin-panel/course/ViewCourseTable";
import Button from "../../../components/parts/Button";
import NProgress from 'nprogress';
import createFormData from "../../../components/createFormData";
import MessageView from "../../../components/MessageView";


export default function Index() {
    const [categories, setCategories] = useState('pending');

    useEffect(()=>{
        if (categories === 'pending'){
            axios.post(CONSTS.apiName+'admin/categories')
                .then(response => {
                    let data = JSON.parse(response.data)
                    setCategories(data)
                })
        }
    }, [categories])

    const handleNewCategory = () => {
        NProgress.start();
        let form = createFormData([
            document.getElementById('en-name'),
            document.getElementById('fa-name')
        ])
        axios.post(CONSTS.apiName+'admin/categories/new', form)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data)
                if (data.hasError){
                    MessageView('danger', data.errorMessage)
                }else{
                    setCategories('pending')
                    MessageView('success', 'با موفقیت اظافه شد');
                }
            })

    }

    return (
        <>
            <AdminBase>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین | دسته بندی ها</title>
                </Head>
                <div className="dash-title">دسته بندی ها</div>
                {categories === 'pending' ? <Loading /> : (() => {
                    return (
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th>نام فارسی</th>
                                    <th>نام انگلیسی</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{e.faName}</td>
                                            <td>{e.enName}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </>
                    )
                })()}
                <div className="dash-title">دسته بندی جدید</div>
                <label htmlFor="en-name">اسم انگلیسی</label>
                <input type="text" id={'en-name'}/>
                <label htmlFor="fa-name">اسم فارسی</label>
                <input type="text" id={'fa-name'}/>
                <Button click={handleNewCategory} style={{display: 'block'}} type={'primary'}>ثبت</Button>

            </AdminBase>
        </>
    )
}