import { Answer } from "./Answer";
import Question from "./Question";

export class Quiz extends Question {
    
    private answers: Answer[];
    
	constructor($questionText: string, $answers: Answer[], $originSet: string) {
        super($questionText,$originSet);
		this.answers = $answers;
	}
    

    public getAnswers(): Answer[] {
        return this.answers;
    }

    public setAnswers(answers: Answer[]): void {
        this.answers = answers;
    }



  
}