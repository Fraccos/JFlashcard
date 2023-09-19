import React, { ChangeEvent, useState } from "react";
import { Button, Radio, Stack } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from "@mui/material";
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Quiz } from "../../types/Quiz";
import { QStatusEnum } from "../QStatusEnum";

interface CheckBoxFormProps {
  id:number,
  quiz: Quiz,
  showSolution: boolean,
  handleQStatusUpdate: (newStatus:QStatusEnum, index:number)=> void;
}
type colorCheckbox = "warning" | "success" | "info" | "error" | "default" | "primary" | "secondary"

const CheckBoxForm: React.FC<CheckBoxFormProps> = ({id, quiz, showSolution, handleQStatusUpdate}) => {
  const [checkedAnswers, setCheckedAnswers] = useState<Boolean[]>(
    Array(quiz.getAnswers().length).fill(false)
  )
  const toggleCheckedAnswer = (index: number) => {
    if (!showSolution) {
      checkedAnswers[index] = !checkedAnswers[index]
      setCheckedAnswers([...checkedAnswers])
      const counterAnswersType = countAnswersType();
      const correctCounter = counterAnswersType[0];
      const wrongCounter = counterAnswersType[1];
      const allCorrectAnswers = countAllCorrectAnswers();
      
      if (wrongCounter > 0 && correctCounter > 0){
        handleQStatusUpdate(QStatusEnum.PARTIALLY_CORRECT, id);
        return false;
      }
      else if (correctCounter === allCorrectAnswers) {
        handleQStatusUpdate(QStatusEnum.CORRECT, id);  
      }
      else {
        handleQStatusUpdate(QStatusEnum.INCORRECT, id);
      }
    }
  };

  const countAnswersType = () => {
    let correctCounter = 0;
    let wrongCounter = 0;
    checkedAnswers.forEach( (checked,index) => {
      if (checked) {
        if (quiz.getAnswers()[index].isCorrect()) {
          correctCounter++;
        }
        else {
          wrongCounter++;
        }
      }
    }) 
    return [correctCounter, wrongCounter];
  } 

  const countAllCorrectAnswers = () => {
    let counter = 0;
    quiz.getAnswers().forEach( (answer,index) => {
      if (answer.isCorrect()) {
        counter++;
      }
    }) 
    return counter;
  }



  return (
    <>
      <Alert severity="warning" variant="outlined">
        Seleziona <strong>tutte</strong> le risposte giuste
      </Alert>
      <Box sx={{ p: 2 }}>
        <Typography component="h6">
          <strong>[{id}]</strong> {quiz.getQuestionText()}
        </Typography>
        <FormGroup sx={{ p: 1 }}>
          {quiz != null &&
            quiz.getAnswers().map((answer, index) => {
              let colorValue: { color?: colorCheckbox } = {};
              const isCorrect = answer.isCorrect();
              const checked = checkedAnswers[index];
              if (showSolution === true) {
                colorValue.color = isCorrect ? "success" : "error";
              }
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      value={index}
                      {...colorValue}
                      onChange={(e)=>toggleCheckedAnswer(index)}
                      checked={
                        checked === true ||
                        (showSolution === true && isCorrect === true)
                      }
                    />
                  }
                  label={answer.getContent()}
                />
              );
            })}
        </FormGroup>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            > 
              <Stack direction="column" justifyContent="center" spacing={3}>
                <Stack direction="row" spacing={3}>
                  {showSolution && <Button color="warning" variant="outlined" >Corrette: {countAnswersType()[0]}/{countAllCorrectAnswers()} </Button> }
                </Stack>
                </Stack>
            </Box>
      </Box>
    </>
  );
};

export default CheckBoxForm;