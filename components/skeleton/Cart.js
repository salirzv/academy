import Image from "next/image";
import Link from "next/link";
import Button from "../parts/Button";
import {useContext, useEffect, useRef, useState} from "react";
import Dynamic from "./Dynamic";
import {CartInfo, Cart} from "../../pages/_app";
import PlaceHolder from "../parts/PlaceHolder";
import {useRouter} from "next/router";

const styles = {
    fontFamily: 'Medium',
    fontSize: '0.75rem',
    padding: '9px',
    borderRadius: '50%',
    backgroundColor: '#1873F2',
    color: 'white',
    display: 'flex',
    width: '19px',
    height: '19px',
    alignItems: 'center',
    justifyContent: 'center'

}
export default function HeaderCart() {
    const cartRef = useRef();

    const cartInfo = useContext(CartInfo);
    const {cart, setCart} = useContext(Cart);

    const [loading, isLoading] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        if (cartInfo !== 'pending') {
            if (cartInfo !== null) {
                isLoading(false)
            } else {
                isLoading(false);
            }
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

    const handleEnter = () => {
        if (cartInfo !== 'pending' && cartInfo !== null) {
            if (cartInfo.length !== 0) {
                cartRef.current.style.display = 'block'
            }
        }
    }

    const handleLeave = () => {
        cartRef.current.style.display = 'none'
    }

    const handleRemove = id => {
        let currentCart = JSON.parse(localStorage.getItem('cart'));
        currentCart.splice(currentCart.indexOf(id), 1);
        if (currentCart.length === 0) {
            cartRef.current.style.display = 'none'
        }
        setCart(currentCart)
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    const router = useRouter();
    const goToCart = (e) => {
        if (e.target.classList.contains('cart') || e.target.classList.contains('cart-counter')) {
            router.push('/cart')
        }
    }

    return (
        <>
            <Dynamic>
                <div onClick={goToCart} className="cart" style={{position: 'relative'}} onMouseEnter={handleEnter}
                     onMouseLeave={handleLeave}>
                    <div style={styles} className="cart-counter">{cart !== 'pending' ? cart === null ? 0 : cart.length : 0}</div>
                    <div ref={cartRef} className="cart-items">
                        {loading ? <PlaceHolder/> : (() => {
                            return (
                                <>
                                    {cartInfo === null ? null : cartInfo.map((e, index) => {
                                        return (
                                            <div key={index} className="item">
                                                <div className="image">
                                                    <Image src={e.image} layout={'fill'}/>
                                                </div>
                                                <div className="cart-left-part">
                                                    <div className="title">
                                                        <Link href={`/course/${e.slug}`}><a>{e.title}</a></Link>
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
                                </>
                            )
                        })()}
                        <div className="sum">
                            <div className="cart-total">
                                {cartTotal.toLocaleString()} تومان
                            </div>
                            <div className="submit-order">
                                <Button style={{fontSize: '1rem'}} type={'success'}><Link href={'/cart'}><a>ثبت
                                    سفارش</a></Link></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dynamic>
        </>
    )
}