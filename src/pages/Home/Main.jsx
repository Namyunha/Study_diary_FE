import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import UserModal from '../../components/modals/UserModal'
import ModalPortal from '../../components/modals/Portal'
import { useSwitch } from '../../hooks/userHooks'
import { useSelector } from 'react-redux';

function Main() {
    const user = useSelector((state) => state.user.value);
    const nav = useNavigate();
    const cookie = new Cookies();
    const jwtToken = cookie.get('jwtToken')
    console.log("redux user = ", user);
    useEffect(() => {
        if(jwtToken){
            alert('이미 로그인 된 유저입니다.')
            nav("/diaryList")
        }
    }, [])

    
    const { state: modalOn, handleState: handleModal } = useSwitch();
    const [mode, setMode] = useState(null);
    const onModalHandler = (mod) => {
        setMode(mod);
        handleModal();
    }
    return (
        <div>
            <h1>{user.position}</h1>
            <button onClick={() => onModalHandler("LOGIN")}>로그인</button>
            <button onClick={() => onModalHandler("REGISTER")}>회원가입</button>
            <ModalPortal>
                {modalOn && <UserModal mode={mode} onClose={handleModal} />}
            </ModalPortal>
            <button onClick={() => nav('/listdiaryList')}>비회원</button>
        </div>
    )
}

export default Main