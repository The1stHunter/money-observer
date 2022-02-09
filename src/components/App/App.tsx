import React from 'react';
import { Menu } from '../Menu/Menu';
import menu, { TabName } from '../../store/Menu';
import { observer } from 'mobx-react-lite';
import { CashflowTab } from '../Cashflow/Cashflow';
import { CashFlowReality } from '../../store/Cashflow';
import { Accounts } from '../Accounts/Accounts';
import './App.css';
import { AllPopups } from '../Popup/Popup';

export const App = observer(() => {
    let tab;
    switch (menu.tab) {
        case TabName.planning:
            tab = <CashflowTab reality={CashFlowReality.plan} />;
            break;
        case TabName.cashflow:
            tab = <CashflowTab reality={CashFlowReality.reality} />;
            break;
        case TabName.accounts:
            tab = <Accounts />;
            break;
        default:
            break;
    }

    return (
        <div className='App'>
            <Menu />
            {tab}
            <AllPopups />
        </div>
    )
});
