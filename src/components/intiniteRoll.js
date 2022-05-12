import { memo, useCallback, useEffect, useState } from "react"
import { MovieApi } from "./services/MovieApi"

const Infinite = () => {
  const [target, setTarget] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [itemLists, setItemLists] = useState([1])
  const [page, setPage] = useState(1)
  const [apiData, setApiData] = useState([{Title: 'sally', Year: '2020', Type: 'movie'}])

  const Api = async () => {
    await MovieApi({
      s: 'love',
      page
    }).then((res) => {
      setApiData((prevState) => prevState.concat(res.data.Search))
      }).catch((error) => {
      console.log(error.message)
    })
  }

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      setPage(prevState => prevState + 1)
      await Api(page)
      observer.observe(entry.target)
    }
  }

  useEffect(() => {
    let observer
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target])

  return (
    <>
      {apiData.map((v) => {
          return (<div>{v.Title}</div>)
        })}
      <div ref={setTarget} className="Target-Element">
        {isLoaded && <div>loading</div>}
      </div>
    </>
  )
}

export default Infinite