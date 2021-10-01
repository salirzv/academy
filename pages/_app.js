import '../styles/styles.css';
import 'noty/lib/noty.css';
import 'video.js/dist/video-js.css'
import 'noty/lib/themes/bootstrap-v4.css';
import Head from "next/head";
import 'nprogress/nprogress.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CONSTS} from "../contst";
import "placeholder-loading/dist/css/placeholder-loading.min.css";
import Router from "next/router";
import NProgress from 'nprogress';

Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()


export const UserContext = React.createContext(null);
export const UserUpdated = React.createContext({
    userUpdated: 1,
    setUserUpdated: () => {}
})
export const HeaderInfo = React.createContext(null);
export const IsAdmin = React.createContext(null);
export const Cart = React.createContext({
    cart: 'pending',
    setCart: () => {}
})

export const CartInfo = React.createContext(null);

function MyApp({Component, pageProps}) {
    const [cart, setCart] = useState('pending');
    const [user, setUser] = useState('pending');
    const [admin, isAdmin] = useState(true);
    const [headerText, setHeaderText] = useState({
        text: 'ثبت نام | ورود',
        link: '/login'
    })
    const [cartInfo, setCartInfo] = useState('pending');
    const [userUpdated, setUserUpdated] = useState(0);

    useEffect(() => {
        axios.post(CONSTS.apiName + 'userdata')
            .then(response => {
                let data = JSON.parse(response.data);
                if (data !== false) {
                    setUser(data)
                    setHeaderText({
                        text: 'حساب کاربری',
                        link: '/dashboard'
                    })
                    if (data.roles.includes("ROLE_ADMIN")){
                        isAdmin(true);
                    }else{
                        isAdmin(false);
                    }
                }else{
                    setUser(null)
                    setHeaderText({
                        text: 'ثبت نام | ورود',
                        link: '/login'
                    })
                }
            })
    }, [userUpdated])

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        setCart(cart);
    }, [])

    useEffect(() => {
        if (cart !== 'pending'){
            if (cart === null || cart.length === 0){
                setCartInfo(null)
            }else{
                let data = new FormData();
                data.append('items', JSON.stringify(cart));
                axios.post(CONSTS.apiName+'cart/getitems', data)
                    .then(response => {
                        setCartInfo(JSON.parse(response.data));
                    })
            }
        }
    }, [cart])

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <UserContext.Provider value={user}>
                <UserUpdated.Provider value={{userUpdated, setUserUpdated}}>
                    <HeaderInfo.Provider value={headerText}>
                        <IsAdmin.Provider value={admin}>
                            <Cart.Provider value={{cart, setCart}}>
                                <CartInfo.Provider value={cartInfo}>
                                    <Component {...pageProps} />
                                </CartInfo.Provider>
                            </Cart.Provider>
                        </IsAdmin.Provider>
                    </HeaderInfo.Provider>
                </UserUpdated.Provider>
            </UserContext.Provider>
        </>
    )
}

export default MyApp
