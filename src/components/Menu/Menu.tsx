import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bem } from '../../utils/bem';
import './Menu.css';
import { Link } from 'react-router-dom';

export const Menu = () => {
    const className = bem('menu');

    const defaultState = useMemo(() => ({
        cashflow: className('button'),
        planning: className('button'),
        accounts: className('button')
    }), []);

    const [classNames, setClassNames] = useState(defaultState);
    
    const onClick = useCallback((name: keyof typeof defaultState) => {
        setClassNames({
            ...defaultState,
            [name]: className('button', {active: ''})
        });
    }, []);

    useEffect(() => {
        const path = window.location.pathname.split('/')[1];
        setClassNames({
            ...defaultState,
            [path]: className('button', {active: ''})
        });
    }, []);

    return (        
        <div className={className()}>
            <Link to='/cashflow' className={classNames.cashflow} onClick={() => onClick('cashflow')}>Кешфлоу</Link>
            <Link to='/planning' className={classNames.planning} onClick={() => onClick('planning')}>Планирование</Link>
            <Link to='/accounts' className={classNames.accounts} onClick={() => onClick('accounts')}>Счета</Link>
        </div>
    );
};
