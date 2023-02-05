import PropTypes from 'prop-types';

const Contacts = ({ uId }) => {
  return <div>Contacts Uid: {uId}</div>;
};

Contacts.propTypes = {
  uId: PropTypes.string.isRequired,
};

export default Contacts;
