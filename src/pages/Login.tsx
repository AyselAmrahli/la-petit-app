import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Breadcrumb from '../components/breadcrumb';
import BreadcrumbItem from '../components/breadcrumb/BreadcrumbItem';
import { userToken } from '../shared/utils/token';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const breadcrumbsData = [
  {
    to: '/',
    active: false,
    title: 'Home'
  },
  {
    to: '/login',
    active: true,
    title: 'Sign In'
  }
]


const Login: FC = () => {
  const classes = useStyles();
  const history = useHistory();


  // fake log in :DDD
  const loginHandler = () => {
    userToken.set('jwt_token_example83hbfhvdswiruwrfw');
    window.location.href = "/transactions";

  }


  const breadcrumbs = breadcrumbsData.map(({to,active,title}, i) => {
    return (
      <BreadcrumbItem {...{to,active}} key={i}>
        {title}
      </BreadcrumbItem>
    )
  })

  return (
    <>
      <Breadcrumb>{breadcrumbs}</Breadcrumb>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              className={classes.submit}
              onClick={loginHandler}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
