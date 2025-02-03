import { WebSocketServer } from "ws";
import WebSocket from "ws";
class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.wss = null;
    this.currentMedias = [];
  }

  // Inicializa o WebSocket
  initialize(server) {
    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws, req) => {
      console.log("Novo cliente conectado");
      this.clients.add(ws);

      // Envia o estado atual para o cliente recém-conectado
      ws.send(
        JSON.stringify({ type: "UPDATE_MEDIAS", medias: this.currentMedias })
      );

      ws.on("close", () => {
        console.log("Cliente desconectado");
        this.clients.delete(ws);
      });

      ws.on("error", (error) => {
        console.error("Erro no WebSocket:", error);
      });
    });
  }

  // Envia mensagens para todos os clientes
  broadcast(message) {
    if (!this.clients.size) return;

    const data = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  broadcastMedias(medias) {
    // Atualiza o estado atual
    this.currentMedias = medias;
    this.broadcast({ type: 'UPDATE_MEDIAS', medias });
  }
}

export default new WebSocketService();
