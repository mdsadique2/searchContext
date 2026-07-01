import React, { useState, useEffect } from 'react';

export function SearchResultsCard({ cardData }) {
  return (
    <>
        <div className='rounded-xl shadow-lg w-xs p-4 mb-8 border border-gray-900 box-border'>
            <img src={cardData.image} alt={cardData.title} loading="lazy" className='rounded-s h-[160px]'/>
            <h3 className='my-4 font-serif text-gray-200'>{cardData.title}</h3>
            <p className='my-4 text-xs font-light text-gray-500'>{cardData.description}</p>
            <a className='text-xs font-light font-serif' href={cardData.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
        </div>
    </>
  );
}

export function SearchResultsCardLoader() {
  return (
    <>
        <div className='rounded-xl shadow-lg w-xs mb-8 border border-gray-900 min-h-200px box-border'>
          <div className='w-full animate-pulse p-4 box-border'>
            <div className='w-full h-[160px] bg-gray-700 rounded-s box-border'></div>
          </div>
        </div>
    </>
  );
}

const MemoizedSearchResultsCard = React.memo(SearchResultsCard);
const MemoizedSearchResultsCardLoader = React.memo(SearchResultsCardLoader);

export { MemoizedSearchResultsCard, MemoizedSearchResultsCardLoader };
