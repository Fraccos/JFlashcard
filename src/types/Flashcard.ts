import { Answer } from "./Answer"
import Question from "./Question";

export default class Flashcard extends Question {
    private answer: string;

	constructor($questionText: string, $answer: string, $originSet: string) {
        super($questionText, $originSet)
		this.answer = $answer;
	}
    
    public getAnswer(): string {
        return this.answer;
    }

    public setAnswer(answer: string): void {
        this.answer = answer;
    }


}