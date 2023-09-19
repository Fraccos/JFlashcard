import React from 'react';
import Question from '../types/Question';
import Flashcard from '../types/Flashcard';
import FlashcardBox from './forms/FlashcardBox';
import { Quiz } from '../types/Quiz';
import CheckBoxForm from './forms/CheckBoxForm';
import { QStatusEnum } from './QStatusEnum';

interface QuestionBoxProps {
    question: Question
    id:number
    showSolution: boolean
    handleQStatusUpdate: (newStatus:QStatusEnum, index:number)=> void;

}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question,id, showSolution, handleQStatusUpdate }) => {
    if ( question instanceof Flashcard ) {
        return (
            <>
                <FlashcardBox
                    flashcard={question}
                    id={id} 
                    showSolution={showSolution}
                    handleQStatusUpdate={handleQStatusUpdate}
                />    
            </>
        );
    }
    else if ( question instanceof Quiz ) {
        return (
            <>
                <CheckBoxForm
                    quiz={question}
                    id={id} 
                    showSolution={showSolution}
                    handleQStatusUpdate={handleQStatusUpdate}
                />    
            </>
        );
    }
    return (<></>)
};

export default QuestionBox;
