import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Button, Snackbar, TextField } from '@mui/material';
import { useFormik } from 'formik';
import '../../../common/commonStyles.scss';
import styles from './AddContact.module.scss';

const validationSchema = yup.object({
  name: yup
    .string('Enter contact email')
    .required('Name is required'),
  number: yup
    .number('Enter contact number')
    .required('Number is required'),
});

const AddContactForm = () => {
  const { error } = useSelector((state) => state.userSlice);
  useSelector((state) => state.userSlice.user?.token);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
    },
  });

  return (
    <div>

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
            type='number'
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
      {
        <Snackbar
          open={error}
          autoHideDuration={6000}
          message='Error'
        />
      }
    </div>
  );
};

export default AddContactForm;
