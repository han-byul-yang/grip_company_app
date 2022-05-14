export interface IMovieData {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ISearchData {
  Search: ImovieData[]
  totalResults: string
  Response: string
  Error: string
}