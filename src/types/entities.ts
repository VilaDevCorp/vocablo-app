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

export interface WordSearchForm extends SearchFilters {
    term: string;
    lang: string;
}
