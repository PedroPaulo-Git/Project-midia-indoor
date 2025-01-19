import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaAlbuns = () => {
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbuns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/gerenciarmidias/albuns");
        setAlbuns(response.data);
      } catch (error) {
        setError("Erro ao carregar álbuns.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbuns();
  }, []);

  if (loading) return <p>Carregando álbuns...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Álbuns</h2>
      <div className="space-y-4">
        {albuns.length === 0 ? (
          <p>Nenhum álbum encontrado.</p>
        ) : (
          albuns.map((album) => (
            <div key={album.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-xl">{album.nome}</h3>
              <p>{album.descricao}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaAlbuns;
