import { atom } from "recoil"
import { IMovieData } from "types/movie"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: sessionStorage,
})

export const SearchTitleAtom = atom({
  key: 'searchData',
  default: ''
})

export const ClickedMovieDataAtom = atom<IMovieData>({
  key: 'clickedMovieData',
  default: {
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
  }
})

export const ClickedBookMarkDataAtom = atom<IMovieData>({
  key: 'clickedBookmarkData',
  default: {
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
  }
})

export const BookMarkListAtom = atom<IMovieData[]>({
  key: 'bookmarkList',
  default: [],
  effects_UNSTABLE: [persistAtom]
})
