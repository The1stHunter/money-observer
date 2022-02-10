import React, { useCallback, useMemo } from 'react';
import { observer } from "mobx-react-lite";
import { Plus } from "../../font-awesome/Icons";
import accounts from '../../store/Accounts';
import { bem } from "../../utils/bem";
import './Accounts.css';
import { AccountEditor } from '../AccountEditor/AccountEditor';
import { Link, Route, Routes } from 'react-router-dom';
import { popups } from '../../routes/routes';

export const Accounts = observer(() => {
    const className = useMemo(() =>bem('accounts'), []);
    const header = accounts.accounts.length ? 'Ваши счета' : 'У вас пока нет счёта';

    return (
        <>
            <div className={className()}>
                <div className={className('header')}>{header}</div>
                <div className={className('list')}>
                    {accounts.accounts.map((acc, index) => <Link to={`${popups.accountEditor}/${index}`} className={className('item')} key={index}>{acc.name}</Link>)}
                    <Link to={`${popups.accountEditor}/new`} className={className('item', {'add': ''})}><Plus /></Link>
                </div>
            </div>
            <Routes>
                <Route path={`${popups.accountEditor}/:id`} element={<AccountEditor />} />
            </Routes>
        </>
    );
});
