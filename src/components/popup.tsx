import { useStore } from '../lib/store';

import crossIcon from '../assets/cross.svg';

import './popup.css'


export enum PopupType {
    INVISIBLE,
    REQUEST_SENT,
}

export interface PopupProps {
    popupType: PopupType;
}

export interface PoputData {
    header: string;
    text: string;
}

const POPUP_DATA: Record<Exclude<PopupType, PopupType.INVISIBLE>, PoputData> = {
    [PopupType.REQUEST_SENT]: {
        header: 'Заявка отправлена',
        text: 'Ваша заявка отправлена. В течение 2 рабочих дней с вами  свяжется нащ специалист для обсуждения вашего вопроса',
    },
};

export default function Popup({ popupType }: PopupProps) {

    if (popupType == PopupType.INVISIBLE) {
        return null;
    }

    const { store } = useStore();
    const { header, text } = POPUP_DATA[popupType];

    const close = () => store.setPopupType(PopupType.INVISIBLE);  

    return (
        <>
            <div className='popup-overlay' onClick={close}/>
            <article className='popup'>
                <h1 className='popup_header'>{header}</h1>
                <p className='popup_text'>{text}</p>
                <span className='popup_close' onClick={close}>
                    <img className='popup_close-img' src={crossIcon}/>
                </span>
            </article>
        </>
    )
}
