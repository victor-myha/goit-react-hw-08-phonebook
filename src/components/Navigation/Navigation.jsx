import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserMenu from './UserMenu/UserMenu';
import '../../common/commonStyles.scss';
import styles from './Navigation.module.scss';

const Navigation = ({ uId }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.logoText}>
        <Link to="/react-homework-template/">Contacts Book</Link>
      </div>
      <div className="d-flex">
        <div className={styles.menuLinks}>
          {uId && (
            <div className={styles.linkItem}>
              <Link to="/react-homework-template/contacts">Contacts</Link>
            </div>
          )}
          <div className={styles.linkItem}>
            <Link to="/react-homework-template/login">Login</Link>
          </div>
          <div className={styles.linkItem}>
            <Link to="/react-homework-template/register">Register</Link>
          </div>
        </div>
        <UserMenu />
      </div>
    </div>
  );
};

Navigation.propTypes = {
  uId: PropTypes.string.isRequired,
};

export default Navigation;
