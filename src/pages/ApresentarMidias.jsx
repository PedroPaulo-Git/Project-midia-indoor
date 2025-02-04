import React, { useState, useEffect, useRef } from "react";
import { useMidias } from "../Context/MidiasContext";
import axios from "axios";

const ApresentarMidias = () => {
  const { midiasSelecionadas, setMidiasSelecionadas } = useMidias();
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Controla se a transição (CSS) está ativada
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef(null);

  // Recupera as mídias do localStorage ao montar (se houver)
  useEffect(() => {
    const storedMidias = localStorage.getItem("midiasSelecionadas");
    if (storedMidias) {
      try {
        const parsedMidias = JSON.parse(storedMidias);
        if (parsedMidias.length > 0) {
          setMidiasSelecionadas(parsedMidias);
        }
      } catch (e) {
        console.error("Erro ao parsear as mídias do localStorage", e);
      }
    }
  }, [setMidiasSelecionadas]);

  // Atualiza o índice automaticamente a cada 3 segundos
  useEffect(() => {
    if (midiasSelecionadas && midiasSelecionadas.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [midiasSelecionadas]);

  // Caso necessário, você pode manter o fetch das mídias do servidor
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/midias");
        console.log("Mídias recebidas do servidor:", response.data.midias);
      } catch (err) {
        setError("Erro ao carregar as mídias.");
        console.error("Erro ao carregar as mídias:", err);
      }
    };
    fetchImages();
  }, []);

  // Cria um array de slides com a duplicata do primeiro slide (para loop infinito)
  const slides =
    midiasSelecionadas && midiasSelecionadas.length > 0
      ? [...midiasSelecionadas, midiasSelecionadas[0]]
      : [];

  // Handler do fim da transição
  const handleTransitionEnd = () => {
    // Se chegamos na duplicata (último slide), desabilite a transição e volte para o índice 0
    if (currentIndex === slides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(0);
      // Força o reflow para que a mudança de transição seja aplicada
      // Em seguida, reabilita a transição
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
    }
  };

  // Para fins de depuração e observer (opcional)
  const setSliderRef = (node) => {
    if (node) {
      sliderRef.current = node;
    }
  };

  // Exemplo de observer para vídeos (opcional)
  useEffect(() => {
    if (sliderRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const mediaElement = entry.target;
            if (entry.isIntersecting && mediaElement.tagName === "VIDEO") {
              mediaElement.play();
            } else if (mediaElement.tagName === "VIDEO") {
              mediaElement.pause();
            }
          });
        },
        { threshold: 0.7 }
      );
      observer.observe(sliderRef.current);
      return () => observer.disconnect();
    }
  }, [sliderRef, currentIndex, midiasSelecionadas]);

  return (
    <div className="overflow-hidden">
      {slides && slides.length > 0 ? (
        <div
          ref={setSliderRef}
          className={`flex ${transitionEnabled ? "transition-transform duration-1000 ease-in-out" : ""}`}
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            width: `${slides.length * 100}vw`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((midia, index) => (
            <div key={index} className="w-screen flex-shrink-0">
              {midia.tipo.startsWith("image") ? (
                <img
                  className="w-full h-screen object-cover"
                  src={`http://localhost:5000${midia.url}`}
                  alt="Mídia"
                />
              ) : (
                <video
                  className="w-full h-screen object-cover"
                  src={`http://localhost:5000${midia.url}`}
                  controls
                />
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
