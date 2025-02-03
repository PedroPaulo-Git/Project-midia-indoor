// Middleware de autenticação para WebSocket (exemplo)
export const authenticateWebSocket = (ws, req, next) => {
    const token = req.headers['sec-websocket-protocol']; // Exemplo de token
    if (!token) {
        ws.close(1008, 'Token não fornecido'); // Fecha a conexão
        return;
    }

    // Verifica o token (exemplo simples)
    if (token !== "meu-token-secreto") {
        ws.close(1008, 'Token inválido'); // Fecha a conexão
        return;
    }

    next(); // Prossegue com a conexão
};