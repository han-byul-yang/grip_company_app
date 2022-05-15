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
    setInputTitle('')
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
