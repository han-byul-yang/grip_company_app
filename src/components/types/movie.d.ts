interface IMovieData {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ISearchData {
  Search: ImovieData[]
  TotalResults: number
  Response: boolean
}