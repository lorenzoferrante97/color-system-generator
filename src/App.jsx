import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/defaultLayout';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/test' element={<Test />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
