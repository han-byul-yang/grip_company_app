export interface IMovieData {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ISearchData {
  Search: ImovieData[]
  totalResults: number
  Response: string
  Error: string
}