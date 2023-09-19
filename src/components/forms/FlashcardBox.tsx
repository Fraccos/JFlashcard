import React, { useState } from "react"
import Flashcard from "../../types/Flashcard"
import { Alert, Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import { QStatusEnum } from "../QStatusEnum";
import { ShortcutManager } from "../../utils/ShortcutManager";
import { KeyboardShortcut } from "../../utils/KeyboardShortcut";

interface FlashcardBox {
    id:number,
    flashcard: Flashcard,
    showSolution: boolean,
    handleQStatusUpdate: (newStatus:QStatusEnum, index:number)=> void;
  }

const FlashcardBox: React.FC<FlashcardBox> = (props) => {
    const showSolution = props.showSolution;
    const handleQStatusUpdate = props.handleQStatusUpdate;

    const _setIncorrect = ()=>handleQStatusUpdate(QStatusEnum.INCORRECT,props.id);
    const _setCorrect = ()=>handleQStatusUpdate(QStatusEnum.CORRECT,props.id);
    const _setPartialCorrect = ()=>handleQStatusUpdate(QStatusEnum.PARTIALLY_CORRECT,props.id);



    const shortcutManager = new ShortcutManager();
    shortcutManager.registerNewHook(new KeyboardShortcut("u", false, false, _setIncorrect));
    shortcutManager.registerNewHook(new KeyboardShortcut("i", false, false, _setPartialCorrect));
    shortcutManager.registerNewHook(new KeyboardShortcut("o", false, false, _setCorrect));


    return ( 
    <div tabIndex={-10}  onKeyUp={(e: React.KeyboardEvent<HTMLImageElement>) => {shortcutManager.callbackHook(e)}}>
      <Alert severity="warning" variant="outlined">
        <strong>Answer</strong> the question in your mind and <strong>Compare</strong> it to the solution
      </Alert>
      <Box sx={{ p: 2 }}>
      <Card sx={{ minWidth: 275 }} >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.flashcard.getQuestionText()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          </Typography>
          <Typography variant="body1">
            {showSolution && props.flashcard.getAnswer()}
          </Typography>
        </CardContent>

        {showSolution && <CardActions>
          <p>Source: <strong>{props.flashcard.getOriginSet()}</strong></p>      
          {props.flashcard.getPageOrigin() && <p>Page: <strong>{props.flashcard.getPageOrigin()}</strong></p>}
        </CardActions>}

      </Card>
          
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            > 
              <Stack direction="column" spacing={3}>
                {showSolution && <Stack direction="row" spacing={3}>
                    <Button 
                      variant={showSolution ? "contained" : "outlined"} 
                      color="error" 
                      onClick={_setIncorrect}
                    >Wrong Answer
                      
                    </Button> 
                    <Button 
                      variant={showSolution ? "contained" : "outlined"} 
                      color="warning" 
                      onClick={_setPartialCorrect}
                    >Partially Correct Answer
                      
                    </Button> 
                    <Button 
                      variant={showSolution ? "contained" : "outlined"}
                      onClick={_setCorrect}
                      color="success" 
                    >Correct answer</Button> 

                </Stack> }
              </Stack>
            </Box>
      </Box>
    </div>);
}

export default FlashcardBox