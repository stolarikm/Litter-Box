import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { signIn, signUp, useLoggedInUser } from '../firebase/firebase';
import { Grid } from '@material-ui/core';

const Login: FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }  

  return (
    <Grid container spacing={10} justify="center">
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant='h5' component='h1'>
              Sign in
            </Typography>
            <Typography variant='subtitle1'>Use your Account</Typography>
            <TextField
              label='Email'
              type='email'
              name='email'
              fullWidth
              autoComplete='email'
              margin='normal'
              variant='outlined'
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            <TextField
              label='Password'
              type='password'
              name='password'
              fullWidth
              margin='normal'
              variant='outlined'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant='subtitle2' align='left' color='error' paragraph>
                <b>{error}</b>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant='text'
              size='large'
              color='primary'
              onClick={async () => {
                try {
                  await signUp(user, password);
                } catch (err) {
                  setError(err.message);
                }
              }}
            >
              Create account
            </Button>
            <Button
              variant='text'
              size='large'
              color='primary'
              onClick={() =>
                signIn(user, password).catch(err => setError(err.message))
              }
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;