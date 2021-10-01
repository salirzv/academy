import Head from 'next/head';
import {Fragment, useEffect, useState} from "react";
import AdminBase from "../../../components/skeleton/AdminBase";
import {CONSTS} from "../../../contst";
import Button from "../../../components/parts/Button";
import {useRouter} from "next/router";
import NProgress from "nprogress";
import createFormData from "../../../components/createFormData";
import axios from "axios";
import MessageView from "../../../components/MessageView";
import Loading from "../../../components/Loading";


export default function Index() {
    const router = useRouter();

    const [categories, setCategories] = useState('pending');

    useEffect(() => {
        axios.post(CONSTS.apiName + 'admin/categories')
            .then(response => {
                let data = JSON.parse(response.data)
                setCategories(data)
            })

    }, [])

    function handleClick() {
        NProgress.start();
        let categories = [];
        document.querySelectorAll('input[name="category[]"]:checked').forEach(e => {
            categories.push(e.value)
        })
        if (categories.length === 0){
            MessageView('danger', 'دسته بندی انتخاب نشده');
            return;
        }
        let form = createFormData([
            document.getElementById('title'),
            document.getElementById('slug'),
            document.getElementById('level'),
            document.getElementById('desc'),
            document.getElementById('price'),
            document.getElementById('author-desc'),
            document.getElementById('course-image'),
        ])
        form.append('categories', JSON.stringify(categories));

        axios.post(CONSTS.apiName + 'admin/course/newcourse', form)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    MessageView('success', 'دوره اظافه شد')
                    router.push('/admin/course')
                    console.log(data)
                }
            })
    }

    return (
        <>
            <AdminBase>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین | دوره جدید</title>
                </Head>
                <div className="dash-title">
                    دوره جدید
                </div>
                <label htmlFor="title">عنوان دوره</label>
                <input type="text" id={'title'}/>
                <label htmlFor="slug">عنوان دوره به انگلیسی</label>
                <input type="text" id={'slug'}/>
                <label htmlFor="desc">توضیحات دوره</label>
                <textarea style={{height: '300px'}} type="text" id={'desc'}/>
                <label htmlFor="level">سطح دوره</label>
                <select id={'level'}>
                    <option value="1">مقدماتی</option>
                    <option value="2">متوسط</option>
                    <option value="3">پیشرفته</option>
                </select>
                <label htmlFor="price">قیمت دوره</label>
                <input type="number" id={'price'}/>
                <label htmlFor="author-desc">توضیحات نویسنده</label>
                <input type="text" id={'author-desc'}/>
                <label htmlFor="course-image">تصویر دوره</label>
                <input type="text" id={'course-image'}/>
                <label htmlFor="category">دسته بندی</label>
                {categories === 'pending' ? <Loading /> : (()=>{
                    if (categories.length !== 0){
                        return (
                            <>
                                {categories.map((e, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div>
                                                <label style={{display: 'inline-block', width: '200px'}}>{e.faName}</label>
                                                <input type="checkbox" name={'category[]'} value={e.enName}/>
                                            </div>
                                        </Fragment>
                                    )
                                })}
                            </>
                        )
                    }
                })()}
                <Button click={handleClick} style={{display: 'block', margin: '10px auto'}}
                        type={'primary'}>ثبت</Button>
            </AdminBase>
        </>
    )
}