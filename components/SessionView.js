import {CONSTS} from "../contst";
import axios from "axios";
import NProgress from 'nprogress';

const n2p = require('num2persian');

export default function SessionView(props) {
    const {session} = props;

    const download = () => {
        NProgress.start()
        axios.post(CONSTS.apiName + 'dt/' + session.id)
            .then(response => {
                NProgress.done()
                let data = JSON.parse(response.data);
                window.open(CONSTS.fileApi + 'getvideo/' + data, '_blank')
            })
    }
    return (
        <>
            <div className="session-container">
                <div className="counter">{session.sessionNumber}</div>
                <div className="session-info">
                    <div className="title">
                        <div className="session-title">
                            {session.title}
                        </div>
                        {session.isFree ? <div className={'free-session'}>رایگان</div> : (() => {
                            if (props.owned) {
                                return <div className='unlocked-session'/>
                            } else {
                                return <div className='locked-session'/>
                            }
                        })()}
                    </div>
                    <div className="options">
                        <div className="right-side">
                            قسمت {session.sessionNumber.num2persian()}  {!session.isFile ? (()=>{
                           return (
                               <>| {parseInt(session.duration / 60)} دقیقه</>
                            )
                        })() : null}
                        </div>
                        <div className="left-side">
                            {session.isFree ? (() => {
                                if (props.owned){
                                    return (
                                        <>
                                            {!session.isFile ? <div onClick={() => {
                                                props.changeSession(session.id)
                                            }} className="online">مشاهده آنلاین
                                            </div> : null}
                                            <div onClick={download} className="dl"/>
                                        </>
                                    )
                                }else{
                                    return (
                                        <>
                                            <div onClick={() => {
                                                props.changeSession(session.id)
                                            }} className="online">مشاهده آنلاین
                                            </div>
                                        </>
                                    )
                                }
                            })() : (() => {
                               if (props.owned){
                                   return (
                                       <>
                                           {!session.isFile ? <div onClick={() => {
                                               props.changeSession(session.id)
                                           }} className="online">مشاهده آنلاین
                                           </div> : null}
                                           <div onClick={download} className="dl"/>
                                       </>
                                   )
                               }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}