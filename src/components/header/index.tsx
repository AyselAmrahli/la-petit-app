import { FC, useState } from 'react';


import { Button, Container, Grid } from '@material-ui/core';
import Logo from './logo';

import './index.scss';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { userToken } from '../../shared/utils/token';


const Header: FC = () => {
    const history = useHistory();
    const [isLogin, setIslogin] = useState<boolean>(false);

    // fake log out :DDD
    const logoutHandler = () => {
        userToken.remove();
        window.location.href = "/";
    }

  return (
      <header id="g-header">
          <Container component="main" maxWidth="lg">

          <Grid container>
            <Grid item xs={3}>
                <Logo />
            </Grid>
            <Grid item xs={9}>
                <div className="float-right">
                    
                   {userToken.isAuthenticated() ? 
                        <>
                            <Link className="g-auth_btn" to="/transactions">
                                Transactions
                            </Link>
                            <Link className="g-auth_btn" to="/cards">
                                Cards
                            </Link>
                            <Button
                                variant="contained"
                                onClick={logoutHandler}
                                color="primary"
                            >
                                Log Out
                            </Button> 

                        </>  
                        :
                        <NavLink to="/login" className="g-auth_btn">Sign In</NavLink>} 
                </div>
            </Grid>
          </Grid>
          </Container>
      </header>
 )
};

export default Header;
