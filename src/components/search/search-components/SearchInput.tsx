import { useState, useEffect } from 'react';

export function SearchInput({ onSearchFn }) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    onSearchFn(searchText);
  }, [searchText]);

  const onInputChange = (e) => {
    setSearchText(() => e.target.value);
  };

  return (
    <>
      <section id="center" className='sticky top-[0px] z-10 shadow-lg bg-gray-900 border-b border-gray-800'>
        <div className='p-6 flex-initial text-center'>
          <input type="text" placeholder="Type here" className="input" onChange={onInputChange} value={searchText} />
        </div>
      </section>
    </>
  );
}

export default SearchInput;
