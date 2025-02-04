import React, { useState } from "react";
import axios from "axios";
import ButtonUploadSuccessful from '../components/buttons/ButtonUploadSuccessful'

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorToUpload, setErrorToUpload] = useState(false);
  const [messageErrorToUpload, setMessageErrorToUpload] = useState("");

  const [successToUpload, setSuccessToUpload] = useState(false);
  const [messageSuccessToUpload, setMessageSuccessToUpload] = useState("");


  const [isVisible, setIsVisible] = useState(false);
  // Função para lidar com o evento de selecionar a imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Função para enviar a imagem para o backend
  const handleImageUpload = async () => {
    console.log("enviando..");
    const formData = new FormData();
    formData.append("imagem", selectedImage);

    try {
      // Enviar a imagem usando axios
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Se o upload for bem-sucedido, armazena a URL da imagem
      if (response.data.success) {
        setImageUrl(response.data.fileUrl);
        console.log(response);
        console.log("Upload successful");
        setSuccessToUpload(true);
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 2000);
        
        setMessageSuccessToUpload(response.data);
      } else {
        alert("Falha no upload da imagem");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Exibe a mensagem de erro que veio do servidor
        setErrorToUpload(true);
        setMessageErrorToUpload(error.response.data);
        console.error(
          "Erro ao fazer upload da imagem: ",
          error.response.data.message
        );
        alert(error.response.data.message); // Mostra a mensagem de erro para o usuário
      } else {
        // Caso não haja uma resposta com a mensagem
        console.error("Erro ao fazer upload da imagem ->", error);
        console.error(error.response.data);
        alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto shadow-lg w-4/5 items-center flex flex-col py-10 space-y-5">

    
      <h1 className="font-semibold text-3xl">Faça o upload da sua mídia</h1>
      {errorToUpload && messageErrorToUpload?.message && (
        <div>{messageErrorToUpload.message}</div>
      )}
      {successToUpload && messageSuccessToUpload?.message && (
        <div>{messageSuccessToUpload.message}</div>
      )}
      <div className="flex flex-col mx-auto justify-center text-center">

     <span>
<input type="file" name="ENviar" placeholder="Enviar" onChange={handleImageChange} />
     </span>
      
     {imageUrl && ( 
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 ">
      <ButtonUploadSuccessful isVisible ={isVisible} setIsVisible={setIsVisible}/>
      </div>
      )}
      <div className="space-x-6 mt-6">
      <button
        onClick={handleImageUpload}
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Fazer Upload
      </button>
     
      <a
        target="blank"
        href="/midias"
        className="focus:outline-none text-white bg-green-700  font-medium rounded-lg text-sm px-5 
       py-2.5 me-2 mb-2 dark:bg-green-600 "
      >
        Apresentar Mídias
      </a>
      <a
        href="/gerenciarmidias"
        className="focus:outline-none text-white bg-gray-700  font-medium rounded-lg text-sm px-5 
       py-2.5 me-2 mb-2"
      >
        Gerenciar Mídias
      </a>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ImageUpload;
