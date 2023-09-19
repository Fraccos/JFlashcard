import React, { useState } from 'react';
import Question from '../types/Question';
import QuestionBox from './QuestionBox';
import { Button, Grid, Stack, Step, StepLabel, StepLabelProps, Stepper } from '@mui/material';
import { QStatusEnum } from './QStatusEnum';
import { ShortcutManager } from '../utils/ShortcutManager';
import { KeyboardShortcut } from '../utils/KeyboardShortcut';

interface QuestionManagerProps {
    questionPool: Question[];
    handleEndTest: (statusPool: QStatusEnum[]) => void
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ questionPool,handleEndTest }) => {
    const [activeId, setActiveId] = useState<number>(0);
    const [questionStatus, setQuestionStatus] = useState<QStatusEnum[]>(
        Array(questionPool.length).fill(QStatusEnum.UNDONE)
    )
    const [showSolution, setShowSolution] = useState<boolean>(false);
    const updateActiveId = (number:number) => {
        setActiveId(number)
        setShowSolution(false);
    }
    const handleQStatusUpdate = (newStatus:QStatusEnum, index:number ) => {
        if (questionStatus[index] !== newStatus) {
            questionStatus[index] = newStatus;
            setQuestionStatus([...questionStatus]);
            if (index < questionPool.length-1) {
                addToActiveId(+1);
            }
        }
        
    }
    const addToActiveId = (number:number) => {
        setActiveId(id => {
            let newId = id + number;
            const upperLimit = questionPool.length;
            if (newId >= upperLimit) {
                newId = newId % upperLimit;
            }
            else if (newId < 0) {
                newId = newId % upperLimit;
                newId += upperLimit;
            }
            return newId;
        });
        setShowSolution(false);
    }

    const isAllQuestionAnswered = () => {
        for (const status of questionStatus ) {
            if (status !== QStatusEnum.UNDONE) {
                return false;
            }
        }
        return true;
    }

    const terminateTest = ():void => {
        handleEndTest(questionStatus);
    }

    const _indexGoAhead = () => addToActiveId(+1)
    const _indexGoPrev= () => addToActiveId(-1)
    const _toggleSolution = ()=>setShowSolution(!showSolution);

    const shortcutManager = new ShortcutManager();
    shortcutManager.registerNewHook(new KeyboardShortcut("j", false, false, _indexGoPrev));
    shortcutManager.registerNewHook(new KeyboardShortcut("k", false, false, _indexGoAhead));
    shortcutManager.registerNewHook(new KeyboardShortcut("l", false, false, _toggleSolution));
    shortcutManager.registerNewHook(new KeyboardShortcut("t", false, false, terminateTest));



    const isTestFullfil = isAllQuestionAnswered();
    return (
        <div tabIndex={-1}  onKeyUp={(e: React.KeyboardEvent<HTMLImageElement>) => {shortcutManager.callbackHook(e)}}>
            <QuestionBox
                    question={questionPool[activeId]}
                    id={activeId}
                    showSolution={showSolution}
                    handleQStatusUpdate={handleQStatusUpdate}
                ></QuestionBox>
            <Stack direction="row" justifyContent="center" spacing={3}>
                <Button 
                    variant={showSolution ? "contained" : "outlined"}
                    color="secondary"
                    disabled={activeId < 1}
                    onClick={_indexGoPrev}
                >Previous</Button> 
                <Button variant={showSolution ? "contained" : "outlined"} color="success" onClick={_toggleSolution} >Show Solution</Button> 
                <Button 
                    variant={showSolution ? "contained" : "outlined"} 
                    color="primary" 
                    disabled={activeId === questionPool.length-1}
                    onClick={_indexGoAhead}
                >Next</Button> 
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={3} style={{marginTop: '20px'}} >
                <Button 
                    variant={isTestFullfil ? "contained" : "outlined"}
                    color="error"
                    onClick={() => terminateTest()}
                >End Quiz</Button> 
            </Stack>
            <Stack direction="row"  >
            <Stepper activeStep={activeId} alternativeLabel style={{marginTop: '20px', width: '100%', flexWrap: 'wrap'}}>
                    {
                    questionPool.map((question ,index) => {
                        let bgColor = { color: "#ff0000 !important"};
                        let stepProps:any = [];
                        let stepLabelProps:StepLabelProps = {
                            StepIconProps: undefined
                        }; 
                        const qStatus = questionStatus[index]
                        stepProps["completed"] = false; 
                        /*            
                        if (qStatus !== QStatusEnum.UNDONE && (index != activeId)) {
                            //stepLabelProps["StepIconProps"] = {style: {color: "#ffffff"}} ;
                            stepLabelProps["StepIconProps"] = {style: {color: "#b0cccf"}} ;
                            
                        }*/
                        
                        if (index != activeId) {
                            let colorCode = "#898989";
                            stepProps["active"] = true;
                            if (qStatus === QStatusEnum.CORRECT) {
                                colorCode = "#81c784";                                
                            }
                            else if (qStatus === QStatusEnum.PARTIALLY_CORRECT) {
                                colorCode = "#e6c86d";                                
                            }
                            else if (qStatus === QStatusEnum.INCORRECT) {
                                colorCode = "#e57373"; //ERROR COLOR
                            }
                            else if (qStatus === QStatusEnum.UNDONE) {
                                colorCode = "#898989";                                
                            }
                            let colorshowSolution = {color: colorCode};
                            stepLabelProps["StepIconProps"] = {style: colorshowSolution};
                        }   
                        return (
                            <Step key={index} {...stepProps} onClick={()=>updateActiveId(index)}>
                                <StepLabel  {...stepLabelProps} ></StepLabel>
                            </Step>
                        ) 
                    })}
                </Stepper>
            </Stack>
        </div>
    );
};

export default QuestionManager;
