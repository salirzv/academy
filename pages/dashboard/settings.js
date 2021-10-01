import Head from 'next/head';
import {CONSTS} from "../../contst";
import DashboardBase from "../../components/skeleton/DashboardBase";
import Button from "../../components/parts/Button";
import * as yup from "yup";
import MessageView from "../../components/MessageView";
import NProgress from "nprogress";
import createFormData from "../../components/createFormData";
import axios from "axios";

export default function Settings() {
    const handleChangePassword = () => {
        let schema = yup.object().shape({
            cPassword: yup.string('رمز عبور معتبر نمی باشد').required('رمز عبور نمی تواند خالی باشد'),
            password: yup.string('رمز عبور جدید معتبر نمی باشد').required('رمز عبور جدید نمی تواند خالی باشد').min(8, 'رمز عبور جدید حداقل باید 8 کاراکتر باشد'),
            passwordC: yup.string('تکرار رمز عبور جدید معتبر نمی باشد').required('تکرار رمز عبور جدید نمی تواند خالی باشد')
                .test('passwords-match', 'کلمات عبور تفاوت دارند', function (value) {
                    return this.parent.password === value
                })
        })

        schema.validate({
            cPassword: document.getElementById('cp').value,
            password: document.getElementById('np').value,
            passwordC: document.getElementById('cnp').value,
        }).catch(function (e){
            MessageView('danger', e.message)
        })

        schema.isValid({
            cPassword: document.getElementById('cp').value,
            password: document.getElementById('np').value,
            passwordC: document.getElementById('cnp').value,
        }).then((e) => {
            if (e){
                NProgress.start();
                const form = createFormData([
                    document.getElementById('cp'),
                    document.getElementById('np'),
                    document.getElementById('cnp')
                ]);
                axios.post(CONSTS.apiName+'dashboard/settings/changepw', form)
                    .then((response) => {
                        NProgress.done();
                        let data = JSON.parse(response.data);
                        if (data.hasError){
                            MessageView('danger', data.errorMessage)
                        }else{
                            MessageView('success', 'تغییر کلمه عبور با موفقیت انجام شد')
                        }
                    })
            }
        })
    }
    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | پنل کاربری | تنظیمات</title>
            </Head>
            <DashboardBase>
                <div style={{width: '200px'}} className="dash-title">تنظیمات حساب کاربری</div>
                <div style={{fontSize: '0.95rem'}} className="dash-title">تغییر کلمه عبور</div>
                <label htmlFor="cp">کلمه عبور فعلی</label>
                <input type="password" id={'cp'} />
                <label htmlFor="np">کلمه عبور جدید</label>
                <input type="password" id={'np'} />
                <label htmlFor="cnp">تایید کلمه عبور جدید</label>
                <input type="password" id={'cnp'} />
                <Button click={handleChangePassword} style={{display: 'block'}} type={'primary'}>ثبت</Button>
            </DashboardBase>
        </>
    )
}