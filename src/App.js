import './App.css';
import Header from './bars/components/Header';
import Explore from './contents/components/Explore';
import bannerImg from './assets/homepage-banner1.jpg';

function App() {
  return (
    <div className="App">
      <Header />
      <img className='w-full h-auto mt-10 max-h-96 object-cover' src={bannerImg} alt='bannerImg' />
      <div className="flex justify-center p-4">
        <div className="w-full max-w-7xl">
          <Explore />
        </div>
      </div>
    </div>
  );
}

export default App;
