import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { BookMarkDataAtom, ClickedBookMarkDataAtom, ClickedMovieDataAtom } from '../../atom'
import { IMovieData } from 'components/types/movie'
import styles from './Modal.module.scss'

interface propsType {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  state: string
}

const BookMarkModal = ({ openModal, setOpenModal, state }: propsType) => {
  const clickedMovie: IMovieData = useRecoilValue(ClickedMovieDataAtom)
  const clickedBookmark: IMovieData = useRecoilValue(ClickedBookMarkDataAtom)
  const setBookmarkMovie = useSetRecoilState(BookMarkDataAtom)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleBookmarkClick = () => {
    setBookmarkMovie((prevState) => (prevState[0].Title === '' ? [clickedMovie] : [clickedMovie, ...prevState]))
    setOpenModal(false)
  }

  const handleDeleteBookmarkClick = () => {
    setBookmarkMovie((prevState) => prevState.filter((ele) => ele.Title !== clickedBookmark.Title))
    setOpenModal(false)
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={cx(styles.modalBackground, { [styles.unShow]: !openModal })} onClick={handleCloseModal} />
      <div className={cx(styles.modalBox, { [styles.show]: openModal })}>
        <div className={styles.modal}>
          <div className={styles.head}>{state === 'forBookmark' ? 'BOOKMARK' : 'DELETE'}</div>
          <p className={styles.askMessage}>
            {state === 'forBookmark'
              ? '선택한 영화를 즐겨찾기 하시겠습니까?'
              : '선택한 영화를 즐겨찾기 목록에서 제거하시겠습니까?'}
          </p>
          <div className={styles.buttonBox}>
            <button
              className={cx(styles.bookmarkBtn, { [styles.unShow]: !openModal })}
              type='button'
              onClick={state === 'forBookmark' ? handleBookmarkClick : handleDeleteBookmarkClick}
            >
              {state === 'forBookmark' ? '즐겨찾기' : '즐겨찾기 제거'}
            </button>
            <button
              className={cx(styles.cancelBtn, { [styles.unShow]: !openModal })}
              type='button'
              onClick={handleCloseModal}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookMarkModal

// 파일 import 순서 정렬
// setBookmarkMovie 빈배열 들어가는 문제 해결
