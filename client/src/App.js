import { Routes, Route, Link } from 'react-router-dom';

import Questions from './pages/Questions';
import NewQuestion from './pages/NewQuestion';
import Detail from './pages/Detail';

function App() {
  return (
    <div className='App'>
      <nav>
        <Link to='/'>Questions</Link>
        <Link to='/new'>New Question</Link>
      </nav>

      <hr />

      <Routes>
        <Route path='/' element={<Questions />} />
        <Route path='/new' element={<NewQuestion />} />
        <Route path='/question/:questionId' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
