import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/thunks'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import SnackbarAlert from '../../common/SnackbarAlert/SnackbarAlert'
import styles from './Register.module.scss'
import { generateValidationSchema } from '../../common/helpers'

const Register = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.userSlice)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: generateValidationSchema(['name', 'email', 'password']),
    onSubmit: values => {
      dispatch(register(values))
    }
  })

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
      {error && <SnackbarAlert type={'error'} message={error} />}
    </div>
  )
}

export default Register
