import Head from 'next/head'
import MainContent from "../components/skeleton/MainContent";
import Header from "../components/skeleton/Header";
import Particle from "../components/Particle";
import CourseView from "../components/CourseView";
import Image from "next/image";
import FloatingAvatar from "../components/FloatingAvatar";
import PostView from "../components/PostView";
import Footer from "../components/skeleton/Footer";
import SwiperView from "../components/SwiperView";
import {useEffect, useState} from "react";
import axios from "axios";
import {CONSTS} from "../contst";
import Loading from "../components/Loading";
import Dynamic from "../components/skeleton/Dynamic";

export default function Home() {
    const [recommended, setRecommended] = useState('pending');

    useEffect(() => {
        axios.post(CONSTS.apiName + 'home/getrecommendedcourses')
            .then(response => {
                let data = JSON.parse(response.data)
                setRecommended(data);
            })
    }, [])

    function navigateToRecommended() {
        document.getElementById('recommended').scrollIntoView({behavior: "smooth"});
    }


    return (
        <>
            <Head>
                <title>آکادمی</title>
            </Head>
            <MainContent>
                <div className="index">
                    <div className={'home-intro'}>
                        <Header/>
                        <Particle width={40} color={'#16E67E'} top={'20%'} right={'45%'}/>
                        <Particle width={50} color={'#FEFEFE'} top={'20%'} right={'-25px'}/>
                        <Particle width={30} color={'#16E67E'} top={'60%'} right={'15%'}/>
                        <Particle width={20} color={'#FEFEFE'} top={'65%'} right={'40%'}/>
                        <Particle width={30} color={'#16E67E'} top={'75%'} right={'60%'}/>
                        <Particle width={15} color={'#FEFEFE'} top={'60%'} right={'90%'}/>
                        <div className="main-section">
                            <div className="image">
                                <div className="image-container"/>
                            </div>
                            <div className="text">
                                <div className="title">آکادمی، محل یادگیری</div>
                                <div className="desc">
                                    لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت
                                    چاپ،
                                    صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از
                                    ترکیب
                                    بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می
                                    نماید
                                </div>
                                <div className="main-links">
                                    <div id='csharp' className="item">
                                        <a href="#"></a>
                                    </div>
                                    <div id='android' className="item">
                                        <a href="#"></a>
                                    </div>
                                    <div id='html5' className="item">
                                        <a href="#"></a>
                                    </div>
                                    <div id='python' className="item">
                                        <a href="#"></a>
                                    </div>
                                    <div id='dots' className="item">
                                        <a href="#"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={navigateToRecommended} className="mouse"/>
                    </div>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id="curve" clipPathUnits="objectBoundingBox">
                                <path d="M 0 0 L 0 0 L 1 0 L 1 0.7 C 0.65 1 0.35 1 0 0.7 Z"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <Dynamic>
                        <div id={'recommended'} className="session-view">
                            <div className="container">
                                <div className="top-section">
                                    <div className="title-container">
                                        <div className="line"/>
                                        <div className="text">دوره های پیشنهادی</div>
                                    </div>
                                    <div className="more">
                                        <a href="#">مشاهده بیشتر</a>
                                        <div className="arrow"/>
                                    </div>
                                </div>
                                {recommended !== 'pending' && recommended.length !== 0 ? <div className="courses">
                                    <SwiperView from={'courses'} responsive={true} elements={(()=>{
                                        let result = [];
                                        recommended.map((e, index)=>{
                                            result.push(<CourseView key={index} img={e.image} title={e.title}
                                                                    desc={e.courseDesc} slug={e.slug}
                                                                    author={{image: '/img/author.svg', name: 'تیم مدیریت'}}
                                                                    id={e.id}
                                                                    course={{duration: 26, sessions: 18, price: parseInt(e.price)}}/>)
                                        })
                                        return result;
                                    })()}/>
                                </div> : <Loading />}
                            </div>
                        </div>
                    </Dynamic>
                    <div className="comments">
                        <div className="title">نظرات برخی از دانشجو ها</div>
                        <div className="comments-container">
                            <SwiperView responsive={false} items={1} elements={[
                                <div className="comment-item">
                                    <div className="image">
                                        <Image src={'/img/comment-image.svg'} layout={'fill'}/>
                                    </div>
                                    <div className="name">اسم دانشجو</div>
                                    <div className="course-link">
                                        <a href="#">دوره صفر تا صد html</a>
                                    </div>
                                    <div className="desc">
                                        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در
                                        صنعت چاپ،
                                        صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از
                                        ترکیب
                                        بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                                        می
                                        نماید
                                    </div>
                                    <div className="liked">
                                        <div className="text">به کاربران دیگر آکادمی را پیشنهاد میکند</div>
                                        <div className="like"/>
                                    </div>
                                </div>,
                                <div className="comment-item">
                                    <div className="image">
                                        <Image src={'/img/comment-image.svg'} layout={'fill'}/>
                                    </div>
                                    <div className="name">اسم دانشجو</div>
                                    <div className="course-link">
                                        <a href="#">دوره صفر تا صد html</a>
                                    </div>
                                    <div className="desc">
                                        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در
                                        صنعت چاپ،
                                        صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از
                                        ترکیب
                                        بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                                        می
                                        نماید
                                    </div>
                                    <div className="liked">
                                        <div className="text">به کاربران دیگر آکادمی را پیشنهاد میکند</div>
                                        <div className="like"/>
                                    </div>
                                </div>,
                                <div className="comment-item">
                                    <div className="image">
                                        <Image src={'/img/comment-image.svg'} layout={'fill'}/>
                                    </div>
                                    <div className="name">اسم دانشجو</div>
                                    <div className="course-link">
                                        <a href="#">دوره صفر تا صد html</a>
                                    </div>
                                    <div className="desc">
                                        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در
                                        صنعت چاپ،
                                        صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از
                                        ترکیب
                                        بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                                        می
                                        نماید
                                    </div>
                                    <div className="liked">
                                        <div className="text">به کاربران دیگر آکادمی را پیشنهاد میکند</div>
                                        <div className="like"/>
                                    </div>
                                </div>
                            ]}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'30px'} blur={'0px'}
                                            right={'70%'} top={'10%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'60px'} blur={'1px'}
                                            right={'80%'} top={'20%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'50px'} blur={'0px'}
                                            right={'77%'} top={'50%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'40px'} blur={'3px'}
                                            right={'70%'} top={'60%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'40px'} blur={'2px'}
                                            right={'20%'} top={'10%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'40px'} blur={'0px'}
                                            right={'10%'} top={'30%'}/>
                            <FloatingAvatar img={'/img/other-avatar.svg'} size={'30px'} blur={'3px'}
                                            right={'25%'} top={'70%'}/>
                        </div>
                    </div>
                    <div className="top-posts">
                        <div className="container">
                            <div className="top-section">
                                <div className="title-container">
                                    <div className="line"/>
                                    <div className="text">آخرین مطالب وبلاگ</div>
                                </div>
                                <div className="more">
                                    <a href="#">مشاهده بیشتر</a>
                                    <div className="arrow"/>
                                </div>
                            </div>
                            <div className="posts">
                                <SwiperView items={3} responsive={true} elements={[
                                    <PostView img={'/img/wp.jpg'} title={'همه چیز راجب فلاتر'}
                                              desc={'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود ...'}
                                              date={'هفته پیش'} category={'اخبار'} link={'#'}/>,
                                    <PostView img={'/img/wp.jpg'} title={'همه چیز راجب فلاتر'}
                                              desc={'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود ...'}
                                              date={'هفته پیش'} category={'اخبار'} link={'#'}/>,
                                    <PostView img={'/img/wp.jpg'} title={'همه چیز راجب فلاتر'}
                                              desc={'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود ...'}
                                              date={'هفته پیش'} category={'اخبار'} link={'#'}/>,
                                    <PostView img={'/img/wp.jpg'} title={'همه چیز راجب فلاتر'}
                                              desc={'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود ...'}
                                              date={'هفته پیش'} category={'اخبار'} link={'#'}/>,
                                    <PostView img={'/img/wp.jpg'} title={'همه چیز راجب فلاتر'}
                                              desc={'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود ...'}
                                              date={'هفته پیش'} category={'اخبار'} link={'#'}/>
                                ]}/>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </MainContent>
        </>
    )
}