import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { editContact } from '../../../redux/thunks'
import { generateValidationSchema } from '../../../common/helpers'
import PropTypes from 'prop-types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4
}

const EditContactModal = ({ openEditModal, setOpenEditModal, selectedContact }) => {
  const dispatch = useDispatch()

  const handleClose = () => setOpenEditModal(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      number: ''
    },
    validationSchema: generateValidationSchema(['name', 'number']),
    onSubmit: (values, actions) => {
      dispatch(editContact({ ...values, id: selectedContact?.id }))
      actions.resetForm({
        name: '',
        number: ''
      })
      setOpenEditModal(false)
    }
  })

  useEffect(() => {
    formik.setValues({
      name: selectedContact?.name || '',
      number: selectedContact?.number || ''
    })
  }, [selectedContact])

  return (
    <Modal
      open={openEditModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h2 style={{ textAlign: 'center' }}>Edit Contact</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            style={{ marginBottom: '12px' }}
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
            style={{ marginBottom: '12px' }}
          />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

EditContactModal.propTypes = {
  openEditModal: PropTypes.bool.isRequired,
  setOpenEditModal: PropTypes.func.isRequired,
  selectedContact: PropTypes.object
}
export default EditContactModal
