import React from 'react';
import { IProduct } from '../data/types';

interface IProps {
    cartItems: IProduct[]
    onAdd: (arg0:IProduct) => void
    onRemove: (arg0:IProduct) => void
}

export default function Basket(props:IProps):JSX.Element {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a:any, c:any) =>
  {
      console.log({a, c})
      return a + c.qty // * c.price

    }, 0

  );

  const totalPrice = itemsPrice;
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item:any) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            {/* <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div> */}
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert('Implement Checkout!')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}