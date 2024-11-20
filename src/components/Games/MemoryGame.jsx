import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MemoryGame = () => {
    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    // Função para gerar cartas embaralhadas
    function generateCards() {
        const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉'];
        const deck = [...symbols, ...symbols]; // Duplicar o array para criar pares
        return shuffle(deck.map((symbol, index) => ({ id: index, symbol, isFlipped: false })));
    }

    // Função para embaralhar as cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Função para virar uma carta
    const flipCard = (index) => {
        if (flippedCards.length < 2 && !cards[index].isFlipped && !matchedCards.includes(index)) {
            const newFlippedCards = [...flippedCards, index];
            const updatedCards = cards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card));
            setCards(updatedCards);
            setFlippedCards(newFlippedCards);
        }
    };

    // Verifica se as duas cartas viradas são iguais
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (cards[firstCard].symbol === cards[secondCard].symbol) {
                setMatchedCards([...matchedCards, firstCard, secondCard]);
            } else {
                setTimeout(() => {
                    const updatedCards = cards.map((card, i) =>
                        flippedCards.includes(i) ? { ...card, isFlipped: false } : card
                    );
                    setCards(updatedCards);
                }, 1000);
            }
            setFlippedCards([]);
        }
    }, [flippedCards, cards, matchedCards]);

    // Função para reiniciar o jogo
    const resetGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setMatchedCards([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo da Memória</Text>
            <View style={styles.board}>
                {cards.map((card, index) => (
                    <TouchableOpacity
                        key={card.id}
                        style={styles.card}
                        onPress={() => flipCard(index)}
                        disabled={card.isFlipped || matchedCards.includes(index)}
                    >
                        <Text style={styles.cardText}>
                            {card.isFlipped || matchedCards.includes(index) ? card.symbol : '?'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button title="Novo Jogo" onPress={resetGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: '#4CAF50',
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 32,
        color: '#fff',
    },
});

export default MemoryGame;
