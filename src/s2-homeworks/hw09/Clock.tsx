import React, {useState, useEffect} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined)

    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [time, setTime] = useState<string>('')
    const [day, setDay] = useState<string>('')
    const [isStart, setStartTimer] = useState<boolean>(false)

    useEffect(()=> {
        setTime(nowT);
        setDay(`${nowDay}`)
    },[])

    const arrayDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const arrayMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const h = date.getHours();
    const m = date.getMinutes();
    const sec = date.getSeconds();
    const nowT = `${h}:${m}:${sec}`;

    let monthDay: string | number = date.getUTCDate()
    let month: string | number = date.getMonth() + 1;
    const nowDay = arrayDays[date.getDay()]
    const nowMonth = arrayMonth[date.getMonth()]
    const year = date.getFullYear();

    if (month<10) {
        month = `0${month}`
    } else {
        month = month;
    }

    if (monthDay<10) {
        monthDay = `0${monthDay}`
    } else {
        monthDay = monthDay
    }

    const nowDate = `${monthDay}.${month}.${year}`

    const start = () => {
        setStartTimer(true)
        setDay(`${nowDay}`)

        const idSetInterval = setInterval(()=> {
            const dateInstance = new Date();
            const hours = dateInstance.getHours();
            const minutes = dateInstance.getMinutes();
            const seconds = dateInstance.getSeconds();
            const nowTime = `${hours}:${minutes}:${seconds}`;

            setTime(nowTime);
        }, 1000)
        setTimerId(idSetInterval);
    }

    const stop = () => {
        clearInterval(timerId)
        setStartTimer(false);
    }

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShow(true)
    }

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShow(false)
    }

    const stringTime =  time || <br/>
    const stringDate =  nowDate || <br/>

    const stringDay = day || <br/>
    const stringMonth = nowMonth || <br/>

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show && (
                        <div>
                            <span id={'hw9-date'}>{stringDate}</span>{' '}
                            <span id={'hw9-month'}>{stringMonth}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={isStart}
                    onClick={start}
                    style={{marginRight: '20px'}}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!isStart}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
