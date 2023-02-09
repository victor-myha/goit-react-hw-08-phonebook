import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../../redux/thunks'
import { Card, CardHeader } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'

const CustomCard = ({ contact, setOpenEditModal, setSelectedContact }) => {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = contact => {
    setSelectedContact(contact)
    setOpenEditModal(true)
  }

  const handleDelete = id => {
    dispatch(deleteContact(id))
  }

  return (
    <Card key={contact.id} sx={{ width: 600, height: 80, marginTop: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label='recipe'>
            {contact.name[0]}
          </Avatar>
        }
        action={
          <IconButton
            onClick={handleClick}
            aria-label={'settings'}
            aria-controls={open ? 'contact-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVert />
          </IconButton>
        }
        title={contact.name}
        subheader={contact.number}
      />
      <Menu
        anchorEl={anchorEl}
        id={contact.id}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleEdit(contact)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(contact.id)}>Delete</MenuItem>
      </Menu>
    </Card>
  )
}

CustomCard.propTypes = {
  contact: PropTypes.object.isRequired,
  setOpenEditModal: PropTypes.func.isRequired,
  setSelectedContact: PropTypes.func.isRequired
}

export default CustomCard
