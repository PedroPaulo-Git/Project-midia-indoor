import React, { useState } from "react";

const GerenciamentoMidias = () => {
  const [midias, setMidias] = useState([]);
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    setMidias([...midias, ...files]);
  };
  return (
    <div>
      <h1>Gerenciamento de Mídias</h1>
      <input type="file" multiple onChange={handleUpload} />
      <ul>
        {midias.map((midia, index) => (
          <li key={index}>{midia.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GerenciamentoMidias;
