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
  // Estado que guarda as mídias atualmente marcadas (selecionadas)
  const [selectedMidias, setSelectedMidias] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const albunsResponse = await axios.get(
          "http://localhost:5000/gerenciarmidias/albuns"
        );
        const midiasResponse = await axios.get("http://localhost:5000/midias");
  
        if (Array.isArray(midiasResponse.data.midias)) {
          setAlbuns(albunsResponse.data);
          setMidias(midiasResponse.data.midias);
        } else {
          console.error("Erro: A resposta de mídias não é um array.");
          setError("Erro ao carregar mídias.");
        }
      } catch (error) {
        setError("Erro ao carregar álbuns e mídias.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const openModal = (album) => {
    setSelectedAlbum(album);
    // Inicializa a seleção com as mídias já associadas ao álbum
    if (album.midias) {
      setSelectedMidias(album.midias);
    } else {
      setSelectedMidias([]);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Opcional: se preferir, pode limpar o estado ou manter a seleção
    // setSelectedMidias([]);
  };

  const handleSelectMedia = (midia) => {
    setSelectedMidias((prevSelected) =>
      prevSelected.some((m) => m.id === midia.id)
        ? prevSelected.filter((m) => m.id !== midia.id)
        : [...prevSelected, midia]
    );
  };
  // Novo handler: Atualiza o álbum no backend com somente as mídias selecionadas
  const handleAtualizarMidiasSelecionadas = async () => {
    if (!selectedAlbum) {
      alert("Nenhum álbum selecionado.");
      return;
    }
  
    console.log("🔹 Mídias selecionadas antes da requisição:", selectedMidias); // Verifique o que está sendo enviado
  
    try {
      const response = await axios.put(
        `http://localhost:5000/gerenciarmidias/albuns/${selectedAlbum.id}/midias`,
        { midias: selectedMidias }, // Envia um array vazio se todas forem desmarcadas
        { headers: { "Content-Type": "application/json" } }
      );
  
      alert("Álbum atualizado com as mídias selecionadas!");
  
      // Atualiza o estado localmente
      const albumAtualizado = response.data;
      const updatedAlbuns = albuns.map((album) =>
        album.id === selectedAlbum.id ? { ...album, midias: selectedMidias } : album
      );
      setAlbuns(updatedAlbuns);
  
      // Fecha o modal
      setModalIsOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar mídias do álbum:", error);
      alert("Erro ao atualizar as mídias do álbum. Tente novamente.");
    }
  };
  

  // Handler para apresentar somente as mídias atualmente selecionadas
  const handleApresentarMidiasDoAlbum = () => {
    if (selectedMidias && selectedMidias.length > 0) {
      // Salva no localStorage somente as mídias atualmente selecionadas
      localStorage.setItem("midiasSelecionadas", JSON.stringify(selectedMidias));
      // Abre a rota /midias (aqui, em nova aba)
      window.open("/midias", "_blank");
    } else {
      alert("Nenhuma mídia selecionada para apresentar.");
    }
  };

  if (loading) return <p>Carregando álbuns...</p>;
  if (error) return <p>{error}</p>;

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
              <p>Id: {album.id}</p>
              <h3 className="font-semibold text-xl">{album.nome}</h3>
              <p>{album.descricao}</p>
              {album.midias && album.midias.length > 0 ? (
                <div className="flex items-center mt-2">
                  {album.midias.slice(0, 3).map((midia, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${midia.url}`}
                      alt="preview"
                      className="w-10 h-10 object-cover rounded-full mr-1"
                    />
                  ))}
                  <span>{album.midias.length} mídias</span>
                </div>
              ) : (
                <p>Sem mídias</p>
              )}
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
        <div className="space-y-4 overflow-y-auto max-h-80">
          {midias.length === 0 ? (
            <p>Nenhuma mídia encontrada.</p>
          ) : (
            midias.map((midia) => (
              <div key={midia.id} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedMidias.some((m) => m.id === midia.id)}
                  onChange={() => handleSelectMedia(midia)}
                />
                <img
                  src={`http://localhost:5000${midia.url}`}
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
          {/* Botão para atualizar o álbum com somente as mídias com checkbox ativo */}
          <button
            onClick={handleAtualizarMidiasSelecionadas}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Atualizar Mídias Selecionadas
          </button>
          {/* Botão para apresentar as mídias atualmente selecionadas */}
          <button
            onClick={handleApresentarMidiasDoAlbum}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Apresentar Mídias do Álbum
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListaAlbuns;
