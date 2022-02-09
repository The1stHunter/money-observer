import React, { useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import { bem } from '../../utils/bem';
import accounts from '../../store/Accounts';
import { Popup } from '../Popup/Popup';
import { Popups } from '../../store/Popup';
import popup from '../../store/Popup';
import './AccountEditor.css';

export const AccountEditor = observer(() => {
    const { index } = popup.popups[Popups.AccountEditor];
    const className = bem('account-editor');

    const checkboxRef: React.RefObject<HTMLInputElement> = useRef(null);
    const nameRef: React.RefObject<HTMLInputElement> = useRef(null);

    const headerText = index === undefined ? 'Создание счёта' : 'Редактирование счёта';
    const accountData = index !== undefined ? accounts.accounts[index] : {
        name: 'Новый счёт',
        countInAllAccounts: false
    };

    const [name, setName] = useState(accountData.name);
    const [checked, setChecked] = useState(accountData.countInAllAccounts);
    const [prevIndex, setPrevIndex] = useState(index);
    if (prevIndex !== index) { // Обновляем значения после открытия нового попапа
        setName(accountData.name);
        setChecked(accountData.countInAllAccounts);
        setPrevIndex(index);
    }

    const saveData = () => {
        const name = nameRef.current?.value;
        const countInAllAccounts = checkboxRef.current?.checked;

        if (!name) {
            return;
        }

        if (index === undefined) {
            accounts.add({ name, countInAllAccounts });
        } else {
            accounts.edit(index, { name, countInAllAccounts });
        }
    }

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
            <div className={className('button')}>Удалить счёт</div>
        </div>
    );

    return (
        <Popup
            popupName={Popups.AccountEditor}
            className={className()}
            content={content}
            hasClosButton={true}
            title={headerText}
            hasButtonPanel={true}
            hasCancelbutton={true}
            onOkClick={saveData}
        />
    );
});

export const showAccauntEditor = (index?: number) => {
    popup.editPopupData(Popups.AccountEditor, { index: index });
    popup.showPopup(Popups.AccountEditor);
}