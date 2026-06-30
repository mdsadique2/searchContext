import { useSearchContext } from './context';
import { SearchInput } from './search-components/searchInput';

export function SearchPage() {
  const ctx = useSearchContext();
  const { search, suggestion } = ctx;
  return (
    <>
      <section id="center">
        <div>
          <SearchInput onSearchFn={search} />
          <button onClick={search}> Search </button>
          <button onClick={suggestion}> Suggestion </button>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
