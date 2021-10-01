import Head from 'next/head';
import {CONSTS} from "../../contst";

import {useEffect} from "react";
import AdminBase from "../../components/skeleton/AdminBase";

export default function index() {
    useEffect(()=>{

    }, [])
    return (
        <>
            <AdminBase>
                <Head>
                    <title>{CONSTS.siteName} | پنل ادمین</title>
                </Head>
                123
            </AdminBase>
        </>
    )
}