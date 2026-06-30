import './App.css';
import { SearchProvider } from './components/search/context';
import { SearchPage } from './components/search/page';

function App() {
  return (
    <>
      <SearchProvider config={{}}>
        <SearchPage />
      </SearchProvider>
    </>
  );
}

export default App;
