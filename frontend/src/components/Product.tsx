import React from 'react';
import { Link } from 'react-router-dom';
import {IProduct } from '../data/types'

interface IProps {
    product: IProduct
    onAdd: (arg0: IProduct) => void
}

export default function Product(props:IProps):JSX.Element {
  const { product, onAdd } = props;
  return (
    <div
      style={{display: 'flex', justifyContent: 'space-between',        borderBottom: '1px solid black'

      }}

    >
      {/* <img className="small" src={product.image} alt={product.name} /> */}


      <Link to={`/product/${product.id}`} style={{ display: 'flex', gap: '50px'}}>

      <h3>{product.title}</h3>
      {/* <div>${product.price}</div> */}
      <h2>{product.barcode}</h2>
      </Link>

      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}