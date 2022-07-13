import React from 'react'

//ruting
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import { store } from './store';

//components
import DashboardRoutes from './routers/DashboardRoutes'
import SignUpScreen from './views/SignUpScreen';
import LoginScreen from './views/LoginScreen';

const App = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/*" element={<DashboardRoutes/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
