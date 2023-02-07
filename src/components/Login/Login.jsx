import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { login } from '../../redux/thunks';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import '../../common/commonStyles.scss';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../common/SnackbarAlert/SnackbarAlert';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitClicked, setSubmitClicked] = useState(false);

  const { error } = useSelector((state) => state.userSlice);
  const token = useSelector((state) => state.userSlice.user?.token);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      setSubmitClicked(true);
    },
  });

  useEffect(() => {
    if (token && submitClicked) navigate('/react-homework-template/contacts');
  }, [token, submitClicked, navigate]);

  return (
    <div>

      <div className={styles.formContainer}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Login
          </Button>
        </form>
      </div>

      {
        error && <SnackbarAlert type={'error'} message={error} />
      }
    </div>
  );
};

export default Login;
