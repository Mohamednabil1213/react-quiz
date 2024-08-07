import React, { useState } from 'react';
import QuestionsCard from './components/QuestionsCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import { GlobalStyle , Wrapper } from './App.styles';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNamber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  const API = async () => {
    setLoading(true);
    setGameOver(false);
    setUserAnswers([])
    const newQuestion = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.MEDIUM);
    setQuestions(newQuestion);
    setScore(0);
    setNamber(0);
    setLoading(false);
  }
  const checkAns = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {

      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject])

    }

  }
  const nextQus = () => {
    const next = number + 1;

    if (next === TOTAL_QUESTION) {
      setGameOver(true);

    } else {
      setNamber(next);
    }

  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTION ? (<button className='start' onClick={API}>
          Start
        </button>) : null}

        {!gameOver ? <p className='score'>Score: {score} / {TOTAL_QUESTION}</p> : null}
        {loading ? <p>Loading Qestions....</p> : null}
        {!loading && !gameOver ? <QuestionsCard
          questionN={number + 1}
          totalQuestions={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAns}
        /> : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
          <button className='next' onClick={nextQus}>Next Qestion</button>
        ) : null}
      </Wrapper>

    </>
  );
}

export default App;
