import React from 'react'
import { useAddProductToCartMutation, useGetCartQuery } from '../store/apis'

import { formatterNumber } from '../utils/formatterNumber'

const Product = ({ id, title, description, price, photoUrl, stock }) => {

  const [ addProductToCart ] = useAddProductToCartMutation()

  const { name } = JSON.parse( localStorage.getItem("userData") )

  const { data } = useGetCartQuery(name)

  const handleAddProductToCart = async () => {
    try {
      await addProductToCart({ idCart: data[0].id, idProduct: id }).unwrap()
    } catch(error) {
      console.log("%%%%%", error)
    }
  };

  return (
    <div className="col-sm-1 col-md-4 col-lg-3">
      <div className="d-flex justify-content-center container mt-5">
        <div className="card p-3 bg-white shadow-lg w-100"><i className="fa fa-apple"></i>
          <div className="about-product text-center mt-2"><img src={photoUrl} width="110" />
            <div>
              <h4>{title}</h4>
              <h6 className="mt-0 text-black-50">{ description }</h6>
            </div>
          </div>
          <div className="stats mt-2">
            <div className="d-flex justify-content-between p-price"><span>stock</span><span>{ stock }</span></div>
          </div>
          <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>Total</span><span>{ formatterNumber(price) }</span></div>
          <button className="btn btn-primary mt-3" disabled={stock <= 0} onClick={handleAddProductToCart} >Agregar al carrito</button>
        </div>
      </div>
    </div>
  )
}

export default Product
