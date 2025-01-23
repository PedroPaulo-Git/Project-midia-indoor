import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement("#root");
const ListaAlbuns = () => {
  const [albuns, setAlbuns] = useState([]);
  const [midias, setMidias] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMidias, setSelectedMidias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albunsResponse = await axios.get(
          "http://localhost:5000/gerenciarmidias/albuns"
        );
        const midiasResponse = await axios.get("http://localhost:5000/midias");
        setAlbuns(albunsResponse.data);
        setMidias(midiasResponse.data.midias); 
        console.log("Álbuns:", albunsResponse.data);
        console.log("Mídias:", midiasResponse.data);
      } catch (error) {
        setError("Erro ao carregar álbuns e mídias.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando álbuns...</p>;
  if (error) return <p>{error}</p>;
  const openModal = (album) => {
    setSelectedAlbum(album);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMidias([]);
  };

  const handleSelectMedia = (midia) => {
    setSelectedMidias((prevSelected) =>
      prevSelected.includes(midia)
        ? prevSelected.filter((m) => m !== midia)
        : [...prevSelected, midia]
    );
  };
  const handleAddMidiasToAlbum = async () => {
    try {
      await axios.put(
        `http://localhost:5000/gerenciarmidias/albuns/${selectedAlbum.id}/midias`,
        { midias: selectedMidias },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Mídias adicionadas ao álbum!");
      closeModal();
    } catch (error) {
      alert("Erro ao adicionar mídias ao álbum.");
      console.error(error);
    }
  };
  return (
    <div className="w-full px-8 py-10">
      <h2 className="py-8 font-semibold text-2xl">Álbuns</h2>
      <div className="grid grid-cols-6 gap-6">
        {albuns.length === 0 ? (
          <p>Nenhum álbum encontrado.</p>
        ) : (
          albuns.map((album) => (
            <div
              key={album.id}
              className="border p-4 rounded-md shadow-sm cursor-pointer"
              onClick={() => openModal(album)}
            >
              
              <h3 className="font-semibold text-xl">{album.nome}</h3>
              <p>{album.descricao}</p>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Mídias ao Álbum"
        className="Modal bg-slate-200 p-9 shadow-2xl w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="Overlay"
      >
        <h2>Adicionar Mídias ao Álbum: {selectedAlbum?.nome}</h2>
        <div className="space-y-4">
        {midias.length === 0 ? (
    <p>Nenhuma mídia encontrada.</p>
  ) : (
    midias.map((midia) => (
      <div key={midia.id} className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={selectedMidias.includes(midia)}
          onChange={() => handleSelectMedia(midia)}
        />
        
        <img
           src={`http://localhost:5000${midia.url}`}   // Certifique-se de que esta propriedade contém a URL correta
          alt={midia.nomeArquivo}
          className="w-20 h-20 object-cover rounded-md border"
        />
        
        <span>{midia.nomeArquivo}</span>
      </div>
    ))
  )}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Fechar
          </button>
          <button
            onClick={handleAddMidiasToAlbum}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Adicionar Mídias
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListaAlbuns;
