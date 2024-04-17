import { Link, Outlet } from "react-router-dom";
import { Button } from "../components/button";
import grifonLogo from '../assets/grifon.svg'

import './root.css'

export default function Root() {
    return (
        <>
            <header className='header' id='top'>
                <nav className='navigation'>
                <a href="#top">
                    <img src={grifonLogo} alt="GrifOn logo"/>
                </a>
                <ul className='header-list'>
                    <li className='header-list_item'><a href='#impact'>Эффект от внедрения</a></li>
                    <li className='header-list_item'><a href='#howto'>Как это работает</a></li>
                    <li className='header-list_item'><a href='#proposal'>Наше предложение</a></li>
                    <li className='header-list_item'><a href='#contacts'>Контакты</a></li>
                </ul>
                <Button href='#request'>Оставить заявку</Button>
                </nav>
            </header>
    
            <main className='main'>
                <Outlet/>
            </main>
    
            <footer className='footer'>
                <a href="#top">
                <img src={grifonLogo} className="logo" alt="GrifOn logo"/>
                </a>
                <p>© 2024 ООО Грифон Вижн. Все права защищены.</p>
                <Link to='/policy'>Политика конфиденциальности</Link>
            </footer>
        </>
    );
}
