const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes'); // Importa as rotas de tarefas

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'sua_chave_secreta', // Use uma chave secreta única
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mude para true se estiver usando HTTPS
}));

app.use(express.json());
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/tasks', tasksRoutes); // Rotas de tarefas

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});