import Head from 'next/head';
import {useEffect, useState, Fragment} from "react";
import AdminBase from "../../../../components/skeleton/AdminBase";
import {CONSTS} from "../../../../contst";
import Button from "../../../../components/parts/Button";
import {useRouter} from "next/router";
import NProgress from "nprogress";
import createFormData from "../../../../components/createFormData";
import axios from "axios";
import MessageView from "../../../../components/MessageView";
import Loading from "../../../../components/Loading";
import React from "react";

export default function EditCourse() {
    const router = useRouter();
    const query = router.query;
    const [course, setCourse] = useState('pending');
    const [loading, setIsLoading] = useState(true);
    const [sLoading, setSLoading] = useState(true);
    const [sessions, setSessions] = useState();
    const [categories, setCategories] = useState('pending');


    useEffect(() => {
        if (typeof query.slug === 'string') {
            axios.post(CONSTS.apiName + 'admin/course/getSingleCourse/' + query.slug)
                .then(response => {
                    let data = JSON.parse(response.data);
                    setCourse(data);
                    setIsLoading(false)
                })
        }
    }, [query])

    useEffect(() => {
        if (sLoading === false) {
            return
        }
        if (typeof query.slug === 'string') {
            axios.post(CONSTS.apiName + 'admin/course/getsessions/' + query.slug)
                .then(response => {
                    let data = JSON.parse(response.data);
                    setSessions(data);
                    setSLoading(false);
                })
        }
    }, [query, sLoading]);

    useEffect(() => {
        axios.post(CONSTS.apiName + 'admin/categories')
            .then(response => {
                let data = JSON.parse(response.data)
                setCategories(data)
            })

    }, [])

    useEffect(() => {
        if (course !== 'pending' && categories !== 'pending' && !loading){
            const categories = course.categories;
            categories.map(e => {
                document.querySelector(`input[value=${e.enName}]`).checked = true;
            })
        }
    }, [course, categories, loading])

    function handleClick() {
        let categories = [];
        document.querySelectorAll('input[name="category[]"]:checked').forEach(e => {
            categories.push(e.value)
        })
        if (categories.length === 0) {
            MessageView('danger', 'دسته بندی انتخاب نشده');
            return;
        }

        NProgress.start();
        let form = createFormData([
            document.getElementById('title'),
            document.getElementById('slug'),
            document.getElementById('level'),
            document.getElementById('desc'),
            document.getElementById('price'),
            document.getElementById('author-desc'),
            document.getElementById('course-image'),
            document.getElementById('status'),
        ]);
        form.append('course_id', course.id)
        form.append('categories', JSON.stringify(categories));

        axios.post(CONSTS.apiName + 'admin/course/editcourse', form)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    MessageView('success', 'دوره ویرایش شد')
                }
            })
    }

    function handleAddSession() {
        NProgress.start();
        const form = createFormData([
            document.getElementById('session-title'),
            document.getElementById('session-length'),
            document.getElementById('session-file'),
            document.getElementById('is-file'),
            document.getElementById('is-free'),
        ])
        form.append('course-id', course.id);
        axios.post(CONSTS.fileApi + 'admin/newsession', form, {withCredentials: true})
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    MessageView('success', 'جلسه اظافه شد');
                    setSLoading(true);
                }
            })
    }

    function handleEditSession(id) {
        NProgress.start();
        const form = createFormData([
            document.querySelector(`div[data-session-id = "${id}"] #session-title`),
            document.querySelector(`div[data-session-id = "${id}"] #session-length`),
            document.querySelector(`div[data-session-id = "${id}"] #session-file`),
            document.querySelector(`div[data-session-id = "${id}"] #is-file`),
            document.querySelector(`div[data-session-id = "${id}"] #is-free`),
        ])
        axios.post(CONSTS.fileApi + 'admin/editsession/'+id, form, {withCredentials: true})
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    MessageView('success', 'جلسه ویرایش شد');
                    setSLoading(true);
                }
            })
    }

    return (
        <>
            <AdminBase>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین | ویرایش دوره</title>
                </Head>
                {loading ? <Loading/> : (() => {
                    return (
                        <>
                            <div className="dash-title">
                                ویرایش دوره
                            </div>
                            <label htmlFor="status">وضعیت انتشار</label>
                            <select id={'status'} defaultValue={course.status}>
                                <option value="init">پیش نویس</option>
                                <option value="published">منتشر شده</option>
                            </select>
                            <label htmlFor="title">عنوان دوره</label>
                            <input type="text" id={'title'} defaultValue={course.title}/>
                            <label htmlFor="slug">عنوان دوره به انگلیسی</label>
                            <input type="text" id={'slug'} defaultValue={course.slug}/>
                            <label htmlFor="desc">توضیحات دوره</label>
                            <textarea style={{height: '300px'}} id={'desc'} defaultValue={course.courseDesc}/>
                            <label htmlFor="level">سطح دوره</label>
                            <select defaultValue={course.level} id={'level'}>
                                <option value="1">مقدماتی</option>
                                <option value="2">متوسط</option>
                                <option value="3">پیشرفته</option>
                            </select>
                            <label htmlFor="price">قیمت دوره</label>
                            <input type="number" id={'price'} defaultValue={course.price}/>
                            <label htmlFor="author-desc">توضیحات نویسنده</label>
                            <input type="text" id={'author-desc'} defaultValue={course.authorDesc}/>
                            <label htmlFor="course-image">تصویر دوره</label>
                            <input type="text" id={'course-image'} defaultValue={course.image}/>
                            <label htmlFor="category">دسته بندی</label>
                            {categories === 'pending' ? <Loading/> : (() => {
                                if (categories.length !== 0) {
                                    return (
                                        <>
                                            {categories.map((e, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <div>
                                                            <label style={{
                                                                display: 'inline-block',
                                                                width: '200px'
                                                            }}>{e.faName}</label>
                                                            <input type="checkbox" name={'category[]'}
                                                                   value={e.enName}/>
                                                        </div>
                                                    </Fragment>
                                                )
                                            })}
                                        </>
                                    )
                                }
                            })()}
                            <Button click={handleClick} style={{display: 'block', margin: '10px auto'}}
                                    type={'primary'}>ویرایش</Button></>
                    )
                })()}
                <div className="dash-title">
                    افزودن جلسه جدید
                </div>
                <label htmlFor="session-title">عنوان جلسه</label>
                <input type="text" id={'session-title'}/>
                <label htmlFor="session-length">مدت جلسه</label>
                <input type="number" id={'session-length'}/>
                <label htmlFor="session-file">فایل جلسه</label>
                <input type="file" id={'session-file'}/>
                <label htmlFor="is-file">فایل؟</label>
                <select id={'is-file'}>
                    <option value='no'>خیر</option>
                    <option value='yes'>بله</option>
                </select>
                <label htmlFor="is-file">رایگان؟</label>
                <select id={'is-free'}>
                    <option value='no'>خیر</option>
                    <option value='yes'>بله</option>
                </select>
                <Button click={handleAddSession} style={{display: 'block', margin: '10px auto'}}
                        type={'primary'}>ثبت</Button>


                <div className="dash-title">
                    لیست جلسات
                </div>
                {sLoading ? <Loading/> : (() => {
                    return (
                        sessions.map((e, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div data-session-id={e.id}>
                                        <div className="dash-title">
                                            جلسه {e.sessionNumber}
                                        </div>
                                        <label htmlFor="session-title">عنوان جلسه</label>
                                        <input type="text" id={'session-title'} defaultValue={e.title}/>
                                        <label htmlFor="session-length">مدت جلسه</label>
                                        <input type="number" id={'session-length'} defaultValue={e.duration}/>
                                        <label htmlFor="session-file">فایل جلسه</label>
                                        <input type="file" id={'session-file'}/>
                                        <div className="label"/>
                                        <input type="disabled" defaultValue={e.fileName}/>
                                        <label htmlFor="is-file">فایل؟</label>
                                        <select id={'is-file'} defaultValue={e.isFile ? 'yes' : 'no'}>
                                            <option value='no'>خیر</option>
                                            <option value='yes'>بله</option>
                                        </select>
                                        <label htmlFor="is-file">رایگان؟</label>
                                        <select id={'is-free'} defaultValue={e.isFree ? 'yes' : 'no'}>
                                            <option value='no'>خیر</option>
                                            <option value='yes'>بله</option>
                                        </select>
                                        <Button click={() => {handleEditSession(e.id)}} type={'primary'} style={{display: 'block'}}>ثبت</Button>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    )
                })()}
            </AdminBase>
        </>
    )
}