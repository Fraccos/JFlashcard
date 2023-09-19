import React, { useEffect, useState } from 'react';
import Question from '../types/Question';
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Flashcard from '../types/Flashcard';
import { QuestionRandomizer } from '../utils/QuestionRandomizer';
import { json } from 'stream/consumers';
import { baseDir } from '..';

interface QuestionPickerProps {
    startNewTest: (questions: Question[])=>void,
}

type QuestionFile = {
    name: string,
    file: string,
    type: string
}

type QuizFile = {
    title: string,
    questions: QuestionFile[]
}



const QuestionPicker: React.FC<QuestionPickerProps> = ({ startNewTest }) => {
    const [jsonList, setJsonList] = useState<QuestionFile[]>([]);
    const [checkedFile, setCheckedFile] = useState<boolean[]>([]);
    const [quizList, setQuizList] = useState<QuizFile[]>([]);
    const [qPoolSize, setQPoolSize] = useState<number>(30);
    const [currentQuiz, setCurrentQuiz] = useState<QuizFile>();
    const [allCheckedFile, setAllCheckedFile] = useState<boolean>(false);
    const [error, setError] = useState<JSX.Element>();

    useEffect(()=>{
        fetch(baseDir + "/quiz.json").then(res => res.json()).then(json => {
            const quizFiles: QuizFile[] = json
            setQuizList(quizFiles)
            const recentQuizTopic = localStorage.getItem("recentQuizTopic");
            if (recentQuizTopic) {
                const recentQuizFile = quizFiles.find(el => el.title === recentQuizTopic)
                if (recentQuizFile) {
                    setCurrentQuiz(recentQuizFile)
                }
                
            }
        })
        .catch(()=> setError(<>No <i>quiz.json</i> file found or not valid, please insert one compliant to the docs, then reload the page</>));
    }, [])

    useEffect(()=>{
        if (currentQuiz) {
            setJsonList(currentQuiz.questions);
            setCheckedFile(currentQuiz.questions.map(()=>false))
            localStorage.setItem("recentQuizTopic", currentQuiz.title)
            if (currentQuiz.questions.length === 0) {
                setError(<>The quiz <strong>{currentQuiz.title}</strong> has no questions</>);
            }
            else {
                setError(undefined)
            }
        }
    }, [currentQuiz])

    const toggleCheckedFile = (index:number) => {
        checkedFile[index] = !checkedFile[index];
        setCheckedFile([...checkedFile]);
    }
    
    const toggleAllCheckedFile = () => {
        setCheckedFile(
            checkedFile.fill(!allCheckedFile)
        );
        setAllCheckedFile(!allCheckedFile);
    }

    const genQuestions = () => {
        const selecFiles:QuestionFile[] = [] 
        checkedFile.forEach(
            (el,index) => {
                if (el) {
                    selecFiles.push(
                        jsonList[index]
                    );
                }
            }
        )
        sendHttpRequests(selecFiles);
    }


    const validateGenForm = () => {
        for (const boolFile of checkedFile) {
            if (boolFile) {
                return true;
            }
        }
        return false;
    }
    const isGenButtonDisabled = !validateGenForm();

    const genTest = (questionMap: Map<string, Question[]>) => {
        const qRandomizer = new QuestionRandomizer(questionMap);
        const testQuestion : Question[] = qRandomizer.genByPoolSize(qPoolSize);
        startNewTest(testQuestion)
    }
    const sendHttpRequests = async (questionFiles:QuestionFile[]) => {
        const baseUrl = baseDir + "/json/";
        const questionMap = new Map<string, Question[]>
        try {
          const responses = await Promise.all(questionFiles.map(qEl => fetch(baseUrl + qEl.file)));
          const data = await Promise.all(responses.map(response => response.json()));
          questionFiles.forEach( (qFile, index) => {
            const res = data[index];
            const cardsArray = res.cards;
            const mapKey = qFile.name;
            const questions:Question[] = [];
            res.cards.forEach(
                (cards:any) => {
                    const key:string = Object.keys(cards)[0];
                    const rawQArray =  cards[key];
                    rawQArray.forEach( (rawQ:any) => {
                        const flashcard = new Flashcard(rawQ.question, rawQ.answer, mapKey);
                        flashcard.setPageOrigin(key);
                        questions.push(
                            flashcard
                        )
                    })
                }
            )
            questionMap.set(mapKey, questions)
          } )
        console.log(questionMap);
          console.log('Responses:', data);
          // Process the responses or update the state as needed
        } finally  {
          genTest( questionMap);
          
        }
        
      };

    return (
        <>
            <FormGroup>
            <Typography variant="h5" component="h5" sx={{marginTop:"5px", marginBottom:"10px"}}>
                Choose the topic of the Quiz
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="select-quiz">Topic of the Quiz</InputLabel>
                    <Select
                        labelId="select-quiz"
                        id="demo-simple-select"
                        onChange={(e)=>setCurrentQuiz(quizList.find( el => el.title === e.target.value))}
                        label="Quiz Argument"
                        value={currentQuiz ? currentQuiz.title: ""}
                    >
                        {quizList.map((el =>  <MenuItem key={el.title}value={el.title}>{el.title}</MenuItem>))}
                    </Select>
                    </FormControl>
                {error && <Box sx={{margin: "10px 0 10px 0"}}><Alert severity="error">{error}</Alert></Box>}
                {jsonList.length > 0 && <>
                    <Typography variant="h6" component="h6" marginTop={"10px"}>
                        Choose sub argument of the quiz
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allCheckedFile}
                                onChange={()=>toggleAllCheckedFile()}
                            />
                            }
                        
                        label={
                            <span><strong>{allCheckedFile ? "Unselect": "Select" }</strong> all the files</span>
                                
                        }></FormControlLabel>
                        {jsonList.map( (el,index) => 
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        value={index}
                                        checked={checkedFile[index]}
                                        onChange={()=>toggleCheckedFile(index) }
                                    />
                                    }
                                
                                label={el.name}></FormControlLabel>
                        )}
                        
                    </>}
                    </FormGroup>
            <FormGroup>
               {jsonList.length > 0 && <>
                <Typography variant="h5" component="h5">
                    Generation options
                </Typography>
                <FormControlLabel
                    control={
                        <TextField
                            type="number"
                            label="Numer of Questions"
                            value={qPoolSize}
                            onChange={(e)=>setQPoolSize(parseInt(e.target.value))}
                            variant="outlined"
                            margin="normal"
                        />
                        }
                    
                    label={
                        <span>Numer of Questions</span>
                            
                    }></FormControlLabel>
               </>}
            
            <Button 
                variant="outlined"
                color="success" 
                sx={{marginTop: "10px"}}
                disabled={isGenButtonDisabled}
                onClick={()=>genQuestions()}
            >Generate Quiz</Button> 
            </FormGroup>

        </>
    );
};

export default QuestionPicker;
