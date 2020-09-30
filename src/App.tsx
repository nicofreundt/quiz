import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { Button, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
//Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty } from './API';
// Styles
import './App.scss';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.HARD
		);

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// users answer
			const answer = e.currentTarget.value;
			// Check answer
			const correct = questions[number].correct_answer === answer;
			// Add score if correct equals true
			if (correct) setScore(prev => prev + 1);
			// Save
			const AnswerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			if (correct) {
				e.currentTarget.style.backgroundColor = 'green';
			} else {
				e.currentTarget.style.backgroundColor = 'red';
			};
			setUserAnswers(prev => [...prev, AnswerObject])
		}
	}

	const nextQuestion = () => {
		// Move to next question
		const nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	}

	const darkTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#b8dbd9',
            },
            secondary: {
                main: '#b8dbd9',
            },
            type: 'dark',
        },
    });

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<Typography variant="h1" gutterBottom>IT-Quiz</Typography>
				{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
					<Button className="start" onClick={startTrivia}>
						Start
          			</Button>
				) : null}
				{!gameOver ? <p className="score">Score: {score}</p> : null}
				{loading && <p>Loading Questions ...</p>}
				{!loading && !gameOver && (
					<QuestionCard
						questionNr={number + 1}
						totalQuestions={TOTAL_QUESTIONS}
						question={questions[number].question}
						answer={questions[number].answers}
						userAnswer={userAnswers ? userAnswers[number] : undefined}
						callback={checkAnswer}
					/>
				)}
				{!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
					<Button className="next" onClick={nextQuestion}>
						Next Question
          			</Button>
				) : null}

			</div>
		</ThemeProvider>
	);
}

export default App;
