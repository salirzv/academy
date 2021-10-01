import Head from "next/head";
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Dynamic from "../../components/skeleton/Dynamic";
import Header from "../../components/skeleton/Header";
import {useContext, useEffect} from "react";
import {Cart} from "../_app";
import Link from "next/link";

export default function CheckOutSuccess() {

    const {setCart} = useContext(Cart);

    useEffect(() => {
        setCart(null);
        localStorage.setItem('cart', null);
    }, [])

    return (
        <>
            <Dynamic>
                <Head>
                    <title>{CONSTS.siteName} | پرداخت موفق</title>
                </Head>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <Header/>
                            <div className="container">
                                <div className="left"/>
                                <div className="right"/>
                                <div className="form-container">
                                    <div style={{color: '#7DB80C'}} className="title">پرداخت با موفقیت انجام شد</div>
                                    <div className="line"/>
                                    <p>
                                        دوره های خریداری شده هم اکنون در دسترس قرارگرفته اند
                                    </p>
                                    <div style={{textAlign: 'center', fontFamily: 'Medium'}} className={'go-to-page'}>
                                        <Link href={'/dashboard'}><a>لیست دوره های شما</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </Dynamic>
        </>
    )
}