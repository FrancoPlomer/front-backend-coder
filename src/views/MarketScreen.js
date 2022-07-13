import React from 'react'

//components
import { ProductList } from '../components'

//redux
import { useGetAllProductsQuery } from '../store/apis'

//styled-components
import styled from 'styled-components'

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`

const MarketScreen = () => {
  const { data:dataProducts, error:errorProducts, isLoading:isLoadingProducts, refetch  } = useGetAllProductsQuery()  

  console.log(dataProducts)
  return (
    <div className="row">
    <div className="container" >
        {
          !isLoadingProducts ?
            <ProductList data={dataProducts}/> 
          :
          <SpinnerContainer>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </SpinnerContainer>
        }
      </div>
    </div>
  )
}

export default MarketScreen
