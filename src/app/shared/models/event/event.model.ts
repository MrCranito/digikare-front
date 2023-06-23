import { Consent } from "../consent/consent.model";

export interface Event {
    id?: string | null;
    consents: Consent[];
    updatedAt?: string;
    createdAt?: string;
}