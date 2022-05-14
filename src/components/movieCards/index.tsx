import {useSetRecoilState} from 'recoil'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cx from 'classnames'

import styles from './MovieCards.module.scss'
import {ClickedMovieDataAtom, ClickedBookMarkDataAtom} from '../../utils/atom' 
import { IMovieData } from 'types/movie'

interface CardsProps {

}

const MovieCards = ({handleDrag, movie, setOpenModal, state, bookmarkIdList} :any) => {
  const setClickedMovie = useSetRecoilState(ClickedMovieDataAtom)
  const setClickedBookmark = useSetRecoilState(ClickedBookMarkDataAtom)

  const handleMovieClick = (data: IMovieData) => {
    setOpenModal(true)
    if (state === 'search') setClickedMovie(data)
    else setClickedBookmark(data)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li className={styles.eachResult} ref={handleDrag?.innerRef} {...handleDrag?.draggableProps} {...handleDrag?.dragHandleProps} onClick={() => handleMovieClick(movie)}>
      <img src={movie.Poster} alt='movie poster'/>
      <div className={styles.contents}>
        <div className={styles.title}>{movie.Title}</div>
        <span className={styles.type}>{movie.Type}</span> |
        <span className={styles.year}>{movie.Year}</span>
        {
        state === 'search' && 
        <div className={cx(styles.icon, {[styles.heart] : bookmarkIdList.indexOf(movie.imdbID) !== -1})}><FontAwesomeIcon icon={faHeart} /></div>
        }
      </div>
    </li>
  )
}

export default MovieCards

// props typescript