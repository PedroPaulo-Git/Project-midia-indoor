import React, { useState, useEffect, useRef } from "react";
import { useMidias } from "../Context/MidiasContext";
import axios from "axios";

const ApresentarMidias = () => {
  const { midiasSelecionadas, setMidiasSelecionadas } = useMidias();
  const [midias, setMidias] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const selectedMidias = localStorage.getItem("midiasSelecionadas");
    console.log("midiasSelecionadas do localStorage:", selectedMidias); // Logando o valor

    if (selectedMidias) {
      const parsedMidias = JSON.parse(selectedMidias);
      console.log("midiasSelecionadas parseadas:", parsedMidias); // Verificando as mídias parseadas

      if (parsedMidias.length > 0) {
        setMidiasSelecionadas(parsedMidias);
      } else {
        console.log("Nenhuma mídia encontrada no localStorage.");
      }
    }
  }, [setMidiasSelecionadas]);

  useEffect(() => {
    const storedMidias = localStorage.getItem("midiasSelecionadas");

  if (storedMidias) {
    try {
      const parsedMidias = JSON.parse(storedMidias);
      console.log("Mídias recuperadas do localStorage:", parsedMidias);
      setSelectedMidias(parsedMidias);
    } catch (e) {
      console.error("Erro ao parsear as mídias do localStorage", e);
    }
  }

    const interval = setInterval(() => {
      if (currentIndex === midiasSelecionadas.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      } else {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/midias");
      console.log("Mídias recebidas do servidor:", response.data.midias); // Verificando as mídias recebidas
    } catch (err) {
      setError("Erro ao carregar as mídias.");
      console.error("Erro ao carregar as mídias:", err); // Log do erro
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const sliderRef = useRef(null);
  
  const setSliderRef = (node) => {
    if (node) {
      sliderRef.current = node;
      console.log("sliderRef definido:", node);
    } else {
      console.log("sliderRef ainda não disponível");
    }
  };
  useEffect(() => {
    if (sliderRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const mediaElement = entry.target;
          if (entry.isIntersecting && mediaElement.tagName === "VIDEO") {
            mediaElement.play();
          } else if (mediaElement.tagName === "VIDEO") {
            mediaElement.pause();
          }
        });
      }, { threshold: 0.7 });
  
      observer.observe(sliderRef.current);
      console.log("midiasSelecionadas renderizando:", midiasSelecionadas);
      return () => observer.disconnect();
    }
  }, [sliderRef, currentIndex]);

  // if (!midiasSelecionadas || midiasSelecionadas.length === 0) {
  //   return <p className="text-center">Nenhuma mídia selecionada.</p>;
  // }

  return (
    <div >
      {midiasSelecionadas && midiasSelecionadas.length > 0 ? (
  <div
    ref={setSliderRef}
    className={`flex ${
      isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
    }`}
    style={{
      transform: `translateX(-${currentIndex * 100}vw)`,
      width: `${midiasSelecionadas.length * 100}vw`,
    }}
    onTransitionEnd={() => {
      if (!isTransitioning) setIsTransitioning(true);
    }}
  >
    {midiasSelecionadas.map((midia, index) => (
      <div key={index} className="w-screen flex-shrink-0">
        {midia.tipo.startsWith("image") ? (
          <img className="w-full h-screen object-cover" src={`http://localhost:5000${midia.url}`} alt="Mídia" />
        ) : (
          <video className="w-full h-screen object-cover" src={`http://localhost:5000${midia.url}`} controls />
        )}
      </div>
    ))}
  </div>
) : (
<div className="flex items-center justify-center h-screen">
  <div className="bg-white p-8 rounded-lg shadow-xl text-center w-96">
    <p className="text-gray-700 mb-4">Nenhuma mídia selecionada.</p>
    <a
      href="/gerenciarmidias"
      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Selecionar Mídias ou Fazer Upload
    </a>
  </div>
</div>

)}

    </div>
  );
};

export default ApresentarMidias;
