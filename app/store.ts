import { DecodedIdToken } from "firebase-admin/auth";
import { atom } from "jotai";

export const authUserAtom = atom<DecodedIdToken | null>(null);