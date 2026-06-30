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
      <section id="center">
        <div>
          <input type="text" onChange={onInputChange} value={searchText} />
        </div>
      </section>
    </>
  );
}

export default SearchInput;
