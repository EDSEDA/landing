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

    setPopupType = (popupType: PopupType) => {
        this.popupType = popupType;
    }

}

export const useStore = () => {
    const store = useContext(Context);
    if (!store) throw new Error('Use App store within provider!');
    return store;
};
