import { Link } from 'react-router-dom'
import styles from './Tabs.module.scss'

const Tabs = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.tabBtn}>
        <Link to="/">
          <button className={styles.searchTab} type="button">영화 검색</button>
        </Link>
        <Link to="/bookmark">
          <button className={styles.bookmarkTab} type="button">즐겨찾기</button>
        </Link>
      </div>
    </nav>
  )
}

export default Tabs

// navLink 쓸 수 있음 