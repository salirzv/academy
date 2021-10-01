import Head from "next/head";
import {CONSTS} from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Dynamic from "../components/skeleton/Dynamic";
import Header from "../components/skeleton/Header";
import * as yup from 'yup';
import MessageView from "../components/MessageView";
import axios from "axios";
import NProgress from 'nprogress';
import createFormData from "../components/createFormData";
import {useContext, useEffect} from "react";
import {UserContext} from "./_app";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Register() {

    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if (user !== null && user !== 'pending'){
            router.push('/dashboard');
        }
    },[user])

    function handleClick(e) {

        let schema = yup.object().shape({
            email: yup.string('ایمیل معتبر نمی باشد').email('ایمیل معتبر نمی باشد').required('ایمیل نمی تواند خالی باشد'),
            password: yup.string('رمز عبور معتبر نمی باشد').required('رمز عبور نمی تواند خالی باشد').min(8, 'رمز عبور حداقل باید 8 کاراکتر باشد'),
            passwordC: yup.string('تکرار رمز عبور معتبر نمی باشد').required('تکرار رمز عبور نمی تواند خالی باشد')
                .test('passwords-match', 'کلمات عبور تفاوت دارند', function (value) {
                    return this.parent.password === value
                })
        })

        schema.validate({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            passwordC: document.getElementById('password-c').value,
        }).catch(function (e){
            MessageView('danger', e.message)
        })

        schema.isValid({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            passwordC: document.getElementById('password-c').value,
        }).then((e) => {
            if (e){
                NProgress.start();
                const form = createFormData([
                    document.getElementById('email'),
                    document.getElementById('password'),
                    document.getElementById('password-c')
                ]);
                axios.post(CONSTS.apiName+'register', form)
                    .then((response) => {
                        NProgress.done();
                        let data = JSON.parse(response.data);
                        if (data.hasError){
                            MessageView('danger', data.errorMessage)
                        }else{
                            MessageView('success', 'ثبت نام با موفقیت انجام شد')
                        }
                    })
            }
        })
    }
    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | ثبت نام</title>
            </Head>
            <Dynamic>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <Header/>
                            <div className="container">
                                <div className="left"/>
                                <div className="right"/>
                                <div className="form-container">
                                    <div className="title">ایجاد حساب</div>
                                    <div className="line"/>
                                    <p>
                                        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در
                                        صنعت چاپ
                                    </p>
                                    <div className="form">
                                        <div className="input-container">
                                            <label htmlFor="email">ایمیل</label>
                                            <div className="input">
                                                <div className="icon" id={'email-icon'}/>
                                                <div className="input-line"/>
                                                <form><input autoComplete={'off'} type="text" id='email'/></form>
                                            </div>
                                            <label htmlFor="password">رمز عبور</label>
                                            <div className="input">
                                                <div className="icon" id={'password-icon'}/>
                                                <div className="input-line"/>
                                                <form><input autoComplete={'off'} type="password" id='password'/>
                                                </form>
                                            </div>
                                            <label htmlFor="password-c">تکرار رمز عبور</label>
                                            <div className="input">
                                                <div className="icon" id={'password-icon'}/>
                                                <div className="input-line"/>
                                                <form><input autoComplete={'off'} type="password" id='password-c'/>
                                                </form>
                                            </div>
                                        </div>
                                        <button onClick={handleClick} className={'auth-button'}>ایجاد حساب</button>
                                        <div className="other-actions"><Link href={'/login'}><a>ورود</a></Link></div>
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