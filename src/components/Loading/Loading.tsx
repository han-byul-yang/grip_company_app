import styles from "./loading.module.scss"

  const Loading = () => {
    return (
      <div className={styles.background}>
        <p>loading</p>
        <div>hohoho</div>
        <p>im loading now</p>
      </div>
    )
  }

  export default Loading

  // 로딩 컴포넌트 만들기