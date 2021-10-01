import Image from "next/image";

export default function Footer(){
    return (
        <footer>
            <div className="footer-container">
                <div className="item desc">
                    <div className={'logo'}>
                        <div className="image">
                            <Image src={'/img/logo.svg'} layout={'fill'} />
                        </div>
                        <div className={'title'}>
                            <div className={'top'}>آکادمی</div>
                            <div className={'bot'}>توضیحات آکادمی</div>
                        </div>
                    </div>
                    <p>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید</p>
                    <div className="social">
                        <div className="social-item" id={'twitter'}><a href="#" /></div>
                        <div className="social-item" id={'facebook'}><a href="#" /></div>
                        <div className="social-item" id={'linkedin'}><a href="#" /></div>
                        <div className="social-item" id={'instagram'}><a href="#" /></div>
                    </div>
                </div>
                <div className="item links">
                    <div className="footer-title">
                        <div className="line" />
                        لینک های مفید
                    </div>
                    <div className="links-container">
                        <div className="link-item">
                            <a href="#">صفحه اصلی</a>
                        </div>
                        <div className="link-item">
                            <a href="#">وبلاگ</a>
                        </div>
                        <div className="link-item">
                            <a href="#">درباره ما</a>
                        </div>
                        <div className="link-item">
                            <a href="#">تماس با ما</a>
                        </div>
                    </div>
                </div>
                <div className="item popular-curses">
                    <div className="footer-title">
                        <div className="line" />
                        دوره های محبوب
                    </div>
                    <div className="links-container">
                        <div className="link-item">
                            <a href="#">طراحی سایت</a>
                        </div>
                        <div className="link-item">
                            <a href="#">پایتون</a>
                        </div>
                        <div className="link-item">
                            <a href="#">یونیتی</a>
                        </div>
                        <div className="link-item">
                            <a href="#">دیتابیس</a>
                        </div>
                    </div>
                </div>
                <div className="item prompts">
                    <div className="footer-title">
                        <div className="line" />
                        مجوزها
                    </div>
                    <div className="prompts-container">
                        <div id={'first'} className="promp-item" />
                    </div>
                </div>
            </div>
            <div className="footer-line" />
            <div className="cr">
                <p>تمامی حقوق این وبسایت متعلق به پروگرمینگ میباشید و هرگونه کپی برداری از آن پیگرد قانونی دارد - 1400</p>
                <p>طراحی شده با <span style={{color: 'red', fontSize: '1rem'}}>❤</span> برای شما عزیزان</p>
            </div>
        </footer>
    )
}