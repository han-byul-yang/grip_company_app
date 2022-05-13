import { useCallback, useEffect, useMemo, useState } from 'hooks'
import { Suspense, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cx from 'classnames'

import styles from "./Search.module.scss"
import { MovieApi } from "components/services/MovieApi"
import { IMovieData } from "components/types/movie"

import BookMarkModal from "../Modal/BookMarkModal"
import Header from "./Header"
import Tabs from "./Tabs"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { BookMarkListAtom, ClickedMovieDataAtom } from 'components/atom'
import Loading from 'components/Loading'

const Search = () => {
  const [apiData, setApiData] = useState<IMovieData[]>([])
  const [searchTitle, setSearchTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [noMovie, setNoMovie] = useState(true)
  const [bookmarkIdList, setBookmarkIdList] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const setClickedMovie = useSetRecoilState(ClickedMovieDataAtom)
  const bookmarkedMovies = useRecoilValue(BookMarkListAtom)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => 
  {
    MovieApi({
      s: searchTitle,
      page
    }).then((res) => {
      if (res.data.Response === 'False') {
        setNoMovie(true)
      } else {
        setApiData((prevState) => [...prevState,...res.data.Search])
        setNoMovie(false)
      }
      }).catch((error) => {
        console.log(error.message)
    })
  }
  , [page, searchTitle])

  const callWithTitleApi = useCallback( async () => {
    setPage(1)
    await MovieApi({
      s: searchTitle,
      page
    }).then((res) => {
      if (res.data.Response === 'False') {
        setNoMovie(true)
      } else {
        setApiData(res.data.Search)
        setNoMovie(false)
      }
      }).catch((error) => {
        console.log(error.message)
    })
  },[searchTitle])

  /* if (!apiData) return null */

  useEffect(() => {
    setBookmarkIdList([])
    bookmarkedMovies.forEach((bookmark) => apiData.forEach((api) => JSON.stringify(api) === JSON.stringify(bookmark) && setBookmarkIdList((prevState) => [...prevState, bookmark.imdbID])))
  },[apiData, bookmarkedMovies])

  const handleMovieClick = (movie : IMovieData) => {
    setOpenModal(true)
    setClickedMovie(movie)
  }

  const testFetch = () =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((res) => setTimeout(res, 4000))

  useEffect(() => {
    let observer: any
    if (target) {
      observer = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting) return
        setisLoading(true)
        await testFetch()
        observer.unobserve(entry.target)
        console.log(page)
        setPage(prevState => prevState + 1)
        console.log('api done')
        setisLoading(false)
        observer.observe(target)
      }, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [page, target])

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Header setSearchTitle={setSearchTitle} callWithTitleApi={callWithTitleApi} setApiData={setApiData} />
        <section className={styles.section}>
          {
          noMovie ?
            <p>검색 결과가 없습니다</p> :
            <Suspense fallback={<Loading />}>
              <ul className={styles.resultList}>
                {apiData?.map((movie) => 
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li key={movie.imdbID} className={styles.eachResult} onClick={() => handleMovieClick(movie)}>
                    <img src={movie.Poster} alt='movie poster'/>
                    <div className={styles.contents}>
                      <div className={styles.title}>{movie.Title}</div>
                      <span className={styles.type}>{movie.Type}</span> |
                      <span className={styles.year}>{movie.Year}</span>
                      <div className={cx(styles.icon, {[styles.heart] : bookmarkIdList.indexOf(movie.imdbID) !== -1})}><FontAwesomeIcon icon={faHeart} /></div>
                    </div>
                  </li>)}
                <div className="lastMovie" ref={setTarget}>{isLoading ? <div className={styles.loading}>Loading</div> : ''}</div>
              </ul> 
            </Suspense>
          }
        </section>
        <Tabs />
        <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forBookmark' />
      </Suspense>
    </div>
  )
}

export default Search

// title recoil에 저장해서 탭 이동 후 검색 결과 유지되게 해주기
// api error 제대로 처리해주기
// api 계속 불러오는 거 처리해줘야함 
// 이미지나 title 을 불러오지 못할 때 처리(대신 이미지도)
// 재로딩이 계속 되니까 title을 recoil로 처리 해줘야 하나
// 이 컴포넌트에 head랑 footer태그를 같이 넣어줘야 할까
// suspense 로 로딩 넣기(로딩 css 만들어주기)
// 검색 결과 몇 건 삭제하거나 기능구현
// lazy를 사용해줄 수 있을 것 
// input으로 검색어 바꾸면 apiData 리스트도 삭제
// api불러올 때 마다 list에 데이터를 추가해주면 다른 검색어 일 때 결과 데이터가 붙어서 나옴
// 즐겨찾기 중복 알림

  //  const handleWindowScroll = () => {
  //   setScrollLocation(window.scrollY)
  //   console.log(window.innerHeight)
  //   console.log(window.scrollY)
  //   console.log(document.body.scrollHeight)
  //   if (window.scrollY === window.innerHeight) {
  //     setPage((preState) => preState + 1)
  //     setApiData((prevState) => [...prevState, ...apiData])
  //   } 
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleWindowScroll)
  //   return (() => {
  //     window.removeEventListener('scroll', handleWindowScroll)
  //   })
  // }, [scrollLocation])
  //

// import React, { lazy } from 'react';

// const AvatarComponent = lazy(() => import('./AvatarComponent'));

// const DetailsComponent = () => (
//   <div>
//     <AvatarComponent />
//   </div>
// )


  // const lastMovieEle = document.querySelectorAll('.lastMovie')

  // const observer = new IntersectionObserver( async entries => {
  //   const lastMovie = entries[0]
  //   if (!lastMovie.isIntersecting) return
  //   observer.unobserve(lastMovie.target)
  //   await setPage((prevState) => prevState + 1)
  //   await callMovieApi(page)
  //   observer.observe(lastMovie.target)
  // },{
  //   threshold: 1
  // })

  // observer.observe(lastMovieEle[0])
