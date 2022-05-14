import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import cx from 'classnames'

import styles from './modal.module.scss'

import { BookMarkListAtom, ClickedBookMarkDataAtom, ClickedMovieDataAtom, BookMarkIdListAtom } from '../../utils/atom'
import { IMovieData } from 'types/movie'

interface propsType {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  state: string
}

const BookMarkModal = ({ openModal, setOpenModal, state}: propsType) => {
  const clickedMovie: IMovieData = useRecoilValue(ClickedMovieDataAtom)
  const clickedBookmark: IMovieData = useRecoilValue(ClickedBookMarkDataAtom)
  const setBookmarkList = useSetRecoilState(BookMarkListAtom)
  const bookmarkIdList = useRecoilValue(BookMarkIdListAtom)

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [setOpenModal])

  const handleAddBookmarkClick = () => {
    if (bookmarkIdList?.indexOf(clickedMovie.imdbID) === -1) {
      setBookmarkList((prevState) => [clickedMovie, ...prevState])
    }
    handleCloseModal()
  }

  const handleDeleteBookmarkClick = useCallback(() => {
    setBookmarkList((prevState) => prevState.filter((ele) => ele.imdbID !== clickedBookmark.imdbID))
    handleCloseModal()
  }, [clickedBookmark.imdbID, handleCloseModal, setBookmarkList])

  return (
    <>
      <div className={cx(styles.modalBackground, { [styles.unShow]: !openModal })} onClick={handleCloseModal} aria-hidden />
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
              onClick={state === 'forBookmark' ? handleAddBookmarkClick : handleDeleteBookmarkClick}
            >
              {state === 'forBookmark' ? '즐겨찾기' : `즐겨찾기 제거`}
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

export default React.memo(BookMarkModal)
