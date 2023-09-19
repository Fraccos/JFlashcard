import React, { useState } from 'react';
import './App.css';
import { Quiz } from './types/Quiz';
import { Answer } from './types/Answer';
import CheckBoxForm from './components/forms/CheckBoxForm';
import { Box, Container, Hidden, List, ListItemText } from '@mui/material';
import Flashcard from './types/Flashcard';
import FlashcardBox from './components/forms/FlashcardBox';
import Question from './types/Question';
import QuestionManager from './components/QuestionManager';
import QuestionPicker from './components/QuestionPicker';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { QStatusEnum } from './components/QStatusEnum';
import TestRacap from './components/TestRecap';
import { basename } from 'path';
import { baseDir } from '.';


type shortcutInfo = {
  key: string,
  desc: string
}



function App() {
  const [questionPool, setQuestionPool] = useState<Question[]>([]);
  const [resQStatus, setResQStatus] = useState<QStatusEnum[]>([]);
  const navigate = useNavigate();
  
  const startNewTest = (newQPool: Question[]) => {
    setQuestionPool(newQPool);
    navigate("/test");
  }

  const endTest = ( statusPool: QStatusEnum[] ) => {
    setResQStatus(statusPool);
    navigate("/recap");
  }

  const shortcut:shortcutInfo[] = [
    {
      key: "J",
      desc: "Flashcard precedente"
    },
    {
      key: "K",
      desc: "Flashcard successiva"
    },
    {
      key: "L",
      desc: "Mostra soluzioni"
    },
    {
      key: "T",
      desc: "Termina Test"
    },
    {
      key: "U",
      desc: "Risposta Errata"
    },
    {
      key: "I",
      desc: "Risposta Parzialmente Corretta"
    },
    {
      key: "O",
      desc: "Risposta Corretta"
    },
  ]
  return (
    <div className="App">
      <Container style={{marginTop:"10px"}}>
        <Routes>
          <Route path="/" element={<>
                <QuestionPicker 
                    startNewTest={startNewTest}
                ></QuestionPicker>
              </>}>
            </Route>
            <Route path="/test/" element={
              <>
                <QuestionManager
                    handleEndTest={endTest}
                    questionPool={questionPool}
                />
                <Hidden smDown>
                  <Container style={{marginTop:"20px"}}>
                      <h4>Lista Shortcut</h4>
                      <List>
                        {shortcut.map( s => 
                          <ListItemText
                            key={s.key}
                            primary={<p><strong>{s.key}</strong>: {s.desc}</p>}
                          />
                          
                        )}
                      </List>

                  </Container>
                </Hidden>
            </>
              }></Route>
            <Route path="/recap" element={
              <TestRacap
                statusPool={resQStatus}
                questionPool={questionPool}
                startNewTest={startNewTest}
              />}>
            </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
