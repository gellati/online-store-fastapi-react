import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data/data';
import { useEffect, useState } from 'react';
import {IProduct } from './data/types'
import { getList } from './services/list';
import { Route, Routes } from 'react-router-dom';
import ProductView from './views/ProductView';
import MainView from './views/MainView';
import LoginView from './views/LoginView';
import ProductEditView from './views/ProductEditView';

function App() {

  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
//    let mounted = true;
    getList()
      .then(items => {
//        if(mounted) {
          setList(items)
//        }
      })
//    return () => mounted = false;
  }, [])

//  console.log({list})

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<MainView />} />
        <Route path={`/product/:id`} element={<ProductView />} />
        <Route path={`/product/edit/:id`} element={<ProductEditView />} />
        <Route path={'/login'} element={<LoginView />} />
      </Routes>
    </div>
  );
}

export default App;