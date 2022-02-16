import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    countCartItems: number
}

export default function Header(props:IProps):JSX.Element {
    return (
        <header className="block row center">
          <div>
            <a href="#/">
              <h1>Small Shopping Cart</h1>
            </a>
          </div>
          <div>
            <a href="#/cart">
              Cart{' '}
              {props.countCartItems ? (
                <button className="badge">{props.countCartItems}</button>
              ) : (
                ''
              )}
            </a>{' '}
            <Link to={'/login'} >
              Management login
            </Link>
          </div>
        </header>
      );}
