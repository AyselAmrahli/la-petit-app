import React, { FC, ReactNode, ReactNodeArray } from 'react';

import './index.scss';

interface IProps {
    children: ReactNode | ReactNodeArray;
}

const Breadcrumb: FC<IProps> = ({ children }) => {
    return (
        <nav aria-label="breadcrumb">
            <ul className="g-breadcrumb">{children}</ul>
        </nav>
    );
};

export default React.memo(Breadcrumb);