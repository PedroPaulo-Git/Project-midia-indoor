import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaMidias = () => {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMidias = async () => {
      try {
        const response = await axios.get("http://localhost:5000/midias");
        setMidias(response.data);
      } catch (error) {
        setError("Erro ao carregar mídias.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMidias();
  }, []);

  if (loading) return <p>Carregando mídias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mídias</h2>
      <div className="space-y-4">
        {midias.length === 0 ? (
          <p>Nenhuma mídia encontrada.</p>
        ) : (
          midias.map((midia) => (
            <div key={midia.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-xl">{midia.nomeArquivo}</h3>
              <p>{midia.descricao}</p>
              <p>{midia.tamanho}</p> {/* Supondo que 'tamanho' seja uma propriedade */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaMidias;
