import Tabs from "../../Tabs/Tabs"
import { useState, useEffect } from "hooks"
import { useSetRecoilState, useRecoilState } from "recoil"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import { BookMarkListAtom, ClickedBookMarkDataAtom } from "components/atom"
import styles from './bookmark.module.scss'
import BookMarkModal from "../../Modal/BookMarkModal"
import { IMovieData } from "types/movie"

const BookMark = () => {
  const [openModal, setOpenModal] = useState(false)
  const [bookmarkedMovies, setBookmarkedMovies] = useRecoilState(BookMarkListAtom)
  const setClickedBookmark = useSetRecoilState(ClickedBookMarkDataAtom)
  const [noBookmark, setNoBookmark] = useState(true)

  const handleMovieClick = (movie : IMovieData) => {
    setOpenModal(true)
    setClickedBookmark(movie)
  }

  useEffect(() => {
    setNoBookmark(bookmarkedMovies.length === 0)
  }, [bookmarkedMovies])

  const onDragEnd = ({destination, source}: DropResult) => {
    if (!destination)  return

    setBookmarkedMovies((prevState) => {
      const copyMovie = [...prevState]
      const itemMove = copyMovie[source.index]
      copyMovie.splice(source.index, 1)
      copyMovie.splice(destination.index, 0, itemMove)
      return copyMovie
  })
  }

  return (
    <div className={styles.defaultStyle}>
      <header>
        <h1>내 즐겨찾기</h1>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <section>
            { noBookmark ? 
              <p>즐겨찾기가 존재하지 않습니다.</p> :
              <Droppable droppableId="bookmarkDrop">
                {(handleDrop) => (
                  <ul className={styles.resultList} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
                    {bookmarkedMovies.map((movie,idx) =>
                      <Draggable draggableId={`${movie.imdbID}`} key={`${movie.imdbID}`} index={idx}> 
                        {(handleDrag) => 
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                          <li key={`movie-${movie.imdbID}`} className={styles.eachResult} ref={handleDrag.innerRef} {...handleDrag.draggableProps} {...handleDrag.dragHandleProps} onClick={() => handleMovieClick(movie)}>
                            <img src={movie.Poster} alt='movie poster'/>
                            <div className={styles.contents}>
                              <div className={styles.title}>{movie.Title}</div>
                              <span className={styles.type}>{movie.Type}</span> |
                              <span className={styles.year}>{movie.Year}</span>
                            </div>
                          </li>}
                      </Draggable>)}
                    {handleDrop.placeholder}
                  </ul>)}
              </Droppable>}
          </section>
        </div>
      </DragDropContext>
      <Tabs />
      <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forDelete' />
    </div>
  )
}

export default BookMark

// Tab를 router안에 집어 넣을 수 있는지 확인
// bookmark bookMark 통일
// search component의 styles랑 겹치는 문제 해결
// suspense 넣기
// section에 scss 추가해주기