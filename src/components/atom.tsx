import { atom } from "recoil"
import { IMovieData } from "./types/movie.d"

export const ClickedDataAtom = atom<IMovieData>({
  key: 'clickeddata',
  default: {
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
  }
})

export const BookMarkDataAtom = atom<IMovieData[]>({
  key: 'bookmarkdata',
  default: [{
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
  }]
})
