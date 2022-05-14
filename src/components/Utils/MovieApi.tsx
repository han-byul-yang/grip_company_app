import { axios } from 'hooks/worker'
import { ISearchData } from 'types/movie'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY

interface Params {
  s: string
  page: number
}

export const MovieApi = (params: Params) =>
  axios.get<ISearchData>(`${MOVIE_BASE_URL}`, {
    params: {
      apiKey: REST_API_KEY,
      ...params
  },
  })

  // api key 따로 관리 오류 *
