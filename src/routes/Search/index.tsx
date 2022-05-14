import { useEffect, useState } from 'hooks'
import { Suspense } from 'react'

import styles from "./search.module.scss"
import { MovieApi } from 'utils/movieApi'
import { IMovieData } from "types/movie"

import BookMarkModal from "../../components/Modal"
import Header from "../../components/Header"
import Tabs from "../../components/Tabs"
import { useRecoilValue, useRecoilState } from 'recoil'
import { BookMarkListAtom, BookMarkIdListAtom } from 'utils/atom'
import Loading from 'components/Loading/Loading'
import MovieCards from 'components/MovieCards'

const Search = () => {
  const [apiMovieData, setApiMovieData] = useState<IMovieData[]>([])
  const [totalResult, setTotalResult] = useState(0)
  const [searchTitle, setSearchTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [noMovie, setNoMovie] = useState(true)
  const [page, setPage] = useState(1)
  const bookmarkedMovies = useRecoilValue(BookMarkListAtom)
  const [bookmarkIdList, setBookmarkIdList] = useRecoilState(BookMarkIdListAtom)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    MovieApi({
      s: searchTitle,
      page
    }).then((res) => {
      if (res.data.Response === 'False') {
        setNoMovie(true)
      } else {
        setApiMovieData((prevState) => [...prevState,...res.data.Search])
        setTotalResult(parseInt(res.data.totalResults, 10))
        setNoMovie(false)
      }
      }).catch((error) => {
        return error.message
    })
  }, [page, searchTitle])

  useEffect(() => {
    bookmarkedMovies.forEach((bookmark) => 
    apiMovieData.forEach((api) => 
    JSON.stringify(api) === JSON.stringify(bookmark) && setBookmarkIdList((prevState) => [...prevState, bookmark.imdbID])))
  },[apiMovieData, bookmarkedMovies, setBookmarkIdList])

  const testFetch = () =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((res) => setTimeout(res, 3000))

  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting || totalResult < (page * 10)) return
        observer.unobserve(entry.target)
        setisLoading(true)
        await testFetch()
        setPage(prevState => prevState + 1) 
        setisLoading(false)
        observer.observe(target)
      }, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [page, target, totalResult])

  return (
    <div className={styles.defaultStyle}>
      <Suspense fallback={<Loading />}>
        <header className={styles.header}>
          <Header setSearchTitle={setSearchTitle} setPage={setPage} setApiMovieData={setApiMovieData} />
        </header>
        <section className={styles.section}>
          {
          noMovie ?
            <p>검색 결과가 없습니다</p> :
            <Suspense fallback={<Loading />}>
              <p className={styles.result}>{totalResult} 건의 검색 결과</p>
              <ul className={styles.resultList}>
                {
                apiMovieData.map((movie) => 
                  <MovieCards key={movie.imdbID} movie={movie} setOpenModal={setOpenModal} state='search' />
                  )}
              </ul> 
              {isLoading && <Loading />}
              <div className="lastMovie" ref={setTarget} />
            </Suspense>
          }
        </section>
        <nav className={styles.nav}>
          <Tabs />
        </nav>
        <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forBookmark' />
      </Suspense>
    </div>
  )
}

export default Search
