import { MovieApi } from "components/services/MovieApi"
import { ISearchData } from "components/types/movie"
import { useMount, useState } from 'hooks'
import Header from "./Header"
import styles from "./Search.module.scss"

const Search = () => {
  const [apiData, setApiData] = useState<ISearchData>()

  useMount(() => {
    MovieApi({
      s: '',
      page: 1
    }).then((res) => {
      setApiData(res.data)
    }).catch((error) => {
      console.log(error) 
    })
  })

  if (!apiData) return null

  return (
    <>
      <Header /> {/* //recoil 사용? */}
      <p className={styles.result}>검색 결과 10건</p>
      <footer className={styles.footer}>
        <div className={styles.tabBtn}>
          <button className={styles.searchTab} type="button">영화 검색</button>
          <button className={styles.bookmarkTab} type="button">즐겨찾기</button>
        </div>
      </footer>
    </>
  )
}

export default Search