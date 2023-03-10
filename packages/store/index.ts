import { User } from "types";
import { persistedAtom } from "./helper";

export const countAtom = persistedAtom("count", 0);
export const userAtom = persistedAtom<User | null>("user", null);
