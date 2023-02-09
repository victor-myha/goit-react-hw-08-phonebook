import { useDispatch, useSelector } from 'react-redux'
import { Button, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { addContact } from '../../../redux/thunks'
import '../../../common/commonStyles.scss'
import styles from './AddContactForm.module.scss'
import { generateValidationSchema } from '../../../common/helpers'

const AddContactForm = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.userSlice)

  const formik = useFormik({
    initialValues: {
      name: '',
      number: ''
    },
    validationSchema: generateValidationSchema(['name', 'number']),
    onSubmit: (values, actions) => {
      dispatch(addContact(values))
      actions.resetForm({
        name: '',
        number: ''
      })
    }
  })

  return (
    <>
      <div className={styles.formContainer}>
        <h1 style={{ marginTop: 0 }}>Add Contact</h1>
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
            id='number'
            name='number'
            label='Number'
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Add Contact
          </Button>
        </form>
      </div>
      {<Snackbar open={error} autoHideDuration={6000} message='Error' />}
    </>
  )
}

export default AddContactForm
