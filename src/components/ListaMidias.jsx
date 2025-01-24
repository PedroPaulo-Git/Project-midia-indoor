import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaMidias = ({ onSelecionar }) => {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMidias, setSelectedMidias] = useState([]);
  
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
 
  const handleConfirmSelection = () => {
    if (selectedMidias.length === 0) {
      console.log("Nenhuma mídia selecionada.");
      return;
    }
    // Armazenando as mídias selecionadas no sessionStorage
    sessionStorage.setItem("midiasSelecionadas", JSON.stringify(selectedMidias));
    console.log("Mídias selecionadas:", selectedMidias); // Verifique as mídias selecionadas no console
    onSelecionar(selectedMidias);
  };

  if (loading) return <p>Carregando mídias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full px-8 py-10">
      <h2 className="py-8 font-semibold text-2xl">Mídias</h2>
      <div className="grid grid-cols-6 ">
      {midias.length === 0 ? (
          <p>Nenhuma mídia encontrada.</p>
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
      <button
        onClick={handleConfirmSelection}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Apresentar Mídias Selecionadas
      </button>
    </div>
  );
};

export default ListaMidias;
