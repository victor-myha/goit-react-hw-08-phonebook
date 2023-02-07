import { Card, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { MoreVert } from '@mui/icons-material';
import styles from './Contacts.module.scss';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React, { useEffect, useState } from 'react';
import AddContactForm from './AddContactForm/AddContactForm';
import { useGetContactsQuery } from '../../redux/contactsApi';

const Contacts = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, isLoading, isError } = useGetContactsQuery();

  // TODO del it
  useEffect(() => {
    console.log('useGetContactsQuery', data);
  }, [data]);

  const contacts = [
    { id: 123, name: 'Victor', number: '+380689223411' },
    { id: 234, name: 'Nastia', number: '+380689223422' },
    { id: 345, name: 'Dimon', number: '+380689223433' },

  ];

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.contactsPage}>
      <div className={styles.contactsList}>
        {
          contacts.map(contact => (
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
                id='contact-menu'
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
                      mr: 1,
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
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  Delete
                </MenuItem>
              </Menu>
            </Card>
          ))
        }
      </div>
      <AddContactForm />
    </div>
  );
};

export default Contacts;
