import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cx from 'classnames'

import styles from './movieCards.module.scss'
import {ClickedMovieDataAtom, ClickedBookMarkDataAtom, BookMarkIdListAtom, BookMarkListAtom} from '../../utils/atom' 
import { IMovieData } from 'types/movie'
import noImg from '../../img/not-available.png'


interface CardsProps {
  movie: IMovieData
  setOpenModal: Dispatch<SetStateAction<boolean>>
  state: string
  handleDrag?: any
  apiMovieData?: IMovieData[] | undefined
}

const MovieCards = ({handleDrag, movie, setOpenModal, state, apiMovieData} :CardsProps) => {
  const setClickedMovie = useSetRecoilState(ClickedMovieDataAtom)
  const setClickedBookmark = useSetRecoilState(ClickedBookMarkDataAtom)
  const [bookmarkIdList, setBookmarkIdList] = useRecoilState(BookMarkIdListAtom)
  const bookmarkedMovies = useRecoilValue(BookMarkListAtom)

  const {Poster, Title, Type, Year, imdbID} = movie

  useEffect(() => {
    if (state === 'search'){
      bookmarkedMovies.forEach((bookmark) => 
      apiMovieData?.forEach((api) => 
      JSON.stringify(api) === JSON.stringify(bookmark) && setBookmarkIdList((prevState) => [...prevState, bookmark.imdbID])))
    } else {
      setBookmarkIdList(bookmarkedMovies.map((ele) => ele.imdbID))
    }
  },[apiMovieData, bookmarkedMovies, setBookmarkIdList, state])

  const handleMovieClick = (data: IMovieData) => {
    setOpenModal(true)
    if (state === 'search') setClickedMovie(data)
    else setClickedBookmark(data)
  }

  return (
    <li
      className={styles.eachResult}
      ref={handleDrag?.innerRef}
      {...handleDrag?.draggableProps}
      {...handleDrag?.dragHandleProps}
      onClick={() => handleMovieClick(movie)}
      aria-hidden
    >
      <img src={Poster === 'N/A' ? `${process.env.PUBLIC_URL}${noImg}` : Poster} className={styles.poster} alt='movie poster' />
      <div className={styles.contents}>
        <div className={styles.title}>{Title}</div>
        <span className={styles.type}>{Type}</span> |<span className={styles.year}>{Year}</span>
        <div className={cx(styles.icon, { [styles.heart]: bookmarkIdList?.indexOf(imdbID) !== -1 })}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </li>
  )
}

export default React.memo(MovieCards)
