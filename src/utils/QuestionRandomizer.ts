import Question from "../types/Question";
import { generateRandomIntegers } from "./RandomUtils";

export class QuestionRandomizer {
    private questionsMap: Map<string, Question[]>;

	constructor($questionsMap: Map<string, Question[]>) {
		this.questionsMap = $questionsMap;
	}

    genByPoolSize(poolSize:number) {
        const questionPool:Question[] = [];
        const qArrays = Array.from(this.questionsMap.values());
        const keysArray =  Array.from(this.questionsMap.keys());
        let fixedMax = false;
        let maxSize = 0;
        qArrays.forEach( (ar) => {
            maxSize += ar.length;
        })
        let questionsPerFile:number[] = [];
        if (poolSize > maxSize) {
            poolSize = maxSize;
            fixedMax = true;
        }
        const mapSize = keysArray.length;
        let rest = poolSize % mapSize;
        console.log(rest);
        if (!fixedMax)  {
            questionsPerFile = Array(mapSize).fill(Math.round(poolSize / mapSize));
            let randomIndexes = generateRandomIntegers(rest, 0, keysArray.length-1);
            randomIndexes.forEach( (el,index) => {
                questionsPerFile[el] =  questionsPerFile[el]+1;
            })
        }
        else {
            questionsPerFile = qArrays.map( (ar) => ar.length)
        }
        keysArray.forEach( (key, indexKey) => {
            const questArray = this.questionsMap.get(key);
            const quantity = questionsPerFile[indexKey];
            if (questArray !== undefined) {
                const randomQuestionIndexes = generateRandomIntegers(quantity, 0, questArray.length-1);
                randomQuestionIndexes.forEach( (rValue) =>{
                    questionPool.push(questArray[rValue])
                })
            }
        }) 

        this.shuffle<Question>(questionPool);
        return questionPool;
    }

    shuffle<T>(array:T[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
    public static qShuffle (array:Question[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
}