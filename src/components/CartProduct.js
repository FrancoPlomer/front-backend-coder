import { formatterNumber } from '../utils/formatterNumber'
import styled from 'styled-components'
import { useDeleteProductToCartMutation } from '../store/apis'


const CardContainer = styled.div`
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

const Title = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center
` 


const CartProduct = ({ id, title, price, photoUrl, idCart  }) => {

  const [ deleteProductToCart ] = useDeleteProductToCartMutation()

  const handleDeleteProductToCart = async () => {
    try {
      await deleteProductToCart({ idCart, idProduct: id }).unwrap()
    } catch(error) {
      console.log("%%%%%", error)
    }
  };

  return (
    <CardContainer>
      <Title>
        <img src={photoUrl} width="20px" alt={title}/>
        <p><strong>producto: </strong>{title}</p>
        <p><strong>precio: </strong>{formatterNumber(price)}</p>
      </Title>
      <button className="btn btn-danger" onClick={handleDeleteProductToCart}>X</button>
    </CardContainer>
  )
}

export default CartProduct
