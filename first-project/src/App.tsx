import Search from './components/search/search';
import Main from './components/main/main';

function App() {
  return (
    <div className="flex flex-col items-center my-20 max-w-[1440px] mx-auto px-5 md:px-20">
      <Search />
      <Main />
    </div>
  );
}

export default App;
