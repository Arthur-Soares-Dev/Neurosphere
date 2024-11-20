import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const mazeSize = 5; // Tamanho do labirinto (5x5)

// Função para gerar o labirinto com chegada e obstáculos
const generateMaze = (size) => {
    const maze = Array(size).fill(null).map(() => Array(size).fill(''));
    return maze;
};

// Função para verificar se a posição é válida (dentro dos limites)
const isInBounds = (x, y) => x >= 0 && x < mazeSize && y >= 0 && y < mazeSize;

// Função para verificar se há um caminho do jogador até a chegada
const hasPathToFinish = (maze, playerPosition, finishPosition, obstacles) => {
    const visited = Array(mazeSize).fill(null).map(() => Array(mazeSize).fill(false));

    const queue = [playerPosition];

    const directions = [
        { x: 1, y: 0 },  // down
        { x: -1, y: 0 }, // up
        { x: 0, y: 1 },  // right
        { x: 0, y: -1 }  // left
    ];

    while (queue.length > 0) {
        const { x, y } = queue.shift();

        if (x === finishPosition.x && y === finishPosition.y) {
            return true; // Encontrou um caminho até a chegada
        }

        for (const { x: dx, y: dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isInBounds(newX, newY) && !visited[newX][newY] && !obstacles.some(ob => ob.x === newX && ob.y === newY)) {
                visited[newX][newY] = true;
                queue.push({ x: newX, y: newY });
            }
        }
    }

    return false; // Não encontrou caminho
};

const SensoryMaze = () => {
    const [maze, setMaze] = useState(generateMaze(mazeSize));
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [finish, setFinish] = useState({ x: 0, y: 0 });
    const [obstacles, setObstacles] = useState([]);

    // Função para gerar a posição de chegada e obstáculos
    const generateFinishAndObstacles = () => {
        let newFinish = {
            x: Math.floor(Math.random() * mazeSize),
            y: Math.floor(Math.random() * mazeSize),
        };

        // Gera obstáculos aleatórios, garantindo um caminho
        let newObstacles = [];
        let obstacleCount = 5; // Número de obstáculos que queremos adicionar

        while (newObstacles.length < obstacleCount) {
            const newObstacle = {
                x: Math.floor(Math.random() * mazeSize),
                y: Math.floor(Math.random() * mazeSize),
            };

            // Certifica-se de que o obstáculo não está na mesma posição da chegada ou do jogador
            if (
                (newObstacle.x !== playerPosition.x || newObstacle.y !== playerPosition.y) &&
                (newObstacle.x !== newFinish.x || newObstacle.y !== newFinish.y) &&
                !newObstacles.some(ob => ob.x === newObstacle.x && ob.y === newObstacle.y) // Evita duplicados
            ) {
                newObstacles.push(newObstacle);
            }
        }

        // Garante que haja um caminho do jogador até a chegada
        if (!hasPathToFinish(maze, playerPosition, newFinish, newObstacles)) {
            newFinish = { x: Math.floor(Math.random() * mazeSize), y: Math.floor(Math.random() * mazeSize) }; // Regerar a chegada
        }

        setFinish(newFinish);
        setObstacles(newObstacles);
    };

    // Gera a posição de chegada e obstáculos quando o componente é montado
    useEffect(() => {
        generateFinishAndObstacles();
    }, []);

    // Função para checar se o jogador chegou ao final
    const checkFinish = (newX, newY) => {
        if (newX === finish.x && newY === finish.y) {
            Alert.alert("Parabéns!", "Você chegou ao final do labirinto!");
            resetGame();
        }
    };

    // Função para mover o jogador no labirinto
    const movePlayer = (direction) => {
        let newX = playerPosition.x;
        let newY = playerPosition.y;

        if (direction === 'up' && newX > 0) newX--;
        if (direction === 'down' && newX < mazeSize - 1) newX++;
        if (direction === 'left' && newY > 0) newY--;
        if (direction === 'right' && newY < mazeSize - 1) newY++;

        // Verifica se a nova posição é um obstáculo
        const isObstacle = obstacles.some(ob => ob.x === newX && ob.y === newY);
        if (isObstacle) {
            return; // Não movemos o jogador se for um obstáculo
        }

        setPlayerPosition({ x: newX, y: newY });
        checkFinish(newX, newY);
    };

    // Reinicia o jogo
    const resetGame = () => {
        setPlayerPosition({ x: 0, y: 0 });
        generateFinishAndObstacles();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Labirinto Sensorial</Text>
            <Text style={styles.instruction}>Use os botões para mover o jogador (🟢) até o objetivo (🏁). Cuidado com os obstáculos (🚧)!</Text>

            <View style={styles.mazeContainer}>
                {maze.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <View key={colIndex} style={styles.cell}>
                                <Text style={styles.cellText}>
                                    {playerPosition.x === rowIndex && playerPosition.y === colIndex
                                        ? '🟢'
                                        : finish.x === rowIndex && finish.y === colIndex
                                            ? '🏁'
                                            : obstacles.some(ob => ob.x === rowIndex && ob.y === colIndex)
                                                ? '🚧'
                                                : ''}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={() => movePlayer('up')} style={styles.controlButton}>
                    <Text style={styles.controlText}>↑</Text>
                </TouchableOpacity>

                <View style={styles.horizontalControls}>
                    <TouchableOpacity onPress={() => movePlayer('left')} style={styles.controlButton}>
                        <Text style={styles.controlText}>←</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => movePlayer('down')} style={styles.controlButton}>
                        <Text style={styles.controlText}>↓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => movePlayer('right')} style={styles.controlButton}>
                        <Text style={styles.controlText}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetText}>Reiniciar Jogo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instruction: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    mazeContainer: {
        borderWidth: 2,
        borderColor: '#000',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 20,
    },
    controlsContainer: {
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: '#007bff',
        padding: 20,
        margin: 5,
        borderRadius: 5,
    },
    controlText: {
        fontSize: 20,
        color: '#fff',
    },
    horizontalControls: {
        flexDirection: 'row',
    },
    resetButton: {
        marginTop: 20,
        backgroundColor: '#ff5722',
        padding: 10,
        borderRadius: 5,
    },
    resetText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SensoryMaze;
