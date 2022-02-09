import React from 'react';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import cashflow, { Cash, CashFlow, CashFlowReality, CashFlowType } from '../../store/Cashflow';
import { bem } from '../../utils/bem';
import { formatDateOptions } from '../../utils/date';
import './Cashflow.css';

export const CashflowTab = observer((props: {reality: CashFlowReality}) => {
    const className = bem('cashflow');
    const { reality } = props;
    const headerText = cashflow.cashflow[reality].length ? ('Ваш' + (reality === CashFlowReality.plan ? 'и планы' : ' кешфлоу')) : ('У вас пока нет ' + (reality === CashFlowReality.plan ? 'планов' : 'записей'));

    return (
        <div className={className()}>
            <div className={className('header')}>{headerText}</div>
            <div className={className('body')}>{cashflow.cashflow[reality].map((flow, index) => <CashflowCard {...flow} reality={reality} index={index} key={index}/>)}</div>
        </div>
    );
});

const CashflowCard = observer((props: CashFlow & {reality: CashFlowReality; index: number}) => {
    const className = bem('cashflow-card');

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={className()}>
            <div className={className('date')}>{props.date.toLocaleString("ru", formatDateOptions)}</div>
            <div className={className('cashflow')}>
                <CashflowType type={'income'} cash={props[CashFlowType.income]} isOpen={isOpen} />
                <CashflowType type={props.reality === CashFlowReality.plan ? 'saves' : 'expenses'} cash={props[CashFlowType.expenses]} isOpen={isOpen} />
            </div>
            <div className={className('details')} onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Скрыть подробности' : 'Подробнее'}</div>
        </div>
    );
});

const CashflowType = observer((props: {type: 'income' | 'expenses' | 'saves', cash: Cash[], isOpen?: boolean}) => {
    const { cash } = props;
    const typeText = useMemo(() => ({
        income: 'Доходы',
        expenses: 'Расходы',
        saves: 'Отложено'
    }), []);
    const sum = useMemo(() => cash.reduce((s, c) => s + c.value, 0), [cash]);

    const className = bem('cashflow-type');
    const { type, isOpen } = props;

    return isOpen ? (
        cash.length ? <div className={className('', {type: type})}>
            <div>{typeText[type] + ': '}</div>
            <ul>
                {cash.map((c, index) => (
                    <li key={index}>
                        {c.value + ' ' + c.category}
                    </li>
                ))}
            </ul>
        </div> : <div className={className('', {type: type})}>{typeText[type] + ': ' + sum}</div>
    ) : (
        <div className={className('', {hidden: '', type: type})}>
            {typeText[type] + ': ' + sum}
        </div>
    );
});
