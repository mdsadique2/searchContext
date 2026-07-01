import {useRef, useState, useCallback, useEffect} from 'react';
import { useSearchContext } from './context';
import { SearchInput } from './search-components/SearchInput';
import { SearchResultsContainer } from './search-components/SearchResultsContainer';
import { useDebounce } from '../../hooks/useDebounce';

export function SearchPage() {
  const controllerRef = useRef(new AbortController());

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const ctx = useSearchContext();
  const { search, suggestion } = ctx;


  const searchFn = useCallback(async (query) => {
    console.log('searchFn called with query:', query, 'page:', page);
    if (query.trim()==="") {return}
    setIsLoading(true);
    const responseData = await search({ query, page, controller: controllerRef.current });
    setSearchData((prevData) => [...prevData, ...responseData?.articles]);
    setIsLoading(false);
  }, [search, page, isLoading]);

  const searchDebounced = useDebounce(searchFn, 500);


  const queryUpdateHandler = useCallback((newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
    setSearchData([]);
  },[])

  useEffect(() => {
    console.log('useEffect triggered with searchQuery:', searchQuery, 'page:', page);
    searchDebounced(searchQuery);
  }, [searchQuery, page]);

  return (
    <>
      <section id="center">
        <div className='relative'>
          <SearchInput onSearchFn={queryUpdateHandler} />
          <SearchResultsContainer 
            searchData={searchData} 
            query={searchQuery} 
            isLoading={isLoading} 
            page={page} 
            updatePage={setPage}
            setIsLoading={setIsLoading}
          />
          {/* <button onClick={search}> Search </button>
          <button onClick={suggestion}> Suggestion </button>
          <button className="btn btn-xs">Xsmall</button>
        <button className="btn btn-sm">Small</button> */}
        </div>
      </section>
    </>
  );
}

export default SearchPage;
