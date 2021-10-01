import Head from 'next/head';
import Dynamic from "../../components/skeleton/Dynamic";
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Header from "../../components/skeleton/Header";
import Link from 'next/link';
import {useCallback, useContext, useEffect, useRef} from "react";
import {UserContext} from "../../pages/_app";
import {useRouter} from "next/router";
import Footer from "./Footer";

export default function DashboardBase(props) {
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
    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | پنل کاربری</title>
            </Head>
            <Dynamic>
                <MainContent>
                    <div className="dashboard">
                        <Header user={user} dark/>
                        <div className="dashboard-container">
                            <div ref={setPanelHeight} className="right-panel">
                                <div className="right-panel-content">
                                    <div className={'panel-item-email'}>
                                        {user.email}
                                    </div>
                                    <div className="panel-item">
                                        <div className="icon" id={'dash'}/>
                                        <Link href={'/dashboard'}>
                                            <a>پنل کاربری</a>
                                        </Link>
                                    </div>
                                    <div className="panel-item">
                                        <div className="icon" id={'trx'}/>
                                        <Link href={'/dashboard/transactions'}>
                                            <a>تراکنش ها</a>
                                        </Link>
                                    </div>
                                    <div className="panel-item">
                                        <div className="icon" id={'settings'}/>
                                        <Link href={'/dashboard/settings'}>
                                            <a>تنظیمات</a>
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