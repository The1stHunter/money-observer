import React, { useCallback, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import { bem } from '../../utils/bem';
import accounts from '../../store/Accounts';
import { Popup } from '../Popup/Popup';
import './AccountEditor.css';
import { useNavigate, useParams } from 'react-router-dom';
import { popups } from '../../routes/routes';

export const AccountEditor = observer(() => {
    const className = bem('account-editor');

    const { id } = useParams();
    const index = Number(id);

    const checkboxRef: React.RefObject<HTMLInputElement> = useRef(null);
    const nameRef: React.RefObject<HTMLInputElement> = useRef(null);

    const headerText = isNaN(index) ? 'Создание счёта' : 'Редактирование счёта';

    const accountData = !isNaN(index) ? accounts.accounts[index] : {
        name: 'Новый счёт',
        countInAllAccounts: false
    };

    const [name, setName] = useState(accountData.name);
    const [checked, setChecked] = useState(accountData.countInAllAccounts);

    const saveData = useCallback(() => {
        const name = nameRef.current?.value;
        const countInAllAccounts = checkboxRef.current?.checked;

        if (!name) {
            return;
        }

        if (isNaN(index)) {
            accounts.add({ name, countInAllAccounts });
        } else {
            accounts.edit(index, { name, countInAllAccounts });
        }
    }, [index]);

    const deleteAccount = useCallback(() => {
        accounts.remove(index);
    }, [index]);

    const navigate = useNavigate();
    const close = useCallback(() => navigate(-1), [navigate]);

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const updateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    const labelText = checked ? 'Не учитывать в общем балансе' : 'Учитывать в общем балансе';

    const checkboxId = 'AccountEditor-checkbox';
    const content = (
        <div className={className('content')}>
            <input type='text' className={className('input')} placeholder={'Введите название счёта'} value={name} ref={nameRef} onChange={updateName}/>
            <div className={className('check-panel')}>
                <label className={className('button')} htmlFor={checkboxId}>{labelText}</label>
                <input id={checkboxId} type='checkbox' checked={checked} ref={checkboxRef} onChange={updateCheckbox} />
            </div>
            {!isNaN(index) ? <div className={className('button')} onClick={() => {close(); setTimeout(deleteAccount, 50)}}>Удалить счёт</div> : null} {/* setTimeout используется, чтобы при удалении последнего элемента не происходило ошибки*/}
        </div>
    );

    return (
        <Popup
            className={className()}
            popupPath={popups.accountEditor}
            content={content}
            hasCloseButton={true}
            title={headerText}
            hasButtonPanel={true}
            hasCancelbutton={true}
            onCloseClick={close}
            onOkClick={() => {close(); saveData()}}
        />
    );
});
