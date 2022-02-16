import { IProduct } from "./types";

interface IData {
  products: IProduct[]
}

const data:IData = {
    products: [
      {
        id: '1',
        title: 'MacBook',
        barcode: '0001',
        description: 'Computer',
//        price: 1400,
//        image: 'https://picsum.photos/id/180/2400/1600',
        qty: 0,
      },
      {
        id: '2',
        title: 'Old Car',
        barcode: '0002',
        description: 'Car',
        // price: 2400,
        // image: 'https://picsum.photos/id/111/4400/2656',
        qty: 0,
      },
      {
        id: '3',
        title: 'W Shoes',
        barcode: '0003',
        description: 'Shoe',
        // price: 1000,
        // image: 'https://picsum.photos/id/21/3008/2008',
        qty: 0,
      },
    ],
  };
  export default data;