import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const ApresentarMidias = () => {
  const [midias, setMidias] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === images.length - 1) {
        // Desativa a transição e volta para o primeiro slide
        setIsTransitioning(false);
        setCurrentIndex(0);
      } else {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);


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
  useEffect(() => {
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

    const mediaElements = sliderRef.current.querySelectorAll("img, video");
    mediaElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentIndex]);
  return (
    <div>
     
     <div className="relative w-screen h-screen overflow-hidden">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div
        ref={sliderRef}
        className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`,
          width: `${images.length * 100}vw`,
        }}
        onTransitionEnd={() => {
          // Após o "salto", reativa a transição para o próximo ciclo
          if (!isTransitioning) setIsTransitioning(true);
        }}
      >
           {images.map((midia, index) => (
          <div key={index} className="w-screen flex-shrink-0">
            {midia.tipo.startsWith("image") ? (
              <img
                src={`http://localhost:5000${midia.url}`}
                alt={midia.nomeArquivo}
                className="w-full h-screen object-cover"
                loading="lazy"
              />
            ) : (
              <video
                src={`http://localhost:5000${midia.url}`}
                className="w-full h-screen object-cover"
                muted
                playsInline
                loop
              />
            )}
          </div>
        ))}
        </div>
        <span className="flex gap-4">
      <h1>Gerenciamento de Mídias</h1>
      <a
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        href="/upload"
      >
        {" "}
        fazer upload de midia
      </a>
      </span>
   
      </div>

    </div>
  );
};

export default ApresentarMidias;
