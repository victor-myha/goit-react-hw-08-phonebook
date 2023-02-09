import React, { useEffect, useState } from 'react';
import AddContactForm from './AddContactForm/AddContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/thunks';
import CustomCard from './CustomCard/CustomCard';
import EditContactModal from './EditContactModal/EditContactModal';
import styles from './Contacts.module.scss';

const Contacts = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={styles.contactsPage}>
      <div className={styles.contactsList}>
        {contacts.length > 0 && contacts.map(contact => <CustomCard
          key={contact.id}
          contact={contact}
          setSelectedContact={setSelectedContact}
          setOpenEditModal={setOpenEditModal}
        />)
        }
      </div>
      <AddContactForm />

      <EditContactModal
        selectedContact={selectedContact}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </div>
  );
};

export default Contacts;
