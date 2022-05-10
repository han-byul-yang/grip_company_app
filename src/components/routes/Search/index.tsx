import { MovieApi } from "components/services/MovieApi"
import { IMovieData } from "components/types/movie"
import { useCallback, useEffect, useState } from 'hooks'
import BookMarkModal from "../Modal/BookMarkModal"
import ModalAct from "../Modal/ModalAct"
import Header from "./Header"
import styles from "./Search.module.scss"
import Tabs from "./Tabs"

const Search = () => {
  const [apiData, setApiData] = useState<IMovieData[]>([])
  const [searchTitle, setSearchTitle] = useState('')
  const [scrollLocation, setScrollLocation] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
      MovieApi({
        s: searchTitle,
        page
      }).then((res) => {
          setApiData(res.data.Search)
        }).catch((error) => {
        console.log(error.message)
      })
  }, [searchTitle, page])
 
  /* if (!apiData) return null */

  /* const handleWindowScroll = () => {
    setScrollLocation(window.scrollY)
    console.log(window.innerHeight)
    console.log(window.scrollY)
    console.log(document.body.scrollHeight)
    if (window.scrollY === window.innerHeight) {
      setPage((preState) => preState + 1)
      setApiData((prevState) => [...prevState, ...apiData])
    } 
  }

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll)
    return (() => {
      window.removeEventListener('scroll', handleWindowScroll)
    })
  }, [scrollLocation])
  */

  const handleModalClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      <Header setSearchTitle={setSearchTitle} /> {/* //recoil 사용? */}
      <p className={styles.result}>검색 결과 1 개</p>
      <section className={styles.section}>
        <ul className={styles.resultList}>
          {apiData?.map((movie) => 
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li className={styles.eachResult} onClick={handleModalClick}>
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
      <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}

export default Search

// api error 제대로 처리해주기
// api 계속 불러오는 거 처리해줘야함 
// 이미지나 title 을 불러오지 못할 때 처리
// 재로딩이 계속 되니까 title을 recoil로 처리 해줘야 하나