import './App.css'
import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src": "/img/dog.jpg", matched: false},
  {"src": "/img/gato.jpg", matched: false},
  {"src": "/img/coala.jpg", matched: false},
  {"src": "/img/preguica.jpg", matched: false},
  {"src": "/img/uni.jpg", matched: false},
  {"src": "/img/panda.jpg", matched: false},
  {"src": "/img/cow.jpg", matched: false},
  {"src": "/img/moon.jpg", matched: false},
  {"src": "/img/friends.jpg", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)    
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map( card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a new game automagically
  useEffect(() => {
     shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memória Pet</h1>
      <button onClick={shuffleCards}>Novo Jogo</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}  
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <hr></hr>
      <p>Tentativas: <b>{turns}</b></p>

    </div>
  );
}

export default App