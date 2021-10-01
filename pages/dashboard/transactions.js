import Head from 'next/head';
import {CONSTS} from "../../contst";
import DashboardBase from "../../components/skeleton/DashboardBase";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import EmptyList from "../../components/skeleton/EmptyList";

export default function Transactions() {
    const [userTransactions, setUserTransactions] = useState('pending');
    useEffect(() => {
        axios.post(CONSTS.apiName + 'dashboard/gettransactions')
            .then(response => {
                let data = JSON.parse(response.data);
                setUserTransactions(data)
            })
    }, [])

    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | پنل کاربری | تراکنش ها</title>
            </Head>
            <DashboardBase>
                <div className="dash-title">لیست تراکنش ها</div>
                <div className="user-transactions">
                    {userTransactions === 'pending' ? <Loading/> : (() => {
                        if (userTransactions.length !== 0) {
                            return (
                                <>
                                    <div className="user-transactions-container">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>شماره تراکنش</th>
                                                <th>وضعیت</th>
                                                <th>مقدار</th>
                                                <th>زمان</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {userTransactions.map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{e.trs_id}</td>
                                                        <td><div className='table-success'>پرداخت شده</div></td>
                                                        <td>{parseInt(e.amount).toLocaleString()}</td>
                                                        <td>{e.created_at}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )
                        }else{
                            return <EmptyList />
                        }
                    })()}
                </div>
            </DashboardBase>
        </>
    )
}