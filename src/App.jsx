import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GerenciamentoMidias from './pages/GerenciamentoMidias';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/midias" element={<GerenciamentoMidias />} />
      </Routes>
    </>
  )
}

export default App
