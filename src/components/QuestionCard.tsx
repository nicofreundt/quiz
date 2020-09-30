import React from 'react';
import { AnswerObject } from '../App';
import { Button } from '@material-ui/core';
import './QuestionCardStyle.scss';

type Props = {
    question: string;
    answer: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const style1 = {
    color: '#000',
    backgroundColor: '#00FF00',
}
const style2 = {
    color: '#000',
    backgroundColor: '#FF0000',
}

const QuestionCard: React.FC<Props> = ({ question, answer, callback, userAnswer, questionNr, totalQuestions}) => (
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}>
        </p>
        <div>
            {answer.map(answer => (
                <div key={answer}>
                    {userAnswer!=null && (userAnswer.answer === answer || userAnswer.correctAnswer === answer)? (
                        <Button className="answer" style={userAnswer.answer === userAnswer.correctAnswer || userAnswer.correctAnswer === answer ? style1 : style2} disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}} />
                        </Button>) 
                        : (
                        <Button className="answer" disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}} />
                        </Button>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;