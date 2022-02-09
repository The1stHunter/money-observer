import { makeAutoObservable } from 'mobx';

export enum TabName {
    accounts,
    planning,
    cashflow

}

class Menu {
    constructor() {
        makeAutoObservable(this);
    }
    tab = TabName.accounts;

    setTab(tabName: TabName) {
        this.tab = tabName;
    }
}

export default new Menu();