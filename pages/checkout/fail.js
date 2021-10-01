import Head from "next/head";
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Dynamic from "../../components/skeleton/Dynamic";
import Header from "../../components/skeleton/Header";

export default function CheckOutFail() {

    return (
        <>
            <Dynamic>
                <Head>
                    <title>{CONSTS.siteName} | پرداخت نا موفق</title>
                </Head>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <Header/>
                            <div className="container">
                                <div className="left"/>
                                <div className="right"/>
                                <div className="form-container">
                                    <div style={{color: 'red'}} className="title">پرداخت با مشکل مواجه شد</div>
                                    <div className="line"/>
                                    <p>
                                        در صورت برداشت مبلغ از حساب، در مدت حداکثر 72 ساعت بازگشت داده می شود
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </Dynamic>
        </>
    )
}