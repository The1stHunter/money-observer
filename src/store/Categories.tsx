import { makeAutoObservable } from 'mobx';
import { CashFlowType } from './Cashflow';

class Category {
    constructor() {
        makeAutoObservable(this);
    }

    categories = {
        [CashFlowType.income]: ['Зарплата', 'Проценты', 'Кешбек'],
        [CashFlowType.expenses]:['Продукты', 'Товары для дома'],
    };

    ad(cashFlowType: CashFlowType, category: string) {
        this.categories[cashFlowType].push(category);
    }

    remove(cashFlowType: CashFlowType, category: string) {
        this.categories[cashFlowType] = this.categories[cashFlowType].filter(value => value !== category);
    }

    edit(cashFlowType: CashFlowType, index: number, newCategory: string) {
        this.categories[cashFlowType][index] = newCategory;
    }
}

export default new Category();
