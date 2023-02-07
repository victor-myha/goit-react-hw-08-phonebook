import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { register } from '../../redux/thunks';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import styles from './Register.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../common/SnackbarAlert/SnackbarAlert';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const [submitClicked, setSubmitClicked] = useState(false);
  const { user: { token }, error } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
      setSubmitClicked(true);
    },
  });

  useEffect(() => {
    if (token && submitClicked) navigate('/contacts');
  }, [token, submitClicked, navigate]);

  return (
    <div>
      <div className={styles.formContainer}>
        <h1>Register</h1>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            Sign Up
          </Button>
        </form>
      </div>
      {
        error && <SnackbarAlert type={'error'} message={error} />
      }
    </div>
  );
};

export default Register;
