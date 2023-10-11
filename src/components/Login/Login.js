import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

//function for the useReducer argument--->
const emailReducer = (state, action) => {
  if (action.type === 'USER INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  } if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null },);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(emailState.value);
      setFormIsValid(
        emailValid && passwordValid
      );
    }, 400);
    return () => {
      clearTimeout(identifier);
    }
  }, [emailValid, passwordValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.invalid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER INPUT', val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length>6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input email="email"
          id="email"
          value={emailState.value}
          isValid={emailValid}
          emailChangeHandler={emailChangeHandler}
          validateEmailHandler={validateEmailHandler}
        />
         <Input email="password"
          id="password"
          value={passwordState.value}
          isValid={passwordValid}
          emailChangeHandler={passwordChangeHandler}
          validateEmailHandler={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
