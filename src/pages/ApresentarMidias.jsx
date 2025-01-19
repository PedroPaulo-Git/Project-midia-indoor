import React, { useState, useEffect } from "react";
import axios from "axios";
const ApresentarMidias = () => {
  const [midias, setMidias] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/midias");
      setImages(response.data.midias);
    } catch (err) {
      setError("Erro ao carregar as mídias.");
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Gerenciamento de Mídias</h1>
      <a
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        href="/upload"
      >
        {" "}
        fazer upload de midia
      </a>
      <div>
        <h1>Mídias</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((midia) => (
            <img
              key={midia.id}
              src={`http://localhost:5000${midia.url}`}
              alt={midia.nomeArquivo}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApresentarMidias;
