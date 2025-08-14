import styles from '../styles/Forms.module.css'

function Search( {searchQuery, setSearchQuery}) {
  return (
    <div>
        <div className="searchFields">
          <label htmlFor="search" className={styles.search}>
            Search:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
    </div>
  );
}

export default Search;
