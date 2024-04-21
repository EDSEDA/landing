import { HashLink as Link } from 'react-router-hash-link'
import { useState } from 'react'

import { useStore } from '../lib/store.ts'

import { Button } from '../components/button.tsx'
import { PopupType } from '../components/popup.tsx'

import recordingIcon from '../assets/recording.svg'
import cubeIcon from '../assets/cube.svg'
import pinkListIcon from '../assets/pink-list.svg'
import greenBasketIcon from '../assets/green-basket.svg'
import purplePeopleIcon from '../assets/purple-people.svg'
import yellowWalletIcon from '../assets/yellow-wallet.svg'
import arrowRightIcon from '../assets/arrow-right.svg'
import outlineArrowIcon from '../assets/outline-arrow.svg'

import cashierProcessImage from '/cashier-process.png'
import howtoScheme from '/howto-scheme.svg'
import howtoVerticalScheme from '/howto-scheme-vertical.svg'
import cashierImage from '/cashier.svg'
import sphere1Image from '/sphere1.svg'
import sphere2Image from '/sphere2.svg'
import sphere3Image from '/sphere3.svg'
import ceoPhoto from '/Kostylev.png'
import sellerPhoto from '/Bondarenko.png'


import './main.css'
import classNames from 'classnames'

const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export interface FormFields {
  name?: string;
  mail?: string;
  comment?: string;
}

function validateFormData({ name, mail }: FormFields): FormFields {

  const errors: FormFields = {};

  console.log(mail)

  if (!name || !name.trim()) {
    errors.name = 'Это обязательное поле';
  }

  if (!mail || !mail.trim()) {
    errors.mail = 'Это обязательное поле';
  } else if (!mail.toLowerCase().match(mailRegex)) {
    errors.mail = 'Неверный формат';
  }

  return errors;
}


