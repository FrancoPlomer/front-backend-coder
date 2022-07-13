import io from 'socket.io-client' 

let socket = io(`${process.env.REACT_APP_BACKEND_URL}`)

export default socket
