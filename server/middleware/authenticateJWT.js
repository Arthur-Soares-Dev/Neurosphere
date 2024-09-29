const authenticateJWT = (req, res, next) => {
    if (req.session.user) {
        next(); // Usuário autenticado, prosseguir
    } else {
        res.status(401).json({ error: 'Acesso não autorizado' }); // Usuário não autenticado
    }
};

module.exports = authenticateJWT;
