import { User } from "@prisma/client";
import { atom } from "jotai";
import { persistedAtom } from "./helper";

export const countAtom = persistedAtom("count", 0);
export const userAtom = persistedAtom<User | null>("user", null);

export const showSearchBarAtom = atom(false);
