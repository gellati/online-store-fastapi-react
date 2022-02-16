import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { IProduct } from '../data/types';
import { getToken } from '../utils/localStorage'

function ProductEditView() {
    const { id } = useParams()
    const [productData, setProductData] = useState<IProduct>()
    const [updateData, setUpdateData] = useState<IProduct>()
    const [updateProduct, setUpdateProduct] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://localhost:8000/api/v1/products/${id}`)
            const data = await result.json()
            console.log(data)
            setProductData(data)
            setUpdateData(data)
        }
        fetchData()
    }, [id]);

    useEffect(() => {
        if(updateProduct && productData && updateData) {
            const token = getToken()
            const combinedObject:any = { ...productData, ...updateData }
            const diff = Object.entries(combinedObject).reduce((acc:any, [key, value]) => {
                if (
                  !Object.values(productData).includes(value) ||
                  !Object.values(updateData).includes(value)
                )
                  acc[key] = value

                return acc
              }, {})

              console.log({diff})
              fetch(`http://localhost:8000/api/v1/products/${id}`,
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(diff)
            }
            )
        }
        setUpdateProduct(false)

    }, [id, updateProduct])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({ productData })
        setUpdateProduct(true)
    }

    return <div>
        Edit product details
        {productData && updateData &&
        <>
        <form onSubmit={handleSubmit}>
            <label>
              {productData?.title}
            </label>
            <input
              type={'text'}
              onChange={(e) => {
                setUpdateData({...updateData, title: e.target.value});
              }}
              value={updateData?.title}
            />
        <button type="submit">
            Submit
        </button>
        </form>
        </>
        }

        <HomeButton />

    </div>;
}

export default ProductEditView;
