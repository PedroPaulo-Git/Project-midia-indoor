import React, { createContext, useContext, useState } from 'react';

const MidiasContext = createContext();

export const useMidias = () => {
  return useContext(MidiasContext);
};

export const MidiasProvider = ({ children }) => {
  const [midiasSelecionadas, setMidiasSelecionadas] = useState([]);

  const selecionarMidias = (midias) => {
    setMidiasSelecionadas(midias);
  };

  return (
    <MidiasContext.Provider value={{ midiasSelecionadas,selecionarMidias , setMidiasSelecionadas }}>
      {children}
    </MidiasContext.Provider>
  );
};
