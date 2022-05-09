import { axios } from 'hooks/worker'
import { ISearchData } from '../types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
  s: string
  page: number
}

export const MovieApi = (params: Params) =>
  axios.get<ISearchData>(`${MOVIE_BASE_URL}`, {
    params: {
      api_key: '292e32667',
      ...params
  },
  })
