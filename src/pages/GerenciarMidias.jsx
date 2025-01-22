import React, { useState } from "react";
import ListaAlbuns from "../components/ListaAlbuns";
import ListaMidias from "../components/ListaMidias";
import axios from "axios";


const GerenciarMidias = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/gerenciarmidias/albuns",
        {
          nome,
          descricao,
        },
        {
          headers: {
            "Content-Type": "application/json", // Garante que o tipo de conteúdo é JSON
          },
        }
      );

      if (response.status === 201) {
        setMessage("Álbum criado com sucesso!");
        setNome("");
        setDescricao("");
      }
    } catch (error) {
      setMessage("Erro ao criar álbum. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mx-auto shadow-lg w-4/5 items-center flex flex-col py-10 space-y-5">
        <span className="flex flex-col items-center justify-center align-center">
          <h1>Gerenciar Mídias</h1>
        </span>
        <div>
          <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
            <a
              href="/"
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
            >
              Gerenciar midias
            </a>
          </span>

          <div>Albuns</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-gray-700">
                Nome do Álbum
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="border rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-gray-700">
                Descrição
              </label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Criar Álbum
            </button>
          </form>
          {message && <p className="mt-4 text-green-500">{message}</p>}
          <ListaAlbuns />
          {/* <ListaMidias /> */}
        </div>
      </div>
    </div>
  );
};

export default GerenciarMidias;
