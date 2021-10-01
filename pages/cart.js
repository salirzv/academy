import Dynamic from "../components/skeleton/Dynamic";
import Head from 'next/head';
import {CONSTS} from "../contst";
import MainContent from "../components/skeleton/MainContent";
import Header from "../components/skeleton/Header";
import Footer from "../components/skeleton/Footer";
import Image from "next/image";
import Link from "next/link";
import {useState, useContext, useEffect, useRef} from "react";
import {Cart, CartInfo, UserContext} from "./_app";
import Loading from "../components/Loading";
import Button from "../components/parts/Button";
import NProgress from 'nprogress';
import axios from "axios";
import MessageView from "../components/MessageView";
import {useRouter} from "next/router";
import EmptyList from "../components/skeleton/EmptyList";

export default function CartPage() {
    const [loading, isLoading] = useState(true)
    const cartInfo = useContext(CartInfo);
    const {setCart} = useContext(Cart);
    const [cartTotal, setCartTotal] = useState(0);
    const [pending, setPending] = useState('pending');
    const cartRef = useRef();
    const user = useContext(UserContext);
    const router = useRouter()

    useEffect(() => {
        if (cartInfo !== 'pending') {
            isLoading(false);
        }
    }, [cartInfo])

    useEffect(() => {
        if (cartInfo !== 'pending') {
            if (cartInfo !== null) {
                let total = 0;
                cartInfo.map(e => {
                    total += parseInt(e.price);
                })
                setCartTotal(total);
            }
        }
    }, [cartInfo])

    useEffect(() => {
        axios.post(CONSTS.apiName + 'cart/getpendingorder')
            .then(response => {
                let data = JSON.parse(response.data)
                setPending(data)
            })
    }, [])

    useEffect(() => {
        if (pending !== 'pending' && pending.length !== 0 && typeof cartRef.current !== 'undefined') {
            cartRef.current.classList.add('blurred-bg')
        } else if (pending !== 'pending' && pending.length === 0 && typeof cartRef.current !== 'undefined') {
            cartRef.current.classList.remove('blurred-bg')
        }
    }, [pending, cartInfo])


    const handleRemove = id => {
        let currentCart = JSON.parse(localStorage.getItem('cart'));
        currentCart.splice(currentCart.indexOf(id), 1);
        setCart(currentCart)
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    const handleSubmit = () => {
        if (user !== null) {
            NProgress.start();
            let form = new FormData();
            form.append('items', localStorage.getItem('cart'))
            axios.post(CONSTS.apiName + 'cart/createorder', form)
                .then(response => {
                    NProgress.done()
                    const data = JSON.parse(response.data)
                    if (data.hasError) {
                        MessageView('danger', data.errorMessage)
                    } else {
                        location.href = data.redirect;
                    }
                })
        }else{
            router.push('/login?redirect=cart')
        }
    }

    const pendingPay = () => {
        NProgress.start();
        axios.post(CONSTS.apiName + 'cart/payorder')
            .then(response => {
                NProgress.done()
                const data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    location.href = data.redirect;
                }
            })
    }

    const pendingCancel = () => {
        NProgress.start();
        axios.post(CONSTS.apiName + 'cart/cancelorder')
            .then(response => {
                NProgress.done()
                const data = JSON.parse(response.data)
                if (data.hasError) {
                    MessageView('danger', data.errorMessage)
                } else {
                    MessageView('success', 'سفارش لغو شد')
                    setPending([]);
                }
            })
    }

    return (
        <Dynamic>
            <Head>
                <title>{CONSTS.siteName} | سبد خرید</title>
            </Head>
            <MainContent>
                <Header dark/>
                <div className="cart-page">
                    {pending !== 'pending' && pending.length !== 0 ? (() => {
                        return (
                            <div className="cart-page-container">
                                <div className="title" style={{
                                    color: 'red',
                                    width: '100%',
                                    justifyContent: 'center',
                                    lineHeight: '1.3',
                                    textAlign: 'justify',
                                    textAlignLast: 'right',
                                    borderBottom: 'none',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    height: 'unset',
                                    marginBottom: 'unset'
                                }}>یک سفارش در انتظار پرداخت براش شما ثبت شده است، قبل از ثبت سفارش جدید وضعیت سفارش
                                    قبلی را مشخص کنید
                                </div>
                                <div className="cart-page-items">
                                    {pending.items.map((e, index) => {
                                        return (
                                            <div key={index} className="item">
                                                <div className="image">
                                                    <Image src={e.image} layout={'fill'}/>
                                                </div>
                                                <div className="cart-left-part">
                                                    <div className="cart-item-title">
                                                        <Link
                                                            href={`/course/${e.slug}`}><a>{e.title}</a></Link>
                                                    </div>
                                                    <div className="cart-options">
                                                        <div className="price">
                                                            {parseInt(e.price).toLocaleString()} تومان
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="sum">
                                        <div className="cart-total">
                                            {parseInt(pending.amount).toLocaleString()} تومان
                                        </div>
                                        <div className="submit-order">
                                            <Button click={pendingPay} style={{}} type={'success'}>پرداخت</Button>
                                            <Button click={pendingCancel} style={{
                                                marginRight: '20px',
                                                backgroundColor: '#f2dede',
                                                color: '#a94442'
                                            }} type={'success'}>لغو سفارش</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })() : null}
                    <div className="cart-page-container" ref={cartRef}>
                        <div className="title">سبد خرید</div>
                        <div className="cart-page-items">
                            {loading ? <Loading/> : (() => {
                                return (
                                    <>
                                        {cartInfo === null || cartInfo.length === 0 ? (() => {
                                                return (<EmptyList withlink />)
                                            })() :
                                            (() => {
                                                return (
                                                    <>
                                                        {cartInfo.map((e, index) => {
                                                            return (
                                                                <div key={index} className="item">
                                                                    <div className="image">
                                                                        <Image src={e.image} layout={'fill'}/>
                                                                    </div>
                                                                    <div className="cart-left-part">
                                                                        <div className="cart-item-title">
                                                                            <Link
                                                                                href={`/course/${e.slug}`}><a>{e.title}</a></Link>
                                                                        </div>
                                                                        <div className="cart-options">
                                                                            <div className="price">
                                                                                {parseInt(e.price).toLocaleString()} تومان
                                                                            </div>
                                                                            <div onClick={() => {
                                                                                handleRemove(e.id)
                                                                            }} className="remove">
                                                                                حذف
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <div className="sum">
                                                            <div className="cart-total">
                                                                {cartTotal.toLocaleString()} تومان
                                                            </div>
                                                            <div className="submit-order">
                                                                {user === 'pending' ? <Loading /> : <Button click={handleSubmit} style={{fontSize: '1rem'}}
                                                                                                            type={'success'}>پرداخت و ثبت
                                                                    نهایی</Button>}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })()}
                                    </>
                                )
                            })()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </MainContent>
        </Dynamic>
    )
}