import { makeAutoObservable } from 'mobx';

export enum Popups {
    AccountEditor
}

interface PopupData {
    isVisible: boolean;
    [key: string]: any;
}

type PopupsData = Record<Popups, PopupData>;

class Popup {
    constructor() {
        makeAutoObservable(this);
    }
    popups: PopupsData = {
        [Popups.AccountEditor]: {
            isVisible: false
        }
    };

    editPopupData(popup: Popups, data: {[key: string]: any}) {
        for (let key in data) {
            if (key === 'isVisible') {
                continue;
            }

            this.popups[popup][key] = data[key];
        }
    }

    showPopup(popup: Popups) {
        if (this.anyPopupVisible) {
            return;
        }
        this.popups[popup].isVisible = true;
    }

    hidePopup(popup: Popups) {
        this.popups[popup].isVisible = false;
    }

    get anyPopupVisible() {
        for (let popup of Object.values(this.popups)) {
            if (popup.isVisible) {
                return true;
            }
        }
        return false;
    }

}

export default new Popup();