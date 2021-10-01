import Head from 'next/head';
import Dynamic from "../../components/skeleton/Dynamic";
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Header from "../../components/skeleton/Header";
import Link from 'next/link';
import {useCallback, useContext, useEffect, useState} from "react";
import {IsAdmin, UserContext} from "../../pages/_app";
import {useRouter} from "next/router";
import Loading from "../Loading";
import ErrorPage from 'next/error';

export default function AdminBase(props) {
    const isAuth = useContext(IsAdmin);
    const [error, isError] = useState(false);
    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push('/login')
        }
    }, [user])

    const setPanelHeight = useCallback(node => {
        if (node !== null) {
            node.style.height = `${node.firstChild.offsetHeight}px`;
        }
    }, [user])

    useEffect(()=>{
        if (!isAuth){
            isError(true);
        }else{
            isError(false);
        }
    }, [isAuth])


    if (!isAuth && !error) {
        return (
            <Loading/>
        )
    } else if (error) {
        return <ErrorPage statusCode={404}/>
    } else {
        return (
            <>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین</title>
                </Head>
                <Dynamic>
                    <MainContent>
                        <div className="dashboard">
                            <Header user={user} dark/>
                            <div className="dashboard-container">
                                <div ref={setPanelHeight} className="right-panel">
                                    <div className="right-panel-items">
                                        <div className={'panel-item-email'}>
                                            {user.email}
                                        </div>
                                        <div className="panel-item">
                                            <Link href={'/admin'}>
                                                <a>پنل مدیریت</a>
                                            </Link>
                                        </div>
                                        <div className="panel-item">
                                            <Link href={'/admin/course/new'}>
                                                <a>دوره جدید</a>
                                            </Link>
                                        </div>
                                        <div className="panel-item">
                                            <Link href={'/admin/course'}>
                                                <a>لیست دوره ها</a>
                                            </Link>
                                        </div>
                                        <div className="panel-item">
                                            <Link href={'/admin/categories'}>
                                                <a>دسته بندی ها</a>
                                            </Link>
                                        </div>
                                        <div className="panel-item">
                                            <div className="icon" id={'logout'}/>
                                            <Link href={'/logout'}>
                                                <a>خروج</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="left-panel">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </MainContent>
                </Dynamic>
            </>
        )
    }
}