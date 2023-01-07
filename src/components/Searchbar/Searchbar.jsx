import PropTypes from 'prop-types';
import styles from 'components/Searchbar/Searchbar.module.css'

export const Searchbar = ({onSubmitSearch}) => {
    return <header className={styles.searchbar}>
    <form className={styles.searchForm} onSubmit={onSubmitSearch}>
      <button className={styles.searchFormButton} type="submit">
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>
  
      <input
        className={styles.searchFormInput}
        name="text"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
}

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
}