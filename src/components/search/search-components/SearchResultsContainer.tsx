import { useState, useEffect, useRef, useCallback } from 'react';
import {MemoizedSearchResultsCard, MemoizedSearchResultsCardLoader} from './SearchResultsCard';

export function SearchResultsContainer({ searchData, query, isLoading, page, updatePage, setIsLoading }) {

  const observerRef = useRef(null);

  const updatePageNumber = useCallback(() => {
    console.log('updatePageNumber called, current page:', page);
    updatePage((prevPage) => prevPage + 1);
  }, [updatePage, page]);

  useEffect(() => {
    if(query.trim() === "" || searchData.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          console.log("Visible");
          setIsLoading(true);
          updatePageNumber();
        }
      },
      {
        root: null,          // viewport
        rootMargin: "100px", // start loading 200px early
        threshold: 0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [updatePageNumber, query, isLoading, searchData, setIsLoading]);

  return (
    <>
        <div className="relative">
          {
            searchData && (<div className='sticky top-[88px] p-4 bg-gray-900 border-b border-gray-800 z-10'>
            <h2>Search Results for: {query}, Page: {page}</h2>
          </div>)
          }
          <div className="mx-auto grid grid-cols-4 gap-x-4 gap-y-4 p-6">
            {searchData?.length > 0 ? (searchData.map((article) => (
                  <MemoizedSearchResultsCard key={article.id} cardData={article} />
                ))
            ) : (
              <></>
            )}

            {
              (!searchData || searchData?.length === 0) && !isLoading && (
                <p className='text-gray-400 text-sm col-span-4 text-center'>No results found</p>
               )

            }

            {
              isLoading && Array.from({ length: 15 }).map((_, index) => (
                <MemoizedSearchResultsCardLoader key={index} />
              ))
            }
          </div>
          {/* Sentinel */}
          <div ref={observerRef} className='h-[2px]'/>
        </div>
    </>
  );
}

export default SearchResultsContainer;
