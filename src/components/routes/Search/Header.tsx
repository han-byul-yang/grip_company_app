import styles from './Search.module.scss'
import {useState} from 'hooks'

const Header = () => {
  const [searchTitle, setSearchTitle] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.currentTarget.value)
  } 

  return (
    <header className={styles.header}>
      <form className={styles.inputBox}>
        <input type="text" className={styles.input} placeholder="영화 제목을 입력하세요" value={searchTitle} onChange={handleTitleChange} />
        <button type="button" className={styles.inputBtn}>검색</button>
      </form>
    </header>

  )
}

export default Header