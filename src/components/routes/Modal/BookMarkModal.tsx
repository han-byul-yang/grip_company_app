import styles from "./Modal.module.scss"
import cx from 'classnames'
import { Dispatch, SetStateAction } from "react"
import { useRecoilState, useRecoilValue } from 'recoil'
import {BookMarkDataAtom, ClickedDataAtom} from '../../atom'
import { IMovieData } from "components/types/movie"

interface propsType {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const BookMarkModal = ({openModal, setOpenModal}: propsType) => {
  const ClickedMovie:IMovieData = useRecoilValue(ClickedDataAtom)
  const [bookmarkMovie, setBookmarkMovie] = useRecoilState(BookMarkDataAtom)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleBookmarkClick = () => {
    setBookmarkMovie((prevState) => prevState[0].Title === '' ? [ClickedMovie] : [ClickedMovie, ...prevState])
    setOpenModal(false)
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={cx(styles.modalBackground, {[styles.unShow] : !openModal})} onClick={handleCloseModal} />
      <div className={cx(styles.modalBox, {[styles.show] : openModal})}>
        <div className={styles.modal}>
          <div className={styles.head}>BOOKMARK</div>
          <p className={styles.askMessage}>선택한 영화를 즐겨찾기 하시겠습니까?</p>
          <div className={styles.buttonBox}>
            <button className={cx(styles.bookmarkBtn, {[styles.unShow] : !openModal})} type="button" onClick={handleBookmarkClick}>즐겨찾기</button>
            <button className={cx(styles.cancelBtn, {[styles.unShow] : !openModal})} type="button" onClick={handleCloseModal} >취소</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookMarkModal

// 파일 import 순서 정렬
// setBookmarkMovie 빈배열 들어가는 문제 해결