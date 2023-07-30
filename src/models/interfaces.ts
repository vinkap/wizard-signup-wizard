import { Alignment } from "./enums";

export interface User {
    email: string;
    password: string;
    newsletter: boolean;
    wizard?: Wizard;
    sidekick?: Sidekick;

    terms: boolean;
    confirmPassword: string;
}
export interface Wizard {
    name: string;
    level: number;
    school: string;
    alignment: Alignment;
}
export interface Sidekick {
    name: string;
    skill: string;
}
