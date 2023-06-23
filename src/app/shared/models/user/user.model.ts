import { Consent } from "../consent/consent.model";

export interface User {
    id: string | null;
    email: string | null;
    consents: Consent[];
}