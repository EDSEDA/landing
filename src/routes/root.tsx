import { Outlet } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { observer } from "mobx-react-lite";

import { useStore } from "../lib/store";
import { Button } from "../components/button";
import Popup, { PopupType } from "../components/popup";

import grifonLogo from '../assets/grifon.svg'

import './root.css'

const Root = observer(() => {
    const { store } = useStore();

    return (
        <>
            {store.popupType !== PopupType.INVISIBLE && (
                <div className="popup-container">
                    <Popup popupType={store.popupType}/>
                </div>
            )}

            <header className='header' id='top'>
                <nav className='navigation'>
                <Link smooth to="/#top">
                    <img src={grifonLogo} alt="GrifOn logo"/>
                </Link>
                <ul className='header-list'>
                    <li className='header-list_item'><Link smooth to='/#impact'>Эффект от внедрения</Link></li>
                    <li className='header-list_item'><Link smooth to='/#howto'>Как это работает</Link></li>
                    <li className='header-list_item'><Link smooth to='/#proposal'>Наше предложение</Link></li>
                    <li className='header-list_item'><Link smooth to='/#contacts'>Контакты</Link></li>
                </ul>
                <Button href='/#request'>Оставить заявку</Button>
                </nav>
            </header>
    
            <main className='main'>
                <Outlet/>
            </main>

            <footer className='footer'>
                <Link smooth to="/#top">
                <img src={grifonLogo} className="logo" alt="GrifOn logo"/>
                </Link>
                <p>© 2024 ООО Грифон Вижн. Все права защищены.</p>
                <Link smooth to='/policy#top'>Политика конфиденциальности</Link>
            </footer>
        </>
    );
});

export default Root;
