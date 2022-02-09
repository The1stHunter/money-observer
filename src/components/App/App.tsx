import React from 'react';
import { Menu } from '../Menu/Menu';
import { observer } from 'mobx-react-lite';
import { CashflowTab } from '../Cashflow/Cashflow';
import { CashFlowReality } from '../../store/Cashflow';
import { Accounts } from '../Accounts/Accounts';
import './App.css';
import { AllPopups } from '../Popup/Popup';
import { Route, Routes  } from 'react-router-dom';

export const App = observer(() => {
    return (
        <div className='App'>
            <Menu />
            <Routes>
                <Route path='/cashflow' element={<CashflowTab reality={CashFlowReality.reality} />} />
                <Route path='/planning' element={<CashflowTab reality={CashFlowReality.plan} />} />
                <Route path='/accounts' element={<Accounts />} />
            </Routes>
            <AllPopups />
        </div>
    )
});
