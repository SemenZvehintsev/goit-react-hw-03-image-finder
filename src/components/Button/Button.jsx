import styles from 'components/Button/Button.module.css';

export const Button = ({loadMore}) => {
    return <button className={styles.button} type='button' onClick={loadMore}>Load more</button>
}