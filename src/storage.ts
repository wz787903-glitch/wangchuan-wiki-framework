import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
export function useStored<T>(key: string, fallback: T, validate: (value: unknown) => T): [
    T,
    Dispatch<SetStateAction<T>>,
    boolean
] {
    const [value, setValue] = useState<T>(() => { try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : validate(JSON.parse(raw));
    }
    catch {
        return fallback;
    } });
    const [saveFailed, setSaveFailed] = useState(false);
    // Storage writes happen outside React state updater callbacks.
    function update(action: SetStateAction<T>) {
        const next = typeof action === 'function' ? (action as (previous: T) => T)(value) : action;
        setValue(next);
        try {
            localStorage.setItem(key, JSON.stringify(next));
            setSaveFailed(false);
        }
        catch {
            setSaveFailed(true);
        }
    }
    return [value, update, saveFailed];
}
export const stringList = (value: unknown): string[] => Array.isArray(value) ? [...new Set(value.filter((x): x is string => typeof x === 'string'))] : [];
export type Draft = {
    title: string;
    body: string;
    source: string;
};
export const emptyDraft: Draft = { title: '', body: '', source: '' };
export function restoreDraft(value: unknown): Draft {
    const raw = value as Partial<Draft> | null;
    return { title: typeof raw?.title === 'string' ? raw.title.slice(0, 80) : '', body: typeof raw?.body === 'string' ? raw.body.slice(0, 4000) : '', source: typeof raw?.source === 'string' ? raw.source.slice(0, 500) : '' };
}
