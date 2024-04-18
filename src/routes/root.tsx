import { Outlet } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { observer } from "mobx-react-lite";

import { useStore } from "../lib/store";
import { Button } from "../components/button";
import Popup, { PopupType } from "../components/popup";

import grifonLogo from '../assets/grifon.svg'
import sticksIcon from '../assets/sticks.svg'

import './root.css'

const Root = observer(() => {
    const { store } = useStore();

    return (
        <>
            <div id='top'/>

            {store.popupType !== PopupType.INVISIBLE && (
                <div className="popup-container">
                    <Popup popupType={store.popupType}/>
                </div>
            )}

            <header className='header'>
                <nav className='navigation'>
                    <Link smooth to="/#top">
                        <img className="main-logo" src={grifonLogo} alt="GrifOn logo"/>
                    </Link>
                    <ul className='header-list'>
                        <li className='header-list_item'><Link smooth to='/#impact'>Эффект от внедрения</Link></li>
                        <li className='header-list_item'><Link smooth to='/#howto'>Как это работает</Link></li>
                        <li className='header-list_item'><Link smooth to='/#proposal'>Наше предложение</Link></li>
                        <li className='header-list_item'><Link smooth to='/#contacts'>Контакты</Link></li>
                    </ul>
                    <Button className="header_request-button" href='/#request'>Оставить заявку</Button>

                    <img className="header_sticks" src={sticksIcon}/>
                </nav>
            </header>
    
            <main className='main'>
                <Outlet/>
            </main>

            <footer className='footer'>
                <Link smooth to="/#top">
                <img src={grifonLogo} className="main-logo" alt="GrifOn logo"/>
                </Link>
                <p>© 2024 ООО Грифон Вижн. Все права защищены.</p>
                <Link className="policy-link" smooth to='/policy#top'>Политика конфиденциальности</Link>
            </footer>
        </>
    );
});

export default Root;
