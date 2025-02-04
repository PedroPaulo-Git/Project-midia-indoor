import React from "react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto shadow-lg w-4/5 items-center flex flex-col py-10 space-y-5">
       <span className="flex flex-col items-center justify-center align-center">
       <h1 className="font-semibold text-3xl mb-2">Dashboard</h1>
        <p>Bem-vindo ao gerenciador de mídia indoor!</p>
       
       </span>
       
        <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
          <a  href="/midias" className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
          Apresentar midias
          </a>

          <a  href="/gerenciarmidias" className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
          Gerenciar midias
          </a>

          <a href="/upload" className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
          Fazer upload
          </a>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
