export interface ITopic {
    id?: number;
    primary_question: string;
}

export interface IQuestion {
    id?: number;
    text: string;
    is_primary: boolean;
    topic_id: number;
}

export interface IAnswer {
    id?: number;
    text: string;
    is_correct: boolean;
    question_id: number;
}
