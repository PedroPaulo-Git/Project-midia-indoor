import express from "express";
import websocketService from "../services/websocketService.js";

const router = express.Router();

// Rota para atualizar as mídias via WebSocket
router.post("/update-medias", (req, res) => {
    const { medias } = req.body;

    if (!medias || !Array.isArray(medias)) {
        return res.status(400).json({ success: false, message: "Mídias inválidas" });
    }

    // Envia as mídias atualizadas para todos os clientes conectados
    websocketService.broadcast(medias);

    res.json({ success: true, message: "Mídias atualizadas com sucesso!" });
});

export default router;