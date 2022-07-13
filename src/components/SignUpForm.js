import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm';
import { usePostUserRegisterMutation, useLoginUserMutation, useCreateNewCartMutation } from '../store/apis'

const SignUpForm = () => {
  const user = localStorage.getItem("userData")

  let navigate = useNavigate()

  const  [ postUserRegister ]  = usePostUserRegisterMutation()

  const [ loginUser ] = useLoginUserMutation() 

  const [ createNewCart ] = useCreateNewCartMutation()

  const [ formValues, handleInputChange, handleInputChangeImg ] = useForm({
    mail: "",
    password: "",
    nombre: "",
    direccion: "",
    edad: "",
    numTelefono: "",
    image: "",
  });

  const { 
    mail,
    password,
    nombre,
    direccion,
    edad,
    numTelefono,
    image
  } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("mail", mail)
      formData.append("password", password)
      formData.append("nombre", nombre)
      formData.append("direccion", direccion)
      formData.append("edad", edad)
      formData.append("numTelefono", numTelefono)
      formData.append("image", image)

      await postUserRegister(formData).unwrap()

      const response = await loginUser({ username: mail, password }).unwrap()

      localStorage.setItem("userData", JSON.stringify( response.user ))
      localStorage.setItem("access_token", JSON.stringify( response.token ))

      await createNewCart(mail).unwrap()

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
        Sign Up
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
                  name="mail"
                  value={mail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  name="password"
                  type="password" 
                  className="form-control" 
                  value={password}
                  onChange={handleInputChange}
                  required
                />              
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Nombre Completo</label>
                 <input 
                  name="nombre"
                  className="form-control" 
                  value={nombre}
                  onChange={handleInputChange}
                  required
                />              
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Direccion</label>
                <input 
                  name="direccion"
                  className="form-control" 
                  value={direccion}
                  onChange={handleInputChange}
                  required
                />              
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Edad</label>
                <input 
                  name="edad"
                  className="form-control" 
                  value={edad}
                  type="number"
                  onChange={handleInputChange}
                  required
                />              
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Numero de Telefono</label>
                <input 
                  name="numTelefono"
                  className="form-control" 
                  value={numTelefono}
                  type="number"
                  onChange={handleInputChange}
                  required
                />              
              </div>

              <div className="mb-3">
                <label className="form-label">Ingrese Avatar</label>
                <input 
                  name="image"
                  className="form-control"
                  type="file"
                  accept="image/png"
                  onChange={handleInputChangeImg}
                  required
                />              
              </div> 

              <button type="submit" className="btn btn-primary col-3">
                Registrarse
              </button>
                <span className="col-12 mt-2">* si ya tiene cuenta <Link to="/login">logearse</Link></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
