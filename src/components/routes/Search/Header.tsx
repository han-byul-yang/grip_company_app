import styles from './Search.module.scss'
import {useState} from 'hooks'
import { useRecoilState } from 'recoil'
import { searchTitleAtom } from 'components/atom'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  setSearchTitle:  Dispatch<SetStateAction<string>>,
}

const Header = ({setSearchTitle} : Props) => {
  const [inputTitle, setInputTitle] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  } 

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTitle(inputTitle)
  }

  const handleTitleClick = () => {
    setSearchTitle(inputTitle)
  }

  return (
    <header className={styles.header}>
      <form className={styles.inputBox} onSubmit={handleTitleSubmit}>
        <input type="text" className={styles.input} placeholder="영화 제목을 입력하세요" value={inputTitle} onChange={handleTitleChange} />
        <button type="button" className={styles.inputBtn} onClick={handleTitleClick}>검색</button>
      </form>
    </header>

  )
}

export default Header

// 반응형으로 만들기
// useState 요소를 props로 넘겨주는 게 나을지 recoil에 저장해서 index 로 부르는 게 나을지 생각
// handleTitleSubmit 이랑 handleTitleClick 이 중복발생