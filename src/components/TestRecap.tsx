import React from 'react';
import { QStatusEnum } from './QStatusEnum';
import Question from '../types/Question';
import { Button, Link, Stack, Typography } from '@mui/material';
import { QuestionRandomizer } from '../utils/QuestionRandomizer';
import { useNavigate } from 'react-router-dom';

interface TestRacapProps {
    questionPool: Question[],
    statusPool: QStatusEnum[],
    startNewTest: (questions: Question[])=>void
}



const TestRacap: React.FC<TestRacapProps> = ({ questionPool, statusPool, startNewTest }) => {
    const countersMap = new Map<string, Map<QStatusEnum, number>>();
    const reviewQPool:Question[] = [];
    const navigate = useNavigate();
  
    questionPool.forEach( (question,index) => {
        const origin = question.getOriginSet();
        if (countersMap.get(origin) === undefined) {
            const newMap = new Map();
            [QStatusEnum.CORRECT, QStatusEnum.INCORRECT, QStatusEnum.PARTIALLY_CORRECT, QStatusEnum.UNDONE].forEach
            (status => newMap.set(status, 0))
            countersMap.set(origin, newMap); 
        }
        const map = countersMap.get(origin);
        if (map !== undefined) {
            const status = statusPool[index];
            let counter = map.get(status);
            if (counter !== undefined) {
                counter++;
                map.set(status,counter); 
            }  
            if (status !== QStatusEnum.CORRECT) {
                reviewQPool.push(question)
            } 
        }

    })
    const countersArray = Array.from(countersMap);
    countersArray.sort( (oldEl, newEl) => {
        const oldCorrect = oldEl[1].get(QStatusEnum.CORRECT);
        const newCorrect = newEl[1].get(QStatusEnum.CORRECT);
        if (oldCorrect === undefined || newCorrect === undefined) {
            return -1;
        }
        return newCorrect - oldCorrect;
    })
    
    const genReviewTest = () => {
        QuestionRandomizer.qShuffle(reviewQPool);
        startNewTest(reviewQPool);

    }

    const goBackHomepage = () => {
        navigate("/")
    }
    return (
        <>
            <Typography variant='h2'>
                Recap
            </Typography>

            <Typography component='p'>
                <br></br>
                The results are ordered by the correct answers given as:
                <p>
                    <Typography component='span' color="success.main" marginLeft={"5px"} marginRight={"5px"}>
                        Correct Answers 
                    </Typography>
                    /
                    <Typography component='span' color="warning.main"  marginLeft={"5px"} marginRight={"5px"}>
                        Partially Correct Answers   
                    </Typography>
                    /
                    <Typography component='span' color="error"  marginLeft={"5px"} marginRight={"5px"}>
                        Wrong Answers   
                    </Typography>
                    /
                    <Typography component='span' color="info.main"  marginLeft={"5px"} >
                        No Answers Given    
                    </Typography>
                </p>
            </Typography>

            {countersArray.map(([key, statusMap]) => {
                const styled = {marginLeft: "5px", marginRight: "5px"};
                return (
                    <p 
                    key={key}>
                        <strong>{key}</strong> 
                        
                        <Typography component='span' color="success.main" style={styled}>
                         {statusMap.get(QStatusEnum.CORRECT)}
                        </Typography>
                        /
                        <Typography component='span' color="warning.main" style={styled}>
                            {statusMap.get(QStatusEnum.PARTIALLY_CORRECT)}
                        </Typography>
                        /
                        <Typography component='span' color="error" style={styled}>
                            {statusMap.get(QStatusEnum.INCORRECT)}
                        </Typography>
                        /
                        <Typography component='span' color="info.main" style={styled}>
                            {statusMap.get(QStatusEnum.UNDONE)}
                        </Typography>
                    </p>
                )
            })}
            <Stack direction="row" justifyContent="center" spacing={3} style={{marginTop: '20px'}} >
                {reviewQPool.length > 0 ? 
                    <>
                    <Stack direction="column">
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={() => genReviewTest()}
                        >Review the Uncorrect Answer</Button>
                        <Button 
                                style={{marginTop: "20px"}}
                                variant="contained"
                                color="info"
                                onClick={() => goBackHomepage()}
                            >Go back to the homepage</Button>
                        </Stack>
                    </>
                :
                <>
                    <Stack direction="column">
                        <Typography component='h4' >
                            <strong>Congratulations</strong> , you answered all the questions correctly
                        </Typography> 
                        
                        <Button 
                            style={{marginTop: "20px"}}
                            variant="contained"
                            color="success"
                            onClick={() => goBackHomepage()}
                        >Go Back to The Quiz Generator</Button>
                        
                    </Stack>
                    </>
                }
                
            </Stack>
        </>
    );
};

export default TestRacap;
