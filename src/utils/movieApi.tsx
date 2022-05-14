// import { axios } from 'hooks/worker'
import axios from 'axios'
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
