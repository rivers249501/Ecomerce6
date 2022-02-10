import {HashRouter, Navigate, Routes, Route, } from 'react-router-dom'; 
import {Login, Shop, ShopId, Cart, MainLayout } from './pages/Index';
import { ProtectedRoutes } from './components/ProtectedRoutes.jsx'
import './App.css';
import { useSelector } from 'react-redux';
import LoadingScreeen from './components/LoadingScreeen';
// import Footer from './components/Footer';


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
      {isLoading && <LoadingScreeen/>}

        <Routes>
          <Route  path='/login' element={<Login />}/>
          <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<ProtectedRoutes />}>
            
            <Route element={ <MainLayout />} >
                <Route path='/cart' element={<Cart />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/shop/:id' element={<ShopId />} />

            </Route>

            </Route>
        </Routes>

      </HashRouter>

    </div>
  );
}

export default App;
