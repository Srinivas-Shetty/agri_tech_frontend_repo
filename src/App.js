import './App.css';
import Header from './bars/components/Header';
import Explore from './contents/components/Explore';

import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAccount from './user_account/components/MyAccount';
import FertilizersList from './productsDisplay/components/fertilizersList';
import FertilizerDetails from './productsDisplay/components/fertilizerDetails';
import Profile from './user_account/components/profile';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          {/* <img className='w-full h-auto mt-10 max-h-96 object-cover' src={bannerImg} alt='bannerImg' /> */}
          {/* <div className="flex justify-center p-4">
            <div className="w-full max-w-7xl"> */}
            <div className='mt-16'>
              <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/account/profile" element={<MyAccount />} />  
                <Route path="/account/address" element={<MyAccount />} /> 
                <Route path="/fertilizers" element={<FertilizersList />} />
                <Route path="/fertilizers/all" element={<FertilizersList />} />
                <Route path="/fertilizers/details/:id" element={<FertilizerDetails />} />
              </Routes>
              </div>
            {/* </div>
          </div> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
