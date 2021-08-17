import { lazy } from 'react';

const NotFoundPage = lazy(() => import('../pages/NotFound'));
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/Login'));
const TransactionsPage = lazy(() => import('../pages/Transactions'));
const CardsPage = lazy(() => import('../pages/Cards'));
const CardDetailPage = lazy(() => import('../pages/CardDetail'));
const TransactionDetailPage = lazy(() => import('../pages/TransactionDetail'));


// app main routes data
  export const ROUTES = [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
      isPrivate: false,
      exact: true
    },
    {name: 'Login',
      path: '/login',
      component: LoginPage,
      isPrivate: false,
      exact: true
    },
    {
      name: 'Transactions',
      path: '/transactions',
      component: TransactionsPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/transactions/:transactionId',
      component: TransactionDetailPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/transactions/:transactionId/cards/:cardId',
      component: CardDetailPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/cards',
      component: CardsPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/cards/:cardId',
      component: CardDetailPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/cards/:cardId/transactions/',
      component: TransactionsPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '/cards/:cardId/transactions/:transactionId',
      component: TransactionDetailPage,
      isPrivate: true,
      exact: true
    },
    {
      path: '*',
      component: NotFoundPage,
      isPrivate: false,
      exact: false
    }
  ]
