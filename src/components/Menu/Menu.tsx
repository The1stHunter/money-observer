import React from 'react';
import { bem } from '../../utils/bem';
import menu, { TabName } from '../../store/Menu';
import { observer } from 'mobx-react-lite';
import './Menu.css';

export const Menu = observer(() => {
    const className = bem('menu');

    const buttonClass = (tabName: TabName) => tabName === menu.tab ? className('button', {active: ''}) : className('button');

    return (        
        <div className={className()}>
            <div className={buttonClass(TabName.cashflow)} onClick={() => menu.setTab(TabName.cashflow)}>Кешфлоу</div>
            <div className={buttonClass(TabName.planning)} onClick={() => menu.setTab(TabName.planning)}>Планирование</div>
            <div className={buttonClass(TabName.accounts)} onClick={() => menu.setTab(TabName.accounts)}>Счета</div>
        </div>
    );
});
