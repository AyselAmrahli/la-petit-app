import { FC } from 'react';
import { Route } from 'react-router-dom';
import { userToken } from '../../shared/utils/token';

interface IProps {
    component: any;
    path?: string;
    exact?: boolean;
}

const PrivateRoute:FC<IProps> = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            userToken.isAuthenticated() ?
            <Component {...props} />
            : window.location.href = '/login'
        )} />
    );
};

export default PrivateRoute;