import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UploadMidia from './pages/UploadMidia';
import ApresentarMidias from './pages/ApresentarMidias';
import GerenciarMidias from './pages/GerenciarMidias';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/midias" element={<ApresentarMidias />} />
        <Route path="/upload" element={<UploadMidia />} />
        <Route path='/gerenciarmidias' element = {<GerenciarMidias/>}/>
      </Routes>
    </>
  )
}

export default App
