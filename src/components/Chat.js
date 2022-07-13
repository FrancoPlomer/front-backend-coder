import React, { useState, useEffect, useRef } from 'react'
import { useAddMessageMutation } from "../store/apis"
// import socket from '../utils/socket'
import io from 'socket.io-client'


const Chat = ({ nombre = "" }) => {
  const [data, setData] = useState({
    message: "",
    messages: []
  })

  const [ addMessage ] = useAddMessageMutation()

  const userData = JSON.parse(localStorage.getItem("userData"))

  const socket = useRef();

  const handleChangeMessage = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/messages/chat/${userData.email}`, {
      method: "GET",
    })

    socket.current = io.connect(`${process.env.REACT_APP_BACKEND_URL}`)
    socket.current.emit("message", userData.email)
    socket.current.on("message", ({ msg }) => {
      setData((prevState) => ({
        ...prevState,
        messages: [...msg]
      }))
    })

    return () => socket.current.disconnect()
    
  }, [])

  useEffect(() => {
  }, [data.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.message !== "") {
      try {
        await addMessage({ author: userData.email, message: data.message }).unwrap()
        socket.current.emit("message", userData.email)
        setData((prevState) => ({
          ...prevState,
          message: ""
        }))
      } catch (error) {
        console.log("%%%%%", error)
      }
    }
  }


  return (
    <div className="container">
        <div className="row justify-content-md-center mt-3">
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center">CHAT</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush" id="listaMensajes">
                          {data.messages[0] !== "No hay mensajes..." ? data.messages.map((item) => (
                            <>
                              <li className="list-group-item">
                                <p><strong>Nombre:</strong> {userData.email}</p>
                                <p><strong>Mensaje:</strong> {item}</p>
                              </li>
                            </>
                          )) : <p>NO HAY MENSAJES</p>}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <form id="form" onSubmit={handleSubmit}>
                          <div className="input-group">
                              <input 
                                name="message"
                                value={data.message}
                                onChange={handleChangeMessage}
                                type="text" 
                                className="form-control"
                                placeholder="Escribe tu mensaje aquí..." 
                              />
                              <span className="input-group-append">
                                  <button 
                                    type="submit"
                                    className="btn btn-outline-primary" 
                                  >
                                      Enviar
                                  </button>
                              </span>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Chat
