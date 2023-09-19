export default class Question {
    private originSet: string;
    private questionText:string;
    private pageOrigin?: string;



	constructor($questionText: string, $originSet: string) {
		this.originSet = $originSet;
		this.questionText = $questionText;
	}
    

    public getOriginSet(): string {
        return this.originSet;
    }

    public setOriginSet(originSet: string): void {
        this.originSet = originSet;
    }

    public getQuestionText(): string {
        return this.questionText;
    }

    public setQuestionText(questionText: string): void {
        this.questionText = questionText;
    }

    public getPageOrigin(): string | undefined{
        return this.pageOrigin;
    }

    public setPageOrigin(pageOrigin: string): void {
        this.pageOrigin = pageOrigin;
    }


}