import React from 'react';
import { observer } from "mobx-react-lite";
import { Plus } from "../../font-awesome/Icons";
import accounts from '../../store/Accounts';
import { bem } from "../../utils/bem";
import './Accounts.css';
import { showAccauntEditor } from '../AccountEditor/AccountEditor';

export const Accounts = observer(() => {
    const className = bem('accounts');
    const header = accounts.accounts.length ? 'Ваши счета' : 'У вас пока нет счёта';

    return (
        <div className={className()}>
            <div className={className('header')}>{header}</div>
            <ul className={className('list')}>
                {accounts.accounts.map((acc, index) => <li className={className('item')} key={index} onClick={() => showAccauntEditor(index)}>{acc.name}</li>)}
                <li className={className('item', {'add': ''})} onClick={() => showAccauntEditor()}><Plus /></li>
            </ul>
        </div>
    );
});
