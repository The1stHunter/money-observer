import { makeAutoObservable } from 'mobx';

interface Account {
    name: string;
    countInAllAccounts?: boolean;
}

class Accounts {
    constructor() {
        makeAutoObservable(this);
    }

    accounts: Account[] = [
        {
            name: 'Дебетовка',
            countInAllAccounts: true
        }, {
            name: 'Копилка',
        }, {
            name: 'Общий счёт',
            countInAllAccounts: true
        }
    ];

    add(acc: Account) {
        this.accounts.push(acc)
    }

    remove(index: number) {
        this.accounts = this.accounts.filter((account, i) => i !== index);
    }

    edit(index: number, acc: Account) {
        this.accounts[index] = acc;
    }
}

export default new Accounts();