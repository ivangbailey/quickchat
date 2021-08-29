import React, {useState} from 'react';
import {
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff,
  ArrowForward
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles({
  form: {
    width: '50%',
    margin: 'auto',
    background: 'rgba(255, 255, 255, .3)',
  },
  div: {
    display: 'block',
    width: '100%'
  }
});

export default function Login () {
  const classes = useStyles();
  const [credentials, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...credentials, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...credentials, showPassword: !credentials.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submit = () => {
    console.log(credentials);
    axios.post('/login', {
      credentials
    }).then(response => {
      console.log(response);
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.div}>
        <FormControl>
          <TextField
            value={credentials.email}
            onChange={handleChange('email')}
            label="email"
            variant="filled"
            />
        </FormControl>
      </div>

      <div className={classes.div}>
        <FormControl>
          <TextField
            type={credentials.showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={handleChange('password')}
            label="password"
            variant="filled"
            InputProps={{
              variant: 'filled',
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {credentials.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          </FormControl>
        </div>

        <div className={classes.div}>
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ArrowForward />}
              onClick={submit}
              >
              Sign in
            </Button>
          </FormControl>
        </div>
    </form>
  );
};