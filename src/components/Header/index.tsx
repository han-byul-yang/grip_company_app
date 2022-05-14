import React, { Dispatch, SetStateAction } from 'react'
import {useState} from 'hooks'

import styles from './header.module.scss'
import { IMovieData } from 'types/movie'

interface Props {
  setSearchTitle:  Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  setApiMovieData: Dispatch<SetStateAction<IMovieData[]>>
}

const Header = ({setSearchTitle, setPage, setApiMovieData} : Props) => {
  const [inputTitle, setInputTitle] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  } 

  const handleTitleClick = () => {
    setPage(1)
    setApiMovieData([])
    setSearchTitle(inputTitle)
    setInputTitle('') // 여기를 ''로 했는데 어떻게 결과가 계속 나오지
  }

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleTitleClick()
  }

  return (
    <form className={styles.inputBox} onSubmit={handleTitleSubmit}>
      <input type="text" className={styles.input} placeholder="영화 제목을 입력하세요" value={inputTitle} onChange={handleTitleChange} />
      <button type="button" className={styles.inputBtn} onClick={handleTitleClick}>검색</button>
    </form>
  )
}

export default Header

// 반응형으로 만들기 *
// useState 요소를 props로 넘겨주는 게 나을지 recoil에 저장해서 index 로 부르는 게 나을지 생각 x
// handleTitleSubmit 이랑 handleTitleClick 이 중복발생 *