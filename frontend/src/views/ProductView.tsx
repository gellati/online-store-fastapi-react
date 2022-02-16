import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

import {IProduct } from '../data/types'

interface IProps {
    product?: IProduct
    onAdd?: (arg0: IProduct) => void
    productId?: number
}

export default function ProductView(props: IProps) {
    const { id } = useParams()
    const navigate = useNavigate()


    const [productData, setProductData] = useState<IProduct>()
    const [deleteProduct, setDeleteProduct] = useState('')
    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`http://localhost:8000/api/v1/products/${id}`)
            const data = await result.json()
            console.log(data)
            setProductData(data)
        }

        fetchData()

    }, [id]);

    useEffect(() => {
        if(deleteProduct.length > 0) {
            const deleteData = async () => {
                const result = await fetch(
                    `http://localhost:8000/api/v1/products/${id}`,
                    {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({ id: deleteProduct })
                    }
                )
                const data = await result.json()
                console.log(data)
                setDeleteProduct('')
                navigate("/", { replace: true });
            }

            deleteData()
        }
    }, [id, deleteProduct, navigate])


    return (
    <div>
        {productData &&
        <>
            {productData.title}
            <br />
            {productData.description}
            <br />
            {productData.barcode}
        </>
        }

    <br />
    <Link to={`/product/edit/${id}`}>
        <button>
            Edit product
        </button>
        </Link>
        {id &&
        <button onClick={() => setDeleteProduct(id)}>
            Delete product
        </button>
        }
    <HomeButton />

    </div>);
}
