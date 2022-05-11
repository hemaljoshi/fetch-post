import FetchPostController from './src/FetchPostController';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostData from './src/PostData';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FetchPostController />} />
        <Route path='/data' element={<PostData />} />
      </Routes>
    </BrowserRouter>
  );
}
