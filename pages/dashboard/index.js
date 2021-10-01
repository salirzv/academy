import Head from 'next/head';
import {CONSTS} from "../../contst";
import DashboardBase from "../../components/skeleton/DashboardBase";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import CourseView from "../../components/CourseView";
import EmptyList from "../../components/skeleton/EmptyList";

export default function Index() {
    const [userOrders, setUserOrders] = useState('pending');

    useEffect(()=>{
        axios.post(CONSTS.apiName+'dashboard/getusercourses')
            .then(response => {
                let data = JSON.parse(response.data);
                setUserOrders(data);
            })
    }, [])

    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | پنل کاربری</title>
            </Head>
            <DashboardBase>
                <div className="dash-title">لیست دوره های شما</div>
                <div className="user-orders">
                    {userOrders === 'pending' ? <Loading /> : (()=>{
                        if (userOrders.length !== 0){
                            return (
                                <>
                                    <div className="user-orders-container" style={{gap: '10px'}}>
                                        {userOrders.map((e, index) => {
                                            return (
                                                <CourseView styles={{backgroundColor: '#F5F8FA'}} key={index} img={e.image} title={e.title}
                                                            desc={e.courseDesc} slug={e.slug}
                                                            author={{image: '/img/author.svg', name: 'تیم مدیریت'}}
                                                            id={e.id}
                                                            course={{duration: 26, sessions: 18, price: parseInt(e.price)}}/>
                                            )
                                        })}
                                    </div>
                                </>
                            )
                        }else{
                            return <EmptyList withlink />
                        }
                    })()}
                </div>
            </DashboardBase>
        </>
    )
}