import React, { ReactElement, useMemo } from 'react';
import { observer } from "mobx-react-lite";
import { bem } from '../../utils/bem';
import { Close } from '../../font-awesome/Icons';
import './Popup.css';

interface PopupProps {
    popupPath: string;
    className?: string;
    content: ReactElement;
    hasCloseButton?: boolean;
    title?: string;
    hasButtonPanel?: boolean;
    onOkClick?: () => void;
    hasCancelbutton?: boolean;
    onCloseClick?: () => void;
}

export const Popup = observer((props: PopupProps) => {
    const className = useMemo(() => bem('popup'), []);
    const { onCloseClick, onOkClick } = props;

    const closeButton = useMemo(() => props.hasCloseButton ? <div className={className('close-button')} onClick={onCloseClick}><Close /></div> : null, [className, onCloseClick, props.hasCloseButton]);

    const title = useMemo(() => props.title ? <div className={className('title')}>{props.title}</div> : null, [className, props.title]);

    const buttonPanel = useMemo(() => props.hasButtonPanel ? (
        <div className={className('button-panel')}>
            {props.hasCancelbutton ? <div className={className('button')} onClick={onCloseClick}>Отмена</div> : null}
            <div className={className('button')} onClick={onOkClick}>Готово</div>
        </div>
    ) : null, [className, onCloseClick, onOkClick, props.hasButtonPanel, props.hasCancelbutton]);

    return (
        <div className={className('wrapper')}>
            <div className={props.className + ' ' + className()}>
                {closeButton}
                {title}
                <div className={className('content')}>{props.content}</div>
                {buttonPanel}
            </div>
        </div>
    );
});
