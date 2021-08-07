import React, { Suspense } from 'react';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from '../components/privateRoute';

import Spinner from '../components/spinner';
import { EColor } from '../shared/consts/enum';
import { ROUTES } from './const';


/**
 * GuavaPay task - application routes
 */

console.log()
export const appRoutes: JSX.Element = 
    <Suspense fallback={<Spinner color={EColor.DANGER} />}>

        <Switch>

            {
                ROUTES.map(({isPrivate,exact,path,component}, index) => {
                    if(!isPrivate) return <Route exact={exact} path={path} component={component} key={index} />

                    return <PrivateRoute exact={exact} path={path} component={component} key={index} />
                })
            }

            

        </Switch>

    </Suspense>;