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
import Loading from "../components/Loading";

export default function Register() {
    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if (user !== null && user !== 'pending'){
            router.push('/dashboard');
        }
    },[user])

    useEffect(() => {
        if (router.isReady){
           if (typeof router.query.token === 'undefined'){
               router.push('/');
               return;
           }
           if (router.query.token === ''){
               router.push('/');
           }
        }
    }, [router])

    function handleClick(e) {
        let schema = yup.object().shape({
            password: yup.string('رمز عبور معتبر نمی باشد').required('رمز عبور نمی تواند خالی باشد').min(8, 'رمز عبور حداقل باید 8 کاراکتر باشد'),
            passwordC: yup.string('تکرار رمز عبور معتبر نمی باشد').required('تکرار رمز عبور نمی تواند خالی باشد')
                .test('passwords-match', 'کلمات عبور تفاوت دارند', function (value) {
                    return this.parent.password === value
                })
        })

        schema.validate({
            password: document.getElementById('password').value,
            passwordC: document.getElementById('password-c').value,
        }).catch(function (e){
            MessageView('danger', e.message)
        })

        schema.isValid({
            password: document.getElementById('password').value,
            passwordC: document.getElementById('password-c').value,
        }).then((e) => {
            if (e){
                NProgress.start();
                const form = createFormData([
                    document.getElementById('password'),
                    document.getElementById('password-c')
                ]);
                form.append('token', router.query.token)
                axios.post(CONSTS.apiName+'resetpw', form)
                    .then((response) => {
                        NProgress.done();
                        let data = JSON.parse(response.data);
                        if (data.hasError){
                            console.log(data)
                            MessageView('danger', data.errorMessage)
                        }else{
                            MessageView('success', 'رمز عبور با موفقیت تغییر کرد')
                            router.push('/login')
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
                                    <div className="title">بازیابی رمز عبور</div>
                                    <div className="line"/>
                                    {router.isReady ? <div className="form">
                                        <div className="input-container">
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
                                        <button onClick={handleClick} className={'auth-button'}>تایید</button>
                                        <div className="other-actions"><Link href={'/login'}><a>بازگشت به صفحه ورود</a></Link></div>
                                    </div> : <Loading />}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </Dynamic>
        </>
    )
}