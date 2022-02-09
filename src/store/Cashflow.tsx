import { makeAutoObservable } from 'mobx';

export interface Cash {
    value: number;
    category: string;
}

export enum CashFlowType {
    income,
    expenses
}

export interface CashFlow {
    date: Date;
    [CashFlowType.income]: Cash[];
    [CashFlowType.expenses]: Cash[];
}

export enum CashFlowReality {
    plan,
    reality
}

class Cashflow {
    constructor() {
        makeAutoObservable(this);
    }

    cashflow: Record<CashFlowReality, CashFlow[]> = {
        [CashFlowReality.plan]: [
            {
                date: new Date(2022, 1, 5),
                [CashFlowType.income]: [{value: 96000, category: 'Зарплата'}],
                [CashFlowType.expenses]: []
            }
        ],
        [CashFlowReality.reality]: [
            {
                date: new Date(2022, 1, 5),
                [CashFlowType.income]: [],
                [CashFlowType.expenses]: [{value: 1000, category: 'Продукты'}]
            }
        ]
    }

    ad(reality: CashFlowReality, flow: CashFlow) {
        this.cashflow[reality].push(flow);
    }

    remove(reality: CashFlowReality, index: number) {
        this.cashflow[reality] = this.cashflow[reality].filter((value, i) => i !== index);
    }

    edit(reality: CashFlowReality, index: number, plan: CashFlow) {
        this.cashflow[reality][index] = plan;
    }
}

export default new Cashflow();