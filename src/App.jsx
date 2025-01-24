import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { MidiasProvider  } from "./Context/MidiasContext";
import Dashboard from './pages/Dashboard';
import UploadMidia from './pages/UploadMidia';
import ApresentarMidias from './pages/ApresentarMidias';
import GerenciarMidias from './pages/GerenciarMidias';

function App() {
  const [midiasSelecionadas, setMidiasSelecionadas] = useState([]);
  return (
    <MidiasProvider>  {/* Envolva o Routes com o MidiasProvider */}
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/midias" element={<ApresentarMidias midiasProps={midiasSelecionadas || []} />} />
      <Route path="/upload" element={<UploadMidia />} />
      <Route 
        path='/gerenciarmidias' 
        element={
          <GerenciarMidias 
            midiasSelecionadas={midiasSelecionadas} 
            setMidiasSelecionadas={setMidiasSelecionadas} 
          />
        } 
      />
    </Routes>
  </MidiasProvider>
  )
}

export default App
