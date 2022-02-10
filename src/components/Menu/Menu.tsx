import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bem } from '../../utils/bem';
import './Menu.css';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes/routes';

export const Menu = () => {
    const className = useMemo(() => bem('menu'), []);

    const defaultState = useMemo(() => ({
        cashflow: className('button'),
        planning: className('button'),
        accounts: className('button')
    }), [className]);

    const [classNames, setClassNames] = useState(defaultState);
    
    const onClick = useCallback((name: keyof typeof defaultState) => {
        setClassNames({
            ...defaultState,
            [name]: className('button', {active: ''})
        });
    }, [className, defaultState]);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setClassNames({
            ...defaultState,
            [path]: className('button', {active: ''})
        });
    }, [className, defaultState, location.pathname]);

    return (        
        <div className={className()}>
            <Link to={`/${routes.cashflow}`} className={classNames.cashflow} onClick={() => onClick('cashflow')}>Кешфлоу</Link>
            <Link to={`/${routes.planning}`} className={classNames.planning} onClick={() => onClick('planning')}>Планирование</Link>
            <Link to={`/${routes.accounts}`} className={classNames.accounts} onClick={() => onClick('accounts')}>Счета</Link>
        </div>
    );
};
