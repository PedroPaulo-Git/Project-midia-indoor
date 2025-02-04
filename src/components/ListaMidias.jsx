import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaMidias = ({ onSelecionar }) => {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMidias, setSelectedMidias] = useState([]);

  const [isEnviando, setIsEnviando] = useState(false);
  useEffect(() => {
    const storedMidias = localStorage.getItem("midiasSelecionadas");
  
    if (storedMidias) {
      try {
        const parsedMidias = JSON.parse(storedMidias);
        console.log("Mídias recuperadas do localStorage:", parsedMidias);
        setSelectedMidias(parsedMidias); // Atualizando o estado
      } catch (e) {
        console.error("Erro ao parsear as mídias do localStorage", e);
      }
    }
  }, []);
  
  useEffect(() => {
    console.log("Estado de selectedMidias após recuperação:", selectedMidias);
  }, [selectedMidias]);  // Adicionando um efeito para monitorar quando selectedMidias mudar
  
  useEffect(() => {
   
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/midias");
      setMidias(response.data.midias); 
    } catch (err) {
      setError("Erro ao carregar as mídias.");
    } finally {
      setLoading(false);
    }
  };

    fetchImages();
  }, []);

  
  const handleSelectMedia = (midia) => {
    setSelectedMidias((prevSelected) =>
      prevSelected.some((item) => item.id === midia.id)
        ? prevSelected.filter((item) => item.id !== midia.id)
        : [...prevSelected, midia]
    );
  };
 
  const handleConfirmSelection = async () => { 
    setIsEnviando(true);
    if (selectedMidias.length === 0) {
      console.log("Nenhuma mídia selecionada.");
      return;
    }
  
    try {
      // 1. Envia as mídias selecionadas para o servidor via WebSocket
      await axios.post("http://localhost:5000/websocket/update-medias", {
        medias: selectedMidias.map(midia => midia.url) // Envia apenas os URLs
      });
  
      // 2. Armazenar as mídias selecionadas no localStorage
      localStorage.setItem("midiasSelecionadas", JSON.stringify(selectedMidias));
      onSelecionar(selectedMidias);
  
    } catch (error) {
      console.error("Erro ao enviar mídias:", error);
    } finally {
      setIsEnviando(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedMidias.length === 0) {
      alert("Nenhuma mídia selecionada.");
      return;
    }
    
    setIsEnviando(true);

    try {
      // Deletar mídias selecionadas via API
      const idsParaDeletar = selectedMidias.map((midia) => midia.id);
      await axios.delete("http://localhost:5000/midias", {
        data: { ids: idsParaDeletar }, // Envia os IDs das mídias a serem deletadas
      });

      // Atualizar a lista de mídias após a exclusão
      setMidias(midias.filter((midia) => !idsParaDeletar.includes(midia.id)));
      setSelectedMidias([]); // Limpar as seleções após a exclusão
    } catch (error) {
      console.error("Erro ao deletar as mídias:", error);
    } finally {
      setIsEnviando(false);
    }
  };

  if (loading) return <p>Carregando mídias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full px-8 py-10">
      <h2 className="py-4 font-semibold text-2xl">Mídias</h2>
      <div className="grid grid-cols-6 ">
      {midias.length === 0 ? (
          <p className="mb-4">Nenhuma mídia encontrada.</p>
        ) : (
          midias.map((midia) => (
            <div key={midia.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedMidias.some((item) => item.id === midia.id)}
                onChange={() => handleSelectMedia(midia)}
              />
              <img
                src={`http://localhost:5000${midia.url}`} // Certifique-se que a URL está correta
                alt={midia.nomeArquivo}
                className="w-20 h-20 object-cover rounded-md border"
              />
            </div>
          ))
        )}
        
      </div>
     

     {midias.length > 0 && (
       <div className="Buttons space-x-5">
        
      <button
        disabled={isEnviando}
        onClick={handleConfirmSelection}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        {isEnviando ? 'Enviando...' : 'Selecionar e Apresentar'}
      </button>
      
        <button
        disabled={isEnviando}
        onClick={handleDeleteSelected}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
      >
        {isEnviando ? 'Deletando...' : 'Deletar Mídias Selecionadas'}
      </button>

      <a
       href="/upload"
        className="mt-9 px-6 py-2.5 bg-gray-400 text-white rounded-md"
      >
        {isEnviando ? 'Deletando...' : 'Adicionar Mídias'}
      </a>
      </div>
     )}
      
      {midias.length === 0 && (
        <a
       href="/upload"
        className="mt-9 px-6 py-2.5 bg-gray-400 text-white rounded-md"
      >
        {isEnviando ? 'Deletando...' : 'Adicionar Mídias'}
      </a>
      )}
      
      </div>
  );
};

export default ListaMidias;
