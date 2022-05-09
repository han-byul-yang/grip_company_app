import { MovieApi } from "components/services/MovieApi"
import { ISearchData } from "components/types/movie"
import { useCallback, useEffect, useState } from 'hooks'
import Header from "./Header"
import styles from "./Search.module.scss"
import Tabs from "./Tabs"

const Search = () => {
  const [apiData, setApiData] = useState<ISearchData>()
  const [searchTitle, setSearchTitle] = useState('love')

  useEffect(() => {
      MovieApi({
        s: searchTitle,
        page: 1
      }).then((res) => {
          setApiData(res.data)
          console.log(res.data)
        }).catch((error) => {
        console.log(error.message)
      })
  }, [searchTitle])
 
  if (!apiData) return null

  return (
    <>
      <Header setSearchTitle={setSearchTitle} /> {/* //recoil 사용? */}
      <p className={styles.result}>검색 결과 {apiData.totalResults} 개</p>
      <section className={styles.section}>
        <ul className={styles.resultList}>
          {apiData.Search.map((movie) => 
            <li className={styles.eachResult}>
              <img src={movie.Poster} alt='movie poster'/>
              <div className={styles.contents}>
                <div className={styles.title}>{movie.Title}</div>
                <span className={styles.type}>{movie.Type}</span> |
                <span className={styles.year}>{movie.Year}</span>
              </div>
            </li>)}
        </ul>
      </section>
      <Tabs />
    </>
  )
}

export default Search

// api error 제대로 처리해주기
// api 계속 불러오는 거 처리해줘야함 
// 이미지나 title 을 불러오지 못할 때 처리