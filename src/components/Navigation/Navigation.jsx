import { Link } from 'react-router-dom';
import UserMenu from './UserMenu/UserMenu';
import '../../common/commonStyles.scss';
import styles from './Navigation.module.scss';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const token = useSelector((state) => state.userSlice.user?.token);

  return (<div className={styles.navigation}>
    <div className={styles.logoText}>
      Contacts Book
    </div>
    <div className='d-flex'>
      <div className={styles.menuLinks}>
        {!token && (
          <>
            <div className={styles.linkItem}>
              <Link to='/login'>Login</Link>
            </div>
            <div className={styles.linkItem}>
              <Link to='/register'>Register</Link>
            </div>
          </>
        )}

      </div>
      {
        token && <UserMenu />
      }
    </div>
  </div>);
};

export default Navigation;
