export class Answer {
    private content: string;
    private correct: boolean;

    
	constructor($content: string, $correct: boolean=true) {
		this.content = $content;
		this.correct = $correct;
	}
   

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public isCorrect(): boolean {
        return this.correct;
    }

    public setCorrect(correct: boolean): void {
        this.correct = correct;
    }


   

	
    


}