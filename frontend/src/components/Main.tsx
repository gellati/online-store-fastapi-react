import React, { useEffect, useState } from 'react';
import { IProduct } from '../data/types';
import Product from './Product';

interface IProps {
    products: IProduct[]
    onAdd: (arg0: IProduct) => void
}

export default function Main(props:IProps):JSX.Element {
  const { products, onAdd } = props;

  const [displayProducts, setDisplayProducts] = useState<IProduct[]>(products)
  const [searchText, setSearchText] = useState('')

  const [sortBTitleAscending, setsortByTitleAscending] = useState(true)
  const [sortByBarcodeAscending, setsortByBarcodeAscending] = useState(true)

  useEffect(() => {
//    if(products.length > 0) {
      const filteredProducts:IProduct[] = []
      products.forEach((product:IProduct) => {
        if(product.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1
        || product.barcode.indexOf(searchText) > -1

        ) {
          filteredProducts.push(product)
        }
      })
      setDisplayProducts(filteredProducts)
//    }
  }, [searchText, products])

  const sortByBarcode = () => {
    let sortedProducts:IProduct[] = []
    if(sortByBarcodeAscending){
      sortedProducts = displayProducts.sort((a,b) => (a.barcode > b.barcode) ? 1 : ((b.barcode > a.barcode) ? -1 : 0))
    } else {
      sortedProducts = displayProducts.sort((a,b) => (a.barcode > b.barcode) ? -1 : ((b.barcode > a.barcode) ? 1 : 0))
    }
    setDisplayProducts(sortedProducts)
    setsortByBarcodeAscending(!sortByBarcodeAscending)
  }

  const sortByTitle = () => {
    let sortedProducts:IProduct[] = []
    if(sortBTitleAscending){
      sortedProducts = displayProducts.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    } else {
      sortedProducts = displayProducts.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
    }
    setDisplayProducts(sortedProducts)
    setsortByTitleAscending(!sortBTitleAscending)
  }

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <input type={'text'} value={searchText} placeholder={'Search name or barcode'} onChange={(e) => {setSearchText(e.target.value)}} />
      <div>
        <div
         onClick={sortByTitle}
        >Name</div>
        <div
        onClick={sortByBarcode}
        >Barcode</div>
      </div>
      <div
      //className="row"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
      >
        <nav>
        {displayProducts.map((product:IProduct) => {
          return (
  <Product key={product.id} product={product} onAdd={onAdd} />
          )
        })
      }
      </nav>
      </div>
      Add product
    </main>
  );
}