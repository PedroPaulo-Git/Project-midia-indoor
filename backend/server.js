import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import websocketService from "./services/websocketService.js";
// Importação das rotas
import uploadRoutes from "./routes/uploadImagesRoutes.js";
import loadImagesRoutes from "./routes/loadImagesRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import websocketRoutes from "./routes/websocketRoutes.js";

// Configuração do __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicialização do Express
const app = express();
const port = 5000;

// Servidor HTTP
const server = http.createServer(app);

// Inicializa o WebSocket
websocketService.initialize(server);


// Middlewares
app.use(express.json()); // Para parsing de JSON
app.use(cors()); // Para permitir requisições de diferentes origens

// Servir arquivos estáticos (imagens enviadas)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/upload", uploadRoutes); // Rotas para upload de imagens
app.use("/gerenciarmidias", albumRoutes); // Rotas para gerenciamento de álbuns/mídias
app.use("/websocket", websocketRoutes); // Rotas para WebSocket
app.use("/", loadImagesRoutes); // Rotas para carregar imagens


// Inicialização do servidor
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});