import ReactDom from 'react-dom'

interface ModalChildrenType {
  children: React.ReactNode
}

const ModalPortal = ({ children } : ModalChildrenType) => {
  const ele = document.getElementById('modal')!
  return ReactDom.createPortal(children, ele)
}

export default ModalPortal
