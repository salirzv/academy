import Head from "next/head";
import {CONSTS} from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Dynamic from "../components/skeleton/Dynamic";

export default function E500() {
    return (
        <>
            <Head>
                <title>{CONSTS.siteName}</title>
            </Head>
            <Dynamic>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <div className="container" style={{minHeight: '100vh'}}>
                                <div className="left"/>
                                <div className="right"/>
                                <div style={{padding: '10px', maxWidth: '400px'}} className="form-container">
                                    <div className="empty-list-container">
                                        <div className="empty-list-image">
                                            <img draggable={'false'}  src="/img/500.png" alt=""/>
                                        </div>
                                        <div className="empty-text">
                                            مشکلی به وجود آمده، در حال رفع آن هستیم
                                        </div>
                                        <div className={'go-to-page'}>
                                            <p><a href="/">صفحه اصلی</a></p>
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
