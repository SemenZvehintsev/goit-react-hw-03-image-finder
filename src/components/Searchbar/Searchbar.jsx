import styles from 'components/Searchbar/Searchbar.module.css'

export const Searchbar = ({search, onSubmitSearch, onChangeSearch}) => {
    return <header className={styles.searchbar}>
    <form className={styles.searchForm} onSubmit={onSubmitSearch}>
      <button className={styles.searchFormButton} type="submit">
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>
  
      <input
        className={styles.searchFormInput}
        type="text"
        autoComplete="off"
        value={search}
        autoFocus
        placeholder="Search images and photos"
        onChange={onChangeSearch}
      />
    </form>
  </header>
}