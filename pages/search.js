import Head from 'next/head';
import {CONSTS} from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Header from "../components/skeleton/Header";
import {useEffect, useRef, useState} from "react";
import CourseView from "../components/CourseView";
import Footer from "../components/skeleton/Footer";
import axios from "axios";
import Dynamic from "../components/skeleton/Dynamic";
import {useRouter} from "next/router";
import Loading from "../components/Loading";
import Link from 'next/link';
import MessageView from "../components/MessageView";

export default function Search() {
    const [query, setQuery] = useState('xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM');
    const [searchQuery, setSearchQuery] = useState('xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM');
    const [results, setResults] = useState('pending');
    const [categories, setCategories] = useState('pending');
    const [rc, setRc] = useState('pending');
    const formRef = useRef();
    const router = useRouter();

    useEffect(() => {
        if (router.isReady && categories !== 'pending') {
            document.querySelectorAll('.c-active').forEach(e => {
                e.classList.remove('c-active')
            })
            document.getElementById('all').firstChild.classList.add('c-active')
        }
    }, [categories, router])

    useEffect(() => {
        if (searchQuery !== 'xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM') {
            if (typeof router.query.query !== 'undefined' && searchQuery === router.query.query) {
                return;
            }
            setRc('pending')
            router.push({
                pathname: '/search',
                query: {
                    'query': searchQuery
                }
            })
        }
    }, [searchQuery])

    useEffect(() => {
        if (router.isReady) {
            if (typeof router.query.query !== 'undefined') {
                setSearchQuery(router.query.query);
            }
            let form = new FormData();
            form.append('query', typeof router.query.query === 'undefined' ? '' : router.query.query);
            axios.post(CONSTS.apiName + 'getsearchresult', form)
                .then(response => {
                    let data = JSON.parse(response.data);
                    if (data.hasError) {
                        MessageView('danger', 'عملیات با خطا مواجه شد');
                    } else {
                        setRc(data.results.length)
                        setResults(data.results);
                    }
                })
        }
    }, [router])

    useEffect(() => {
        axios.post(CONSTS.apiName + 'getcategories')
            .then(response => {
                let data = JSON.parse(response.data);
                setCategories(data);
            })
    }, [])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e = null) => {
        if (e !== null) {
            e.preventDefault()
        }
        if (query !== 'xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM') {
            setSearchQuery(query);
        }
    }
    const handleIconClick = () => {
        handleSubmit();
    }
    return (
        <>
            <Dynamic>
                <Head>
                    <title>{CONSTS.siteName} | جستجو
                        برای {searchQuery !== 'xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM' ? searchQuery : null}</title>
                </Head>
                <MainContent>
                    <div className="course-search">
                        <Header dark/>
                        <div className="search-field">
                            <div className="search-container">
                                <form ref={formRef} onSubmit={handleSubmit} className="search-page-input">
                                    <input onChange={handleChange}
                                           value={query !== 'xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM' ? query : ''}
                                           type="text" autoComplete={'off'}
                                           placeholder={'نام مدرس یا دوره مورد نظر خود را وارد نمایید . . .'}/>
                                </form>
                                <div onClick={handleIconClick} className="icon"/>
                            </div>
                        </div>
                        {searchQuery !== 'xMaqcSU3efrxbmNoLPX1LiTi4cvSHqM' && searchQuery !== '' ?
                            <div className="result-title">
                                <div className="top">{searchQuery}</div>
                            </div> : null}
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
                            {results === 'pending' ? <Loading/> : (() => {
                                return (
                                    results.map((e, index) => {
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
            </Dynamic>
        </>
    )
}

function CategoryItem(props) {
    return (
        <>
            <div id={props.link ? '/category/' + props.link : 'all'} className="category-item">
                <Link href={props.link ? '/category/' + props.link : '/search'}><a>{props.name}</a></Link>
            </div>
        </>
    )
}