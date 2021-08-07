import { FC } from 'react';

import Header from '../header';


const Layout: FC = ({children}) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
