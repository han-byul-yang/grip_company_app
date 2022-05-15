import styles from "./loading.module.scss"

interface StateProps {
  state: string
}

  const Loading = ({state}: StateProps) => {
    return (
      <div className={styles.loader}>
        <div className={state === 'component' ? styles.component : styles.page}>
          <div className={styles.ring} />
          <span className={styles.loading}>loading...</span>
        </div>
      </div>
    )
  }

  export default Loading