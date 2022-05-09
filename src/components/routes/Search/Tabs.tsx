import styles from './Search.module.scss'

const Tabs = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.tabBtn}>
        <button className={styles.searchTab} type="button">영화 검색</button>
        <button className={styles.bookmarkTab} type="button">즐겨찾기</button>
      </div>
    </nav>
  )
}

export default Tabs