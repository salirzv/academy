import Head from 'next/head';
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Header from "../../components/skeleton/Header";
import {useEffect, useRef, useState} from "react";
import CourseView from "../../components/CourseView";
import Footer from "../../components/skeleton/Footer";
import axios from "axios";
import Dynamic from "../../components/skeleton/Dynamic";
import {useRouter} from "next/router";
import Loading from "../../components/Loading";
import Link from 'next/link';

export default function Search(props) {
    const p_results = props.results;
    const [categories, setCategories] = useState('pending');
    const rc = props.results.length;
    const router = useRouter();

    useEffect(() => {
        if (router.isReady && categories !== 'pending') {
            document.querySelectorAll('.c-active').forEach(e => {
                e.classList.remove('c-active')
            })

            if (typeof router.query.name !== 'undefined' && document.getElementById(router.query.name) !== null) {
                document.getElementById(router.query.name).firstChild.classList.add('c-active')
            }
        }
    }, [categories, router])

    useEffect(() => {
        axios.post(CONSTS.apiName + 'getcategories')
            .then(response => {
                let data = JSON.parse(response.data);
                setCategories(data);
            })
    }, [])
    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | {props.name}</title>
            </Head>
            <MainContent>
                <div className="course-search">
                    <Header dark/>
                    <div className="result-title">
                        <div className="top">{props.name}</div>
                    </div>
                    {rc !== 'pending' ? <div className="result-title">
                        <div className="bottom">{rc} دوره پیدا شد، دوره موردنظر خود را انتخاب فرمایید</div>
                    </div> : <Loading/>}
                    <div className="options">
                        <div className="right-side">
                            <div className="title">دسته بندی:</div>
                            <CategoryItem name={'همه'}/>
                            {categories !== 'pending' ? categories.map((e, index) => {
                                return (<CategoryItem key={index} link={e.enName} name={e.faName}/>)
                            }) : null}
                        </div>
                    </div>
                    <div className="results-view">
                        {p_results === 'pending' ? <Loading/> : (() => {
                            return (
                                p_results.map((e, index) => {
                                    return (
                                        <CourseView key={index} img={e.image} title={e.title}
                                                    desc={e.courseDesc} slug={e.slug}
                                                    author={{image: '/img/author.svg', name: 'تیم مدیریت'}}
                                                    id={e.id}
                                                    course={{
                                                        duration: 26,
                                                        sessions: 18,
                                                        price: parseInt(e.price)
                                                    }}/>
                                    )
                                })
                            )
                        })()}
                    </div>
                    <Footer/>
                </div>
            </MainContent>
        </>
    )
}

function CategoryItem(props) {
    return (
        <>
            <div id={props.link ? props.link : 'all'} className="category-item">
                <Link href={props.link ? '/category/' + props.link : '/search'}><a>{props.name}</a></Link>
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const category = context.params.name;
    const FormData = require('form-data');
    let formData = new FormData();
    formData.append('category', category);
    const headers = formData.getHeaders();
    const res = await axios.post(CONSTS.apiName + 'getsearchresult', formData, {
        headers: {
            ...headers
        }
    })
    const data = JSON.parse(res.data);
    if (data.hasError) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {
                results: data.results,
                name: data.category.faName,
                enName: data.category.enName
            }
        }
    }

}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking' // See the "fallback" section below
    };
}