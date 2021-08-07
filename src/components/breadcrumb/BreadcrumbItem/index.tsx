import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

export interface IProps {
    to?: string;
    children: string;
    active?: boolean;
    icon?: string;
}

const BreadcrumbItem: FC<IProps> = ({to = '/', active = false, icon = '/', children}) => {
    return !active ? (
        <li data-icon={icon} className="g-breadcrumb_item">
            <NavLink to={to}>{children}</NavLink>
        </li>
    ) : (
        <li data-icon={icon} className={`g-breadcrumb_item ${active ? 'active' : ''}`} aria-current="page">
            <span>{children}</span>
        </li>
    );
};

export default BreadcrumbItem;
