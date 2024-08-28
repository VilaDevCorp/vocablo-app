import { SearchFilters } from "../hooks/useCrud";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: User;
}

export interface User extends BaseEntity {
    username: string;
    email: string;
    balance?: number;
}

export interface RegisterUserForm {
    username: string;
    email: string;
    password: string;
}

export interface Definition {
    partOfSpeech?: string;
    definition: string;
    example?: string;
}

export interface Word extends BaseEntity {
    term: string;
    definitions: Definition[];
}

export interface WordSearchForm extends SearchFilters {
    term?: string;
    lang?: string;
    learned?: boolean;
    count?: boolean;
}

export interface UserWord extends BaseEntity {
    term: string;
    definitions: Definition[];
    learningProgress: number;
}

export interface CreateUserWordForm {
    lang: string;
    term: string;
    definitions: Definition[];
}
export interface UpdateUserWordForm {
    id: string;
    term: string;
    definitions: Definition[];
}

export interface UserWordSearchForm extends SearchFilters {
    term?: string;
    lang?: string;
    learned?: boolean;
    count?: boolean;
    orderBy?: string;
    orderDir?: string;
}

export interface Quiz {
    questions: QuizQuestion[];
    score: number;
}

export interface QuizQuestion {
    userWordID: string;
    question: string;
    options: string[];
    correctOptionPos: number;
    answerPos?: number;
}

export interface CreateQuizForm {
    nQuestions: number;
}

export interface UserWordProgress {
    totalWords: number;
    learnedWords: number;
    unlearnedWords: number;
}

