import { BrowserRouter } from 'react-router-dom';
import './App.css'
import HeaderComponent from './components/admin/header/HeaderComponent';
import MyRoutes from './components/myRoutes/MyRoutes';
import FooterComponent from './components/footer/FooterComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
        <MyRoutes />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App
