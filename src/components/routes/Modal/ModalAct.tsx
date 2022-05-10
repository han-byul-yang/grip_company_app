import { useState } from 'react'
import Modal from './Modal'

const ModalAct = () => {
  const [onModal, setOnModal] = useState(false)

  const handleModal = () => setOnModal((preState) => !preState)

  return (
      onModal && <Modal onModalClick={handleModal} />
  )
}

export default ModalAct