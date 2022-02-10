import React from 'react';
import { Menu } from '../Menu/Menu';
import { observer } from 'mobx-react-lite';
import { CashflowTab } from '../Cashflow/Cashflow';
import { CashFlowReality } from '../../store/Cashflow';
import { Accounts } from '../Accounts/Accounts';
import './App.css';
import { Route, Routes  } from 'react-router-dom';
import { routes } from '../../routes/routes';

export const App = observer(() => {
    return (
        <div className='App'>
            <Menu />
            <Routes>
                <Route path={`/${routes.cashflow}/*`} element={<CashflowTab reality={CashFlowReality.reality} />} />
                <Route path={`/${routes.planning}/*`} element={<CashflowTab reality={CashFlowReality.plan} />} />
                <Route path={`/${routes.accounts}/*`} element={<Accounts />} />
            </Routes>
        </div>
    )
});
