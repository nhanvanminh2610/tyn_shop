import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './shared/layout/MainLayout';
import { HomePage } from './modules/HomePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />} errorElement={<h2>Error</h2>}>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='/room/:roomId' element={<RoomPage />} />
            <Route path='/donation' element={<DonationPage />} />
            <Route path='/profile' element={<ProfilePage />} /> */}
          </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
