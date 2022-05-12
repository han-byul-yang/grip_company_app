import { useCallback, useEffect, useState } from 'hooks'
import { Suspense, useRef } from 'react'

import styles from "./Search.module.scss"
import { MovieApi } from "components/services/MovieApi"
import { IMovieData } from "components/types/movie"

import BookMarkModal from "../Modal/BookMarkModal"
import Header from "./Header"
import Tabs from "./Tabs"
import { useSetRecoilState } from 'recoil'
import { ClickedMovieDataAtom } from 'components/atom'
import Loading from 'components/Loading'

const Search = () => {
  const [apiData, setApiData] = useState<IMovieData[]>([])
  const [searchTitle, setSearchTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)
  const setClickedMovie = useSetRecoilState(ClickedMovieDataAtom)
  const [noMovie, setNoMovie] = useState(true)
  const target = useRef<HTMLDivElement>(null)

  const callMovieApi = useCallback( async (newPage : number) => {
    await MovieApi({
      s: searchTitle,
      page: newPage
    }).then((res) => {
      console.log('api')
      if (res.data.Response === 'False') {
        setNoMovie(true)
      } else {
      setApiData((prevState) => [...res.data.Search])
      setNoMovie(false)
      }
      }).catch((error) => {
      console.log(error.message)
    })
  },[searchTitle])

  useEffect(() => {
    callMovieApi(1)
  }, [callMovieApi, searchTitle])

  /* if (!apiData) return null */

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

  const handleMovieClick = (movie : IMovieData) => {
    setOpenModal(true)
    setClickedMovie(movie)
  }

  const loading = () => <div className={styles.loading}>loading</div>

  return (
    <div className={styles.defaultStyle}>
      <Suspense fallback={loading()}>
        <Header setSearchTitle={setSearchTitle} />
        <section className={styles.section}>
          {
          noMovie ?
            <div>검색 결과가 없습니다</div> :
            <Suspense fallback={loading()}>
              <ul className={styles.resultList}>
                {apiData?.map((movie) => 
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li key={movie.imdbID} className={styles.eachResult} onClick={() => handleMovieClick(movie)}>
                    <img src={movie.Poster} alt='movie poster'/>
                    <div className={styles.contents}>
                      <div className={styles.title}>{movie.Title}</div>
                      <span className={styles.type}>{movie.Type}</span> |
                      <span className={styles.year}>{movie.Year}</span>
                    </div>
                  </li>)}
              </ul> 
              <div className="lastMovie" ref={target}>loading...</div>
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

