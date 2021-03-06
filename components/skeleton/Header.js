import Image from 'next/image'
import OverLay from "./OverLay";
import ReactDOM from 'react-dom';
import React, {useContext, useEffect, useRef, useState} from "react";
import OverLaySearch from "../OverLaySearch";
import MiniHeader from "./MiniHeader";
import Link from 'next/link'
import {HeaderInfo, UserContext} from "../../pages/_app";
import Cart from "./Cart";
import {useRouter} from "next/router";
import Loading from "../Loading";

export default function Header(props){

    const headerText = useContext(HeaderInfo);

    const hoverRef = useRef();

    const user = useContext(UserContext);

    const router = useRouter();

    function handleClick(){
        const overlay = () => {
            return (
                <OverLay>
                    <OverLaySearch router={router}  />
                </OverLay>
            )
        }
        ReactDOM.render(React.createElement(overlay), document.getElementById('portal-root'))
    }

    function handleMobileHeader(){
        const overlay = () => {
            return (
                <OverLay>
                    <MiniHeader />
                </OverLay>
            )
        }
        ReactDOM.render(React.createElement(overlay), document.getElementById('portal-root'))
    }

    const handleAccountEnter = () => {
        if (user !== 'pending' && user !== null){
            hoverRef.current.style.display = 'block'
        }
    }

    const handleAccountLeave = () => {
        hoverRef.current.style.display = 'none'
    }


    if (props.dark){
        return (
            <>
                <header className={`desktop-header-dark`} >
                    <div className={'header-container'}>
                        <div className="top-shifted">
                            <Link href={'/'}>
                                <a className={'logo'}>
                                    <div className="image">
                                        <Image src={'/img/logo-fill.svg'} layout={'fill'} />
                                    </div>
                                    <div className={'title'}>
                                        <div className={'top'}>????????????</div>
                                        <div className={'bot'}>?????????????? ????????????</div>
                                    </div>
                                </a>
                            </Link>
                            <div className={'nav'}>
                                <div className="nav-item active">
                                    <Link href={'/'}>
                                        <a>???????? ????????</a>
                                    </Link>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????? ????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">??????????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????????? ????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????? ???? ????</a>
                                </div>
                            </div>
                            <div className="options">
                                <div className="search" onClick={handleClick} />
                                <div style={{position: 'relative'}} onMouseEnter={handleAccountEnter} onMouseLeave={handleAccountLeave} className="account">
                                    <div className="icon" />
                                    {user === 'pending' ? <Loading /> : <Link href={headerText.link}>
                                        <a className="account-link">{headerText.text}</a>
                                    </Link>}
                                    <div ref={hoverRef} className="account-hover">
                                        <div className="hover-item"><Link href={'/dashboard'}><a>?????? ????????????</a></Link></div>
                                        <div className="hover-item"><Link href={'/logout'}><a>????????</a></Link></div>
                                    </div>
                                </div>
                                <div className="separator" />
                                <Cart />
                            </div>
                        </div>
                    </div>
                </header>
                <header className='mobile-header-dark'>
                    <div className="mobile-container">
                        <div className={'logo'}>
                            <div className="image">
                                <Image src={'/img/logo-fill.svg'} layout={'fill'} />
                            </div>
                            <div className={'title'}>
                                <div className={'top'}>????????????</div>
                                <div className={'bot'}>?????????????? ????????????</div>
                            </div>
                        </div>
                        <div className="search" onClick={handleClick} />
                        <div className="cart" />
                        <div onClick={handleMobileHeader} className="icon" />
                    </div>
                </header>
            </>
        )
    }else{
        return (
            <>
                <header className={`desktop-header`} >
                    <div className={'header-container'}>
                        <div className="top-shifted">
                            <Link href={'/'}>
                                <a className={'logo'}>
                                    <div className="image">
                                        <Image src={'/img/logo.svg'} layout={'fill'} />
                                    </div>
                                    <div className={'title'}>
                                        <div className={'top'}>????????????</div>
                                        <div className={'bot'}>?????????????? ????????????</div>
                                    </div>
                                </a>
                            </Link>
                            <div className={'nav'}>
                                <div className="nav-item active">
                                    <Link href={'/'}>
                                        <a>???????? ????????</a>
                                    </Link>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????? ????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">??????????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????????? ????</a>
                                </div>
                                <div className="nav-item">
                                    <a href="#">???????? ???? ????</a>
                                </div>
                            </div>
                            <div className="options">
                                <div className="search" onClick={handleClick} />
                                <div style={{position: 'relative'}} onMouseEnter={handleAccountEnter} onMouseLeave={handleAccountLeave} className="account">
                                    <div className="icon" />
                                    {user === 'pending' ? <Loading /> : <Link href={headerText.link}>
                                        <a className="account-link">{headerText.text}</a>
                                    </Link>}
                                    <div ref={hoverRef} className="account-hover">
                                        <div className="hover-item"><Link href={'/dashboard'}><a>?????? ????????????</a></Link></div>
                                        <div className="hover-item"><Link href={'/logout'}><a>????????</a></Link></div>
                                    </div>
                                </div>
                                <div className="separator" />
                                <Cart />
                            </div>
                        </div>
                    </div>
                </header>
                <header className='mobile-header'>
                    <div className="mobile-container">
                        <div className={'logo'}>
                            <div className="image">
                                <Image src={'/img/logo.svg'} layout={'fill'} />
                            </div>
                            <div className={'title'}>
                                <div className={'top'}>????????????</div>
                                <div className={'bot'}>?????????????? ????????????</div>
                            </div>
                        </div>
                        <div className="search" onClick={handleClick} />
                        <div className="cart" />
                        <div onClick={handleMobileHeader} className="icon" />
                    </div>
                </header>
            </>
        )
    }
}