import { shuffledArray } from "./utils";

export type Question = {

    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;

}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {

    Easy = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',

}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {


    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endPoint)).json();
    if (data) {
      //  console.log(data);

        return data.results.map((question: Question) => (
            {
                ...question,
                answers: shuffledArray([...question.incorrect_answers, question.correct_answer]),
            }
        ))

    }


}