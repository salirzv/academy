import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation} from 'swiper';
import 'swiper/css';
import {useEffect, useRef, useState} from "react";
import Loading from "./Loading";

export default function SwiperView(props) {

    const [width, setWidth] = useState('pending');
    const [count, setCount] = useState('pending');
    const ref = useRef();
    const pagRef = useRef();

    function handleResize(e) {
        if (props.responsive) {
            setWidth(e.width);
        }
    }

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])


    useEffect(() => {
        if (width !== 'pending'){
            if (props.responsive){
                if (width > 1100) {
                    if (props.elements.length >= 3) {
                        setCount(3);

                    } else {
                        setCount(props.elements.length);
                    }
                }
                if (width <= 1100 && width > 780) {
                    if (props.elements.length >= 2) {
                        setCount(2);

                    } else {
                        setCount(props.elements.length);
                    }
                }
                if (width <= 780) {
                    if (props.elements.length >= 1) {
                        setCount(1);
                    } else {
                        setCount(props.elements.length);
                    }
                }
            }else{
                setCount(1)
            }
        }
    }, [width])

    useEffect(() => {
       if (count !== 'pending'){
           if (props.elements.length <= count) {
               ref.current.swiper.allowTouchMove = false;
               pagRef.current.style.display = 'none';
           } else {
               ref.current.swiper.allowTouchMove = true;
               pagRef.current.style.display = 'flex';
           }
       }
    }, [count])


    return (
        <>
            {count === 'pending' ? <Loading /> : (()=>{
               return (
                   <Swiper ref={ref}
                           modules={[Navigation, Pagination]}
                           spaceBetween={0}
                           slidesPerView={count}
                           pagination={{
                               el: '.bullets',
                               bulletActiveClass: 'nav-active',
                               bulletClass: 'nav-item',
                               bulletElement: '<div>',
                               clickable: true,
                               renderBullet: (index, className) => {
                                   return `<div class="${className}"></div>`;
                               }
                           }}
                           navigation={{
                               nextEl: '.next',
                               prevEl: '.previous'
                           }}
                           loop
                           onResize={handleResize}
                           onAfterInit={handleResize}
                   >
                       {props.elements.map((e, index) => {
                           return (
                               <SwiperSlide key={index}>{e}</SwiperSlide>
                           )
                       })}
                       <div ref={pagRef} className="nav-container">
                           <div className="previous"/>
                           <div className="bullets"/>
                           <div className="next"/>
                       </div>
                   </Swiper>
               )
            })()}
        </>
    )
}