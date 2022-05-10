import ModalPortal from './ModalPortal'
import styles from './Modal.module.scss'
import BookMarkModal from './BookMarkModal'

interface ModalType {
  onModalClick: () => void;
}

const Modal = ({ onModalClick }: ModalType) => {
  return (
    <ModalPortal>
      { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */ }
      <div className={styles.background}>
        <div className={styles.content}>
          <div aria-hidden onClick={onModalClick} />
        </div>
      </div>
    </ModalPortal>
  )
}

Modal.propTypes = {
  onModalClick: Function
}

export default Modal 

// div aria-hidden 고치기