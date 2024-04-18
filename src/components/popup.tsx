import { useStore } from '../lib/store';

import crossIcon from '../assets/cross.svg';

import './popup.css'
import classNames from 'classnames';


export enum PopupType {
    INVISIBLE,
    REQUEST_SENT,
    INTEGRATION_MORE,
    RECOMMENDATION_MORE,
    STORING_MORE,
    ERROR,
}

export interface PopupProps {
    popupType: PopupType;
}

export interface PoputData {
    header: string;
    text: React.ReactNode;
}

const POPUP_DATA: Record<Exclude<PopupType, PopupType.INVISIBLE>, PoputData> = {
    [PopupType.REQUEST_SENT]: {
        header: 'Заявка отправлена',
        text: 'Ваша заявка отправлена. В течение 2 рабочих дней с вами  свяжется нащ специалист для обсуждения вашего вопроса',
    },
    [PopupType.INTEGRATION_MORE]: {
        header: 'Интеграция в кассовую систему',
        text: (
            <>
                <span>Интеграция в кассовую систему предполагает:</span>
                <ul className='popup_text'>
                    <li>Получение от кассы информации о пробитых товарах;</li>
                    <li>Отображение рекомендаций на нашем планшете тех товаров, которые действительно остались в магазине;</li>
                    <li>Опционально вывод списка пробитых товаров и итоговой суммы покупки.</li>
                </ul>
                <span>Кроме того в нашем приложении рекомендаций мы можем отобразить любые ваши пожелания: актуальные скидки, новости, промокоды, корпоративные дизайнерские решения и пр.</span>
            </>
        ),
    },
    [PopupType.RECOMMENDATION_MORE]: {
        header: 'Персональные рекомендации',
        text: (
            <>
                <span>Наши рекомендации основаны на следующих параметрах:</span>
                <ul className='popup_text'>
                    <li>На закономерности истории покупок определенного товара клиентом.<br/>Если клиент покупает молоко раз в 5 дней, то наш алгоритм с большой вероятностью будет рекомендовать клиенту молоко спустя 5 дней после его последней покупки;</li>
                    <li>На привычках и предпочтениях клиента.<br/>Если мы видим, что клиент любит мармелад и покупает его чаще, чем остальные клиенты, то этому клиенту мы с будем рекомендовать мармелад с большей вероятностью, чем остальным;</li>
                    <li>На предпочтениях похожих клиентов.<br/>Если у одного из клиентов список покупок сильно похож на список покупок определенной группы других клиентов, то мы будем рекомендовать этому клиенту те товары, которые покупает похожая на него группа;</li>
                    <li>На учете внешних факторов.<br/>Если на улице жарко, мы с большей вероятностью будем рекомендовать прохладительные напитки и мороженое, если скоро новый год, то мы с большей вероятностью будем рекомендовать мандарины.</li>
                </ul>
            </>
        )
    },
    [PopupType.STORING_MORE]: {
        header: 'Сбор и хранение данных',
        text: (
            <>
                <span>Для формирования качественных рекомендаций в нашей системе используется несколько баз данных и датасетов:</span>
                <ul className='popup_text'>
                    <li>База данных истории покупок клиентов - чтобы мы знали что рекомендовать своим клиентам;</li>
                    <li>База данных истории рекомендаций покупок клиентов - чтобы мы всегда помнили что рекомендоовали своим клиентам;</li>
                    <li>Датасет для обучения системы определению визуальных признаков человека;</li>
                    <li>Опционально: датасет с закодированными признаками черт лица клиентов согласившихся участвовать в нашей программе улучшений рекомендаций.</li>
                </ul>
                <span>При этом мы не храним фотографии наших клиентов. Видео с камер обрабатывается непосредственно внутри магазина и на наши сервера попадают только результаты обработки видеопотока происходящего внутри.</span>
            </>
        )
    },
    [PopupType.ERROR]: {
        header: 'Что-то пошло не так',
        text: 'Но мы уже это чиним. Попробуйте зайти к нам еще раз через час',
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
            <article className={classNames('popup', `__${popupType}`)}>
                <h1 className='popup_header'>{header}</h1>
                <p className='popup_text'>{text}</p>
                <span className='popup_close' onClick={close}>
                    <img className='popup_close-img' src={crossIcon}/>
                </span>
            </article>
        </>
    )
}
