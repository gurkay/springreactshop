import { BrowserRouter } from 'react-router-dom';
import './App.css'
import HeaderComponent from './components/admin/header/HeaderComponent';
import DefaultRoutes from './components/myRoutes/DefaultRoutes';
import FooterComponent from './components/footer/FooterComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
        <DefaultRoutes />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App
