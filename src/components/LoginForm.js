import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm';
import { useLoginUserMutation } from '../store/apis'

const LoginForm = () => {
  const user = localStorage.getItem("userData")

  const [ loginUser ] = useLoginUserMutation()

  const navigate = useNavigate()
  
  const [formValues, handleInputChange, reset] = useForm({
    username: "",
    password: "",
  });

  const { 
    username,
    password,
  } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formValues).unwrap() 

      localStorage.setItem("userData", JSON.stringify( response.user ))
      localStorage.setItem("access_token", JSON.stringify( response.token ))

      navigate("/", {
        replace: true
      })

    } catch(error) {
      console.log("%%%%%", error)
    }
  };


  useEffect(() => {
    if(user) {
      navigate("/", {
        replace: true
      })
    }
  }, [])


  return (
    <div className="card shadow-lg">
      <div className="card-header">
        Login
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row" >

              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="username"
                  value={username}
                  onChange={handleInputChange}/>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  name="password"
                  type="password" 
                  className="form-control" 
                  value={password}
                  onChange={handleInputChange}/>              
              </div>

            </div>
            <button type="submit" className="btn btn-primary col-12">
              Ingresar
            </button>
            <span className="col-12">* si no tiene cuenta debe <Link to="/signup">registrarse</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
