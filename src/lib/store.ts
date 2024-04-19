import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

import { PopupType } from "../components/popup";

export interface Context {
    store: Store;
}

export const Context = createContext<Context | null>(null);

export class Store {

    constructor() {
        makeAutoObservable(this);
    }

    popupType: PopupType = PopupType.INVISIBLE;

    sideMenuOpened = false;

    setPopupType = (popupType: PopupType) => {
        this.popupType = popupType;
    }

    toggleSideMenuOpened = () => {
        this.sideMenuOpened = !this.sideMenuOpened;
    }

    closeSideMenu = () => {
        this.sideMenuOpened = false;
    }

}

export const useStore = () => {
    const store = useContext(Context);
    if (!store) throw new Error('Use App store within provider!');
    return store;
};
