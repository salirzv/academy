import Head from "next/head";
import {CONSTS} from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Dynamic from "../components/skeleton/Dynamic";
import Header from "../components/skeleton/Header";
import Link from "next/link";

export default function E404() {
    return (
        <>
            <Head>
                <title>{CONSTS.siteName}</title>
            </Head>
            <Dynamic>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <Header/>
                            <div className="container">
                                <div className="left"/>
                                <div className="right"/>
                                <div style={{padding: '10px', maxWidth: '400px'}} className="form-container">
                                    <div className="empty-list-container">
                                        <div className="empty-list-image">
                                            <img draggable={'false'}  src="/img/404.png" alt=""/>
                                        </div>
                                        <div className="empty-text">
                                            همه جارو گشتیم، صفحه ای که دنبالشی وجود نداره!
                                        </div>
                                        <div className={'go-to-page'}>
                                            <p>دوره های آموزشی در <Link href={'/search'}><a>این قسمت</a></Link> قابل مشاهده هستند</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </Dynamic>
        </>
    );
}