export default function Main () {

    const { store } = useStore();
    const [formErrors, setFormErrors] = useState<FormFields>({});

    const onRequestSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();

        const data = Object.fromEntries(
          new FormData(e.target as HTMLFormElement)
        ) as unknown as FormFields;
        const errors = validateFormData(data);
        setFormErrors(errors);

        if (errors.name || errors.mail || errors.comment) {
          return;
        }

        try {
          await fetch('/request', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
          store.setPopupType(PopupType.REQUEST_SENT);
        } catch {
          store.setPopupType(PopupType.ERROR);
        }
    };

    return (
        <>
            <section className='section'>
              <div className='preview'>
                <h1 className='preview_header'>GrifOn</h1>
                <p className='preview_text'>
                  Система персональных рекомендаций в оффлайне. Сделайте шаг вперед в программе лояльности.
                </p>
                <img className='preview_img' src={cashierProcessImage} loading='lazy'/>
              </div>
              <div className='tags'>
                <div className='tag-card __blue'>
                  <img className='tag-card_icon' src={recordingIcon}/>
                  <div>
                    <h3 className='tag-card_header'>Computer Vision</h3>
                    <p className='tag-card_text'>Идентификация клиента в магазине</p>
                  </div>
                </div>
                <div className='tag-card __green'>
                  <img className='tag-card_icon' src={cubeIcon}/>
                  <div>
                    <h3 className='tag-card_header'>Machine learning</h3>
                    <p className='tag-card_text'>Сбор и анализ данных о клиенте, составление персональных рекомендаций</p>
                  </div>
                </div>
              </div>
            </section>

            <section className='section' id='impact'>
              <h2 className='section_header'>Эффект от внедрения</h2>
              <div className='effect-list'>
                <div className='effect-card'>
                  <img className='effect-card_img' src={pinkListIcon}/>
                  <p className='effect-card_caption'>
                    Точная рекомендация, которая соответствует предпочтениям клиента
                  </p>
                </div>
                <div className='effect-card'>
                  <img className='effect-card_img' src={purplePeopleIcon}/>
                  <p className='effect-card_caption'>
                    Учет индивидуальности и истории покупок клиента
                  </p>
                </div>
                <div className='effect-card'>
                  <img className='effect-card_img' src={greenBasketIcon}/>
                  <p className='effect-card_caption'>
                    Увеличение количества проданных товаров отдельных категорий <span className='lightgreen'>до 70%</span>
                  </p>
                </div>
                <div className='effect-card'>
                  <img className='effect-card_img' src={yellowWalletIcon}/>
                  <p className='effect-card_caption'>
                    Увеличение суммы среднего чека покупателя <span className='lightyellow'>на 5%</span>
                  </p>
                </div>
              </div>
              <Button className='mega-button' href='#request'>
                  Оставить заявку
              </Button>
            </section>

            <section className='section' id='howto'>
              <h2 className='section_header' style={{marginBottom: 80}}>Как это работает?</h2>
              <img className='howto-scheme __horizontal' src={howtoScheme} loading='lazy'/>
              <img className='howto-scheme __vertical' src={howtoVerticalScheme} loading='lazy'/>
            </section>

            <section className='section appearance'>
              <div>
                <h2 className='appearance_header'>Как это выглядит</h2>
                <p className='appearance_text'>
                  Перед клиентом на кассе будут выводиться персональные рекомендации, которые будут динамично изменяться в соответствие с его новыми товарами покупки.<br/><br/>
                  Для поощрения продаж есть возможность установить персональные скидки на отдельные товары из рекомендация для каждого клиента.
                </p>
              </div>
              <img className='appearance_img' src={cashierImage} loading='lazy'/>
            </section>

            <section className='section'>
              <h2 className='section_header'>Параметры обучения модели</h2>
              <div className='learning-list'>
                <div className='learning-card'>
                  <h3 className='learning-card_header'>Клиент</h3>
                  <ul className='learning-card_list'>
                    <li className='learning-card_item'>Пол, возраст</li>
                    <li className='learning-card_item'>Раса</li>
                    <li className='learning-card_item'>Сопровождающие клиента</li>
                    <li className='learning-card_item'>История покупок и пр.</li>
                  </ul>
                </div>
                <div className='learning-card'>
                  <h3 className='learning-card_header'>Паттерны покупок</h3>
                  <ul className='learning-card_list'>
                    <li className='learning-card_item'>Покупки других клиентов по периоду, по бренду, по категории</li>
                    <li className='learning-card_item'>Товары комплементы, субституты</li>
                  </ul>
                </div>
                <div className='learning-card'>
                  <h3 className='learning-card_header'>Внешние факторы</h3>
                  <ul className='learning-card_list'>
                    <li className='learning-card_item'>Погодные условия, время года и суток</li>
                    <li className='learning-card_item'>Локация точки</li>
                    <li className='learning-card_item'>Праздники и пр.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className='section' id='proposal'>
              <h2 className='section_header'>Наше предложение</h2>
              <div className='proposal-list'>
                <div className='proposal-card'>
                  <img className='proposal-card_img' src={sphere1Image} loading='lazy'/>
                  <h3 className='proposal-card_header'>Сбор и хранение данных</h3>
                  <p className='proposal-card_text'>Идентифицируем каждого клиента, собираем и анализируем данные о покупках клиентов</p>
                  <Button clear className='proposal-card_more' onClick={() => store.setPopupType(PopupType.STORING_MORE)}>
                    Узнать больше
                    <img className='proposal-card_more-icon' src={outlineArrowIcon}/>
                  </Button>
                </div>
                <div className='proposal-card'>
                  <img className='proposal-card_img' src={sphere2Image} loading='lazy'/>
                  <h3 className='proposal-card_header'>Персональные рекомендации</h3>
                  <p className='proposal-card_text'>Выдаем персональные рекомендации для каждого клиента с гибкой системой изменения</p>
                  <Button clear className='proposal-card_more' onClick={() => store.setPopupType(PopupType.RECOMMENDATION_MORE)}>
                    Узнать больше
                    <img className='proposal-card_more-icon' src={outlineArrowIcon}/>
                  </Button>
                </div>
                <div className='proposal-card'>
                  <img className='proposal-card_img' src={sphere3Image} loading='lazy'/>
                  <h3 className='proposal-card_header'>Интеграция в кассовую систему</h3>
                  <p className='proposal-card_text'>По запросу полностью интегрируемся в вашу систему, делаем дизайн рекомендаций для вашего бренда</p>
                  <Button clear className='proposal-card_more' onClick={() => store.setPopupType(PopupType.INTEGRATION_MORE)}>
                    Узнать больше
                    <img className='proposal-card_more-icon' src={outlineArrowIcon}/>
                  </Button>
                </div>
              </div>
            </section>

            <section className='section' id='request'>
              <h2 className='section_header request_header'>Свяжитесь с нами</h2>
              <p className='request_caption'>Заинтересовало сотрудничество или просто хотите пообщаться с нашей командой? Заполните форму, указанную ниже или свяжитесь с нами</p>
              <form className='form' onSubmit={onRequestSubmit}>
                <div className='form_inputs'>
                  <div className='form_input-container'>
                    <input className={classNames('form_input', formErrors.name && '__error')} name='name' placeholder='ИМЯ'/>
                    {formErrors.name && (
                      <p className='form_input-error'>{formErrors.name}</p>
                    )}
                  </div>
                  <div className='form_input-container'>
                    <input className={classNames('form_input', formErrors.mail && '__error')} name='mail' placeholder='EMAIL'/>
                    {formErrors.mail && (
                      <p className='form_input-error'>{formErrors.mail}</p>
                    )}
                  </div>
                  <div className='form_input-container __long'>
                    <input className={classNames('form_input', formErrors.comment && '__error')} name='comment' placeholder='КОММЕНТАРИЙ'/>
                    {formErrors.comment && (
                      <p className='form_input-error'>{formErrors.comment}</p>
                    )}
                  </div>
                </div>
                <p className='form_caption'>Отправляя заявку, соглашаюсь с <Link className='policy-link' smooth to='/policy#top'>политикой конфиденциальности</Link></p>
                <div className='form_submit'>
                  <Button className='form_submit-button' type='submit'>
                    <p className='form_submit-button-text'>ОТПРАВИТЬ ЗАЯВКУ</p>
                    <img className='button_big-right-arrow' src={arrowRightIcon}/>
                  </Button>
                </div>
              </form>
            </section>

            <section className='section' id='contacts'>
              <h2 className='section_header'>Наши контакты</h2>
              <div className='contacts'>
                <div className='contacts-card'>
                  <img className='contacts-card_img' src={ceoPhoto} loading='lazy'/>
                  <div className='contacts-card_info'>
                    <h3 className='contacts-card_name'>Костылев Иван</h3>
                    <p className='contacts-card_position'>Генеральный директор</p>
                    <p className='contacts-card_contact'>+7 (922) 383 - 04 -59</p>
                    <p className='contacts-card_contact'>i.kostylev@grifon-vision.com</p>
                  </div>
                </div>
                <div className='contacts-card'>
                  <img className='contacts-card_img' src={sellerPhoto} loading='lazy'/>
                  <div className='contacts-card_info'>
                    <h3 className='contacts-card_name'>Бондаренко Андрей</h3>
                    <p className='contacts-card_position'>Менеджер по продажам</p>
                    <p className='contacts-card_contact'>+7 (916) 933 - 25 - 32</p>
                    <p className='contacts-card_contact'>a.bondarenko@grifon-vision.com</p>
                  </div>
                </div>
              </div>
            </section>
        </>
    );
}
