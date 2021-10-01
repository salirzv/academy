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

export default function Register() {
  const user = useContext(UserContext);
  const router = useRouter();
  const { setUserUpdated } = useContext(UserUpdated);
  const rememberMeRef = useRef();

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
      password: yup
        .string("رمز عبور معتبر نمی باشد")
        .required("رمز عبور نمی تواند خالی باشد")
        .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد"),
    });

    schema
      .validate({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .catch(function (e) {
        MessageView("danger", e.message);
      });

    schema
      .isValid({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then((e) => {
        if (e) {
          NProgress.start();
          const form = createFormData([
            document.getElementById("email"),
            document.getElementById("password"),
          ]);
          form.append("remember-me", rememberMeRef.current.checked);

          axios
            .post(CONSTS.apiName + "login", form, { withCredentials: true })
            .then((response) => {
              NProgress.done();
              let data = JSON.parse(response.data);
              if (data.hasError) {
                MessageView("danger", data.errorMessage);
              } else {
                MessageView("success", "با موفقیت وارد شدید");
                setUserUpdated((pre) => {
                  pre + 1;
                });
                const params = new URLSearchParams(location.search);
                const redirect = params.get("redirect");
                if (redirect !== null) {
                  router.push("/" + redirect);
                } else {
                  router.push("/");
                }
              }
            });
        }
      });
  }

  const toggleRememberMe = () => {
    rememberMeRef.current.checked = !rememberMeRef.current.checked;
  };

  return (
    <>
      <Head>
        <title>{CONSTS.siteName} | ورود</title>
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
                  <div className="title">ورود به حساب کاربری</div>
                  <div className="line" />
                  <p>
                    لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی
                    آزمایشی و بی‌معنی در صنعت چاپ
                  </p>
                  <div className="form">
                    <form>
                      <div className="input-container">
                        <label htmlFor="email">ایمیل</label>
                        <div className="input">
                          <div className="icon" id={"email-icon"} />
                          <div className="input-line" />
                          <input name={"email"} type="text" id="email" />
                        </div>
                        <label htmlFor="password">رمز عبور</label>
                        <div className="input">
                          <div className="icon" id={"password-icon"} />
                          <div className="input-line" />
                          <input
                            name={"password"}
                            type="password"
                            id="password"
                          />
                        </div>
                        <div className={"remember-me"}>
                          <input
                            ref={rememberMeRef}
                            type="checkbox"
                            id={"remember-me"}
                          />
                          <div
                            onClick={toggleRememberMe}
                            className="remember-me-text"
                          >
                            مرا به خاطر بسپار
                          </div>
                        </div>
                      </div>
                    </form>
                    <button onClick={handleClick} className={"auth-button"}>
                      ورود
                    </button>
                    <div style={{marginBottom: '10px'}} className="other-actions">
                      <Link href={"/register"}>
                        <a>ثبت نام</a>
                      </Link>
                    </div>
                    <div className="other-actions">
                      <Link href={"/forgot"}>
                        <a>فراموشی کلمه عبور</a>
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
