import { NavLink } from 'react-router-dom'
import styles from './tabs.module.scss'

const Tabs = () => {
  return (
    <div className={styles.tabBtn}>
      <NavLink to="/">
        {({isActive}) => <button className={isActive ? styles.searchActive : styles.searchNonActive} type="button">영화 검색</button>}
      </NavLink>
      <NavLink to="/bookmark">
        {({isActive}) => <button className={isActive ? styles.bookmarkActive : styles.bookmarkNonActive} type="button">즐겨찾기</button>}
      </NavLink>
    </div>
  )
}

export default Tabs

// navLink 쓸 수 있음 *