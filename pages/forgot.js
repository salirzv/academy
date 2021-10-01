import Head from "next/head";
import { CONSTS } from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Dynamic from "../components/skeleton/Dynamic";
import Header from "../components/skeleton/Header";
import * as yup from "yup";
import MessageView from "../components/MessageView";
import axios from "axios";
import NProgress from "nprogress";
import createFormData from "../components/createFormData";
import { useContext, useEffect, useRef } from "react";
import { UserContext, UserUpdated } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Forgot() {
    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (user !== null && user.hasOwnProperty("email")) {
            router.push("/");
        }
    }, [user]);

    function handleClick(e) {
        let schema = yup.object().shape({
            email: yup
                .string("ایمیل معتبر نمی باشد")
                .email("ایمیل معتبر نمی باشد")
                .required("ایمیل نمی تواند خالی باشد"),
        });

        schema
            .validate({
                email: document.getElementById("email").value
            })
            .catch(function (e) {
                MessageView("danger", e.message);
            });

        schema
            .isValid({
                email: document.getElementById("email").value
            })
            .then((e) => {
                if (e) {
                    NProgress.start();
                    const form = createFormData([
                        document.getElementById("email"),
                    ]);
                    axios
                        .post(CONSTS.apiName + "forgot", form)
                        .then((response) => {
                            NProgress.done();
                            let data = JSON.parse(response.data);
                            if (data.hasError) {
                                MessageView("danger", data.errorMessage);
                            } else {
                                MessageView("success", "ایمیل بازیابی برای شما ارسال شد");
                            }
                        });
                }
            });
    }

    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | فراموشی کلمه عبور</title>
            </Head>
            <Dynamic>
                <MainContent>
                    <div className="auth">
                        <div className="main-container">
                            <Header />
                            <div className="container">
                                <div className="left" />
                                <div className="right" />
                                <div className="form-container">
                                    <div className="title">فراموشی کلمه عبور</div>
                                    <div className="line" />
                                    <div className="form">
                                        <form>
                                            <div className="input-container">
                                                <label htmlFor="email">ایمیل</label>
                                                <div className="input">
                                                    <div className="icon" id={"email-icon"} />
                                                    <div className="input-line" />
                                                    <input name={"email"} type="text" id="email" />
                                                </div>
                                            </div>
                                        </form>
                                        <button onClick={handleClick} className={"auth-button"}>
                                            بازیابی
                                        </button>
                                        <div className="other-actions">
                                            <Link href={"/login"}>
                                                <a>بازگشت به صفحه ورود</a>
                                            </Link>
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
