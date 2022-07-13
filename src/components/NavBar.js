import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useGetCartQuery} from '../store/apis'
import styled from 'styled-components'


const Image = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 0 10px;
`



const Navbar = () => {
  const navigate = useNavigate()

  const { name, avatar } = JSON.parse( localStorage.getItem("userData") )
  const { data:ImageBuffer } = avatar.data

  const { data, error, isLoading } =  useGetCartQuery(name)

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("access_token")
    navigate('/login', {
      replace: true
    })
  };


  const convertImage = () => {
    let arrayBufferView = new Uint8Array(ImageBuffer)
    let blob = new Blob([ arrayBufferView ], { type: avatar.contentType })
    let urlCreator = window.URL || window.webkitURL
    let imageUrl = urlCreator.createObjectURL(blob)

    return imageUrl
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark pt-3 px-3">

      <Link 
        className="navbar-brand" 
        to="/"
      >
        Market
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">


        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">

          <Link 
            className="nav-item nav-link position-relative"
            to="/atencion-cliente"
          >
            Atencion al Cliente
          </Link>

          <Link
            className="nav-item nav-link position-relative"
            to="/cart"
          >
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              { !isLoading ? data[0]?.products.length : "..." }
            </span>
            <i className="bi bi-cart"/>
          </Link>

          <div className="nav-item nav-link">
            <Image src={convertImage()} />
            <span className='text-info'>{ name }</span>
          </div>
          <button    
            className="nav-item nav-link btn" 
            onClick={ handleLogout }
          >
            <i className="bi bi-box-arrow-right"/>
          </button>
        </ul>
      </div>
    </nav>
  )
}


export default Navbar
