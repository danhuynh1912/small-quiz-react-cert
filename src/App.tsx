import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { QuizParamsProvider } from './context/QuizContext';
import Home from './pages/home';
import Result from './pages/result';

import './App.css';

function App() {
  return (
    <QuizParamsProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QuizParamsProvider>
  );
}

export default App;
