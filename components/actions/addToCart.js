import MessageView from "../MessageView";
import {useRouter} from "next/router";

export default function addToCart(setCart, courseId, router){

    let currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart === null) {
        currentCart = [courseId]
        setCart(currentCart)
        localStorage.setItem('cart', JSON.stringify(currentCart));
        router.push('/cart')
    } else {
        if (currentCart.find(id => id === courseId)) {
            MessageView('danger', 'دوره در سبد خرید موجود می باشد')
        } else {
            currentCart.push(courseId)
            setCart(currentCart)
            localStorage.setItem('cart', JSON.stringify(currentCart));
            router.push('/cart')
        }
    }
}