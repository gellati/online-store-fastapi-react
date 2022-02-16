import React, { useEffect, useState } from 'react';
import Basket from '../components/Basket';
import Header from '../components/Header';
import Main from '../components/Main';
// import data from '../data/data';
import { IProduct } from '../data/types';
import { getToken, removeToken } from '../utils/localStorage';

export default function MainView() {



//    const { products } = data;

    const [products, setProducts] = useState<IProduct[]>([])


    const [cartItems, setCartItems] = useState<IProduct[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

    const [isMounted, setIsMounted] = useState(true)
    const token = getToken()

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`http://localhost:8000/api/v1/products`)
        const data = await result.json()
        if(isMounted){
          console.log({ data })
          setProducts(data)
          setIsMounted(false)
        }
      }
      fetchData()

    }, [isMounted])


    const onAdd = (product:IProduct) => {
      const exist = cartItems.find((x:IProduct) => x.id === product.id);
      if (exist) {
        setCartItems(
          cartItems.map((x:IProduct) => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)
        );
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
    };
    const onRemove = (product:IProduct) => {
      const exist:any = cartItems.find((x:IProduct) => x.id === product.id);
      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x:IProduct) => x.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((x:IProduct) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
    };

    const handleLogout  = () => {
      removeToken()
      setIsLoggedIn(false)
    }

    return (<div>
      {isLoggedIn
        ? <><div
          style={{
            border: '1px solid black',
            height: '50px',
            width: '100px'
            }} onClick={handleLogout}>
          Log out
          </div>
          </>
        : <>Not logged in</>
      }

      <Header countCartItems={cartItems.length}></Header>
      {JSON.stringify(products, null, 2)}
      {products &&
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
      }
  </div>);
}
