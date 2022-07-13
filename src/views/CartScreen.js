import { CartProduct } from '../components'
import styled from 'styled-components'
import {useGetCartQuery, useConfirmCartMutation} from '../store/apis'
import { formatterNumber } from '../utils/formatterNumber'

const CartTotal = styled.div`
  width: 100%;
  height: 4rem;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.3);
  margin: 10px;
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
` 


const CartScreen = () => {
  const { name } = JSON.parse(localStorage.getItem("userData"))

  const { data } = useGetCartQuery(name)

  const [ confirmCart ] = useConfirmCartMutation()

  const getTotal = () => {
    const total = data && data[0].products.reduce((acc, item) => {
      return acc + item.price 
    }, 0)

    return total
  }

  const handleConfirmCart = async () => {
    try {
      await confirmCart({ idCart: name }).unwrap()
      window.alert("tu pedido ha sido confirmado")
    } catch(error) {
      console.log("%%%%%", error)
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {
            data && data[0].products.map((product, index) => (
              <CartProduct idCart={data[0].id} key={index} {...product}/>
            ))
          }
        </div>
        <div className="col-12">
          <CartTotal>
            <strong>Total: </strong>
            <p>{ data && formatterNumber( getTotal() ) }</p>
          </CartTotal>
        </div>
        <button className="btn btn-primary" onClick={handleConfirmCart}>comprar</button>
      </div>
    </div>
  )
}

export default CartScreen
