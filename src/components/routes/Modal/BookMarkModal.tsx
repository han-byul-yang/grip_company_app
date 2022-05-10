import styles from "./Modal.module.scss"
import cx from 'classnames'
import { Dispatch, SetStateAction } from "react"

interface propsType {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const BookMarkModal = ({openModal, setOpenModal}: propsType) => {

  const handleCloseModal = () => {
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
            <button className={cx(styles.bookmarkBtn, {[styles.unShow] : !openModal})} type="button" onClick={handleCloseModal}>즐겨찾기</button>
            <button className={cx(styles.cancelBtn, {[styles.unShow] : !openModal})} type="button" onClick={handleCloseModal} >취소</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookMarkModal