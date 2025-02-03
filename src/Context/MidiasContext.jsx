import React, { createContext, useContext, useState, useEffect } from 'react';


const MidiasContext = createContext();

export const useMidias = () => {
  return useContext(MidiasContext);
};

export const MidiasProvider = ({ children }) => {
  const [midiasSelecionadas, setMidiasSelecionadas] = useState(() => {
    const storedMidias = localStorage.getItem('midiasSelecionadas');
    return storedMidias ? JSON.parse(storedMidias) : [];
  });
  
  // Conexão WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000'); // Endereço do seu servidor WebSocket

    // Quando receber uma mensagem do servidor
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'UPDATE_MEDIAS') {
        // Atualiza as mídias selecionadas
        setMidiasSelecionadas(data.medias);
        localStorage.setItem('midiasSelecionadas', JSON.stringify(data.medias));
      }
    };

    // Fecha a conexão ao desmontar o componente
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'midiasSelecionadas') {
        setMidiasSelecionadas(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const selecionarMidias = (midias) => {
    setMidiasSelecionadas(midias);
  };

  return (
    <MidiasContext.Provider value={{ midiasSelecionadas,selecionarMidias , setMidiasSelecionadas }}>
      {children}
    </MidiasContext.Provider>
  );
};
