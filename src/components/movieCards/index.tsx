import {useSetRecoilState} from 'recoil'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cx from 'classnames'

import styles from './movieCards.module.scss'
import {ClickedMovieDataAtom, ClickedBookMarkDataAtom} from '../../utils/atom' 
import { IMovieData } from 'types/movie'
import React, { Dispatch, SetStateAction } from 'react'

import noImg from '../../img/not-available.png'

interface CardsProps {
  movie: IMovieData
  setOpenModal: Dispatch<SetStateAction<boolean>>
  state: string
  bookmarkIdList?: string[] | undefined
  handleDrag?: any
}

const MovieCards = ({handleDrag, movie, setOpenModal, state, bookmarkIdList} :CardsProps) => {
  const setClickedMovie = useSetRecoilState(ClickedMovieDataAtom)
  const setClickedBookmark = useSetRecoilState(ClickedBookMarkDataAtom)

  const {Poster, Title, Type, Year, imdbID} = movie

  const handleMovieClick = (data: IMovieData) => {
    setOpenModal(true)
    if (state === 'search') setClickedMovie(data)
    else setClickedBookmark(data)
  }

  return (
    <li className={styles.eachResult} ref={handleDrag?.innerRef} {...handleDrag?.draggableProps} {...handleDrag?.dragHandleProps} onClick={() => handleMovieClick(movie)} aria-hidden>
      <img src={Poster === 'N/A' ? `${noImg}` : Poster} className={styles.poster} alt='movie poster'/>
      <div className={styles.contents}>
        <div className={styles.title}>{Title}</div>
        <span className={styles.type}>{Type}</span> |
        <span className={styles.year}>{Year}</span>
        {
        state === 'search' && 
        <div className={cx(styles.icon, {[styles.heart] : bookmarkIdList?.indexOf(imdbID) !== -1})}><FontAwesomeIcon icon={faHeart} /></div>
        }
      </div>
    </li>
  )
}

export default React.memo(MovieCards)
