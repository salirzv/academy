import Head from 'next/head';
import {CONSTS} from "../../contst";
import MainContent from "../../components/skeleton/MainContent";
import Header from "../../components/skeleton/Header";
import Image from 'next/image';
import SessionView from "../../components/SessionView";
import Footer from "../../components/skeleton/Footer";
import axios from "axios";
import Dynamic from "../../components/skeleton/Dynamic";
import VideoJS from "../../components/pages/author-panel/VideoJs";
import React, {useContext, useEffect, useState} from "react";
import PlaceHolder from "../../components/parts/PlaceHolder";
import NProgress from "nprogress";
import {Cart} from "../_app";
import addToCart from "../../components/actions/addToCart";
import {useRouter} from "next/router";


export default function CoursePage(props) {
    const course = props.course;

    console.log(props)

    const router = useRouter();

    const playerRef = React.useRef(null);

    const [activeSession, setActiveSession] = useState(course.sessions[0]);
    const [videoJsOptions, setVideoJsOptions] = useState({});
    const [videoLink, setVideoLink] = useState(null);
    const [playerReady, setPlayerReady] = useState(false);
    const [owned, isOwned] = useState(false);

    const {cart, setCart} = useContext(Cart);

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };

    useEffect(() => {
        axios.post(CONSTS.apiName + 'dt/' + activeSession.id)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data);
                setVideoLink(CONSTS.fileApi + 'getonlinevideo/' + data);
            })
    }, [activeSession])

    useEffect(() => {
        axios.post(CONSTS.apiName + 'course/isowned/' + course.info.id)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data);
                isOwned(data);
            })
    }, [])

    useEffect(() => {
        if (videoLink !== null) {
            setVideoJsOptions({
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [1, 1.25, 1.5],
                controlBar: {
                    'liveDisplay': true,
                    'pictureInPictureToggle': false
                },
                sources: {
                    src: videoLink,
                    type: 'video/mp4'
                }
            })
            setPlayerReady(true);
        }
    }, [videoLink])


    const handleActiveSession = (id) => {
        document.getElementById('video-player').scrollIntoView();
        setActiveSession(course.sessions.find(e => e.id === id))
    }

    return (
        <>
            <Head>
                <title>{CONSTS.siteName} | دوره | {course.info.title}</title>
            </Head>
            <MainContent>
                <div className="course">
                    <Header dark/>
                    <div className="course-info">
                        <div className="course-info-container">
                            <div className="right-side">
                                <div className="title">{course.info.title}</div>
                                <div className="desc">
                                    {course.info.courseDesc}
                                </div>
                                <div className="options">
                                    <div className="options-right-side">
                                        <div className="option-item">
                                            <div id={'clock'} className="icon"/>
                                            <div className="text">{new Date(course.info.totalDuration * 1000).toISOString().substr(11, 8)
                                            }</div>
                                        </div>
                                        <div className="option-item">
                                            <div id={'video'} className="icon"/>
                                            <div className="text">{course.info.sessionsCount} جلسه</div>
                                        </div>
                                        <div className="option-item">
                                            <div id={'diff'} className="icon"/>
                                            <div className="text">{(()=>{
                                                switch (course.info.level){
                                                    case 1:
                                                        return 'مقدماتی'
                                                    case 2:
                                                        return 'متوسط'
                                                    case 3:
                                                        return 'پیشرفته'
                                                }
                                            })()}</div>
                                        </div>
                                    </div>
                                    <div className="options-left-side">
                                        <div className="top">
                                            <div className="unit">تومان</div>
                                            <div className="price">{parseInt(course.info.price).toLocaleString()}</div>
                                        </div>
                                        {owned ? <div className="bottom">
                                            <div className="add-to-cart-text" style={{fontSize: '0.8rem'}}>شما در این دوره شرکت کرده اید</div>
                                        </div> : <div onClick={() => { addToCart(setCart, course.info.id, router) }} className="bottom">
                                            <div className="add-to-cart-text">افزودن به سبد خرید
                                            </div>
                                            <div className="cart-icon"/>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="left-side">
                                <div className="image-container">
                                    <Image src={course.info.image} layout={'fill'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="author">
                        <div className="author-image">
                            <div className="author-image-container">
                                <Image src={'/img/comment-image.svg'} width={40} height={40}/>
                            </div>
                        </div>
                        <div className="author-name">
                            نوشین نصیری
                        </div>
                        <div className="author-line"/>
                        <div className="author-desc">
                            {course.info.authorDesc}
                        </div>
                    </div>
                    <Dynamic>
                        <div id={'video-player'} className="video-player">
                            {!playerReady ? <PlaceHolder/> :
                                <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>}
                        </div>
                    </Dynamic>
                    <div className="sessions">
                        {course.sessions.map((e, index) => {
                            return <SessionView key={index} changeSession={handleActiveSession} session={e} owned={owned}/>
                        })}
                    </div>
                    <Footer/>
                </div>
            </MainContent>
        </>
    )
}

export async function getStaticProps(context) {
    const query = context.params.slug;
    const res = await axios.post(CONSTS.apiName + 'course/getSingleCourse/' + query)
    const data = JSON.parse(res.data);
    if (data.info === null) {
        return {
            notFound: true,
        }
    } else {
        return {
            props: {
                course: JSON.parse(res.data)
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking' // See the "fallback" section below
    };
}

