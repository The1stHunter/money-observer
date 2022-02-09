import React, { CSSProperties, ReactElement } from 'react';
import { observer } from "mobx-react-lite";
import { AccountEditor } from '../AccountEditor/AccountEditor';
import { Popups } from '../../store/Popup';
import popup from '../../store/Popup';
import { bem } from '../../utils/bem';
import { Close } from '../../font-awesome/Icons';
import './Popup.css';

export const AllPopups = observer(() => {

    return (
        <AccountEditor />
    );
});

interface PopupProps {
    popupName: Popups;
    className: string;
    content: ReactElement;
    hasClosButton?: boolean;
    title?: string;
    hasButtonPanel?: boolean;
    onOkClick?: () => void;
    hasCancelbutton?: boolean;
}

export const Popup = observer((props: PopupProps) => {
    const className = bem('popup');
    const style: CSSProperties = {
        visibility: popup.popups[props.popupName].isVisible ? 'visible' : 'hidden'
    };

    const closePopup = () => {
        popup.hidePopup(props.popupName);
    }
    const closeButton = props.hasClosButton ? <div className={className('close-button')} onClick={closePopup}><Close /></div> : null;
    const title = props.title ? <div className={className('title')}>{props.title}</div> : null;
    const buttonPanel = props.hasButtonPanel ? (
        <div className={className('button-panel')}>
            {props.hasCancelbutton ? <div className={className('button')} onClick={closePopup}>Отмена</div> : null}
            <div className={className('button')} onClick={() => {props.onOkClick?.(); closePopup()}}>Готово</div>
        </div>
    ) : null;

    return (
        <div className={className('wrapper')} style={style}>
            <div className={props.className + ' ' + className()}>
                {closeButton}
                {title}
                <div className={className('content')}>{props.content}</div>
                {buttonPanel}
            </div>
        </div>
    );
});
