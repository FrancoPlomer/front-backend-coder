import React, { useState, useEffect } from 'react'

//compoents
import { Product } from '../components'



const ProductList = ({ data:products }) => {
    const [data, setData] = useState([...products]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [orderBy, setOrderBy] = useState(0);
    const [search, setSearch] = useState("");

    const handleNextPage = () => {
        setCurrentPage( currentPage + 6 )
    }

    const handlePrevPage = () => {
        if( currentPage > 0 )
            setCurrentPage( currentPage - 6)
    }

    const handleSearch = ({ target }) => {
        setCurrentPage( 0 )
        setSearch( target.value )
    }

    const handleOrder = ({ target }) => {
        setOrderBy(parseInt(target.value))
    }

    const sortProducts = (productsToSort) => {
        if(orderBy === 0){
            setData([...productsToSort.sort(function(a , b) { return a.id - b.id })])
        } else if(orderBy === 1){
            setData([...productsToSort.sort(function(a , b) { return a.price - b.price })])
        }else if(orderBy === 2){
            setData([...productsToSort.sort(function(a , b) { return b.price - a.price })])
        }
    }

    useEffect(() => {
        if(search.length === 0){
            sortProducts(data)
        } else {
            const filtered = data.filter(( product ) => product.title.toUpperCase().includes( search.toUpperCase() ))
            sortProducts(filtered)
        }
    }, [search, orderBy]);

    return (
        <div className="container-fluid">
            <div className="row">
                {data.length > 0 ? data.slice(currentPage, currentPage + 6).map((product) => (
                    <Product key={product.id} {...product}/>
                )) : <h2>no hay datos</h2>}
            </div>
        </div>
    )
}

export default ProductList
