import { useState, useEffect, useCallback } from "hooks"
import { useRecoilState } from "recoil"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import styles from './bookmark.module.scss'
import { BookMarkListAtom} from "utils/atom"

import Tabs from "../../components/Tabs"
import BookMarkModal from "../../components/Modal"
import MovieCards from "components/MovieCards"

const BookMark = () => {
  const [openModal, setOpenModal] = useState(false)
  const [bookmarkedMovies, setBookmarkedMovies] = useRecoilState(BookMarkListAtom)
  const [noBookmark, setNoBookmark] = useState(true)
  
  useEffect(() => {
    setNoBookmark(bookmarkedMovies.length === 0)
  }, [bookmarkedMovies])

  const handleDragEnd = useCallback(({destination, source}: DropResult) => {
    if (!destination)  return
    setBookmarkedMovies((prevState) => {
      const copyMovie = [...prevState]
      const itemMove = copyMovie[source.index]
      copyMovie.splice(source.index, 1)
      copyMovie.splice(destination.index, 0, itemMove)
      return copyMovie
  })
  }, [setBookmarkedMovies])

  return (
    <div className={styles.defaultStyle}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 즐겨찾기</h1>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <section>
          { noBookmark ? 
            <p>즐겨찾기가 존재하지 않습니다.</p> :
            <Droppable droppableId="bookmarkDrop">
              {(handleDrop) => (
                <ul className={styles.resultList} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
                  {bookmarkedMovies.map((movie,idx) =>
                    <Draggable draggableId={`${movie.imdbID}`} key={`${movie.imdbID}`} index={idx}> 
                      {(handleDrag) => 
                        <MovieCards key={`movie-${movie.imdbID}`} handleDrag={handleDrag} movie={movie} setOpenModal={setOpenModal} state='bookmark' />}
                    </Draggable>)}
                  {handleDrop.placeholder}
                </ul>)}
            </Droppable>}
        </section>
      </DragDropContext>
      <nav className={styles.nav}>
        <Tabs />
      </nav>
      <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forDelete' />
    </div>
  )
}

export default BookMark
