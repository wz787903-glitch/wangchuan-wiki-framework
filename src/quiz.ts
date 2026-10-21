import type { Question } from './data.ts';
export type Quiz = {
    cursor: number;
    answers: Record<string, number>;
    submitted: boolean;
};
export const emptyQuiz = (): Quiz => ({ cursor: 0, answers: {}, submitted: false });
// Preserve the course interaction: ignore stale events, advance to an unanswered
// item, and require an explicit submit before revealing answers.
export function answerAndAdvance(questions: Question[], quiz: Quiz, id: string, value: number): Quiz {
    const question = questions[quiz.cursor];
    if (quiz.submitted || !question || question.id !== id || !Number.isInteger(value) || !question.options[value])
        return quiz;
    const answers = { ...quiz.answers, [id]: value };
    for (let offset = 1; offset < questions.length; offset++) {
        const next = (quiz.cursor + offset) % questions.length;
        if (answers[questions[next].id] === undefined)
            return { ...quiz, answers, cursor: next };
    }
    return { ...quiz, answers };
}
export const isComplete = (questions: Question[], quiz: Quiz) => questions.every(q => Number.isInteger(quiz.answers[q.id]) && quiz.answers[q.id] >= 0 && quiz.answers[q.id] < q.options.length);
export const score = (questions: Question[], quiz: Quiz) => questions.filter(q => quiz.answers[q.id] === q.answer).length;
export function restoreQuiz(value: unknown, questions: Question[]): Quiz {
    const fallback = emptyQuiz();
    if (!value || typeof value !== 'object')
        return fallback;
    const raw = value as Partial<Quiz>;
    if (!Number.isInteger(raw.cursor) || raw.cursor! < 0 || raw.cursor! >= questions.length)
        return fallback;
    const answers: Record<string, number> = {};
    for (const q of questions) {
        const answer = raw.answers?.[q.id];
        if (Number.isInteger(answer) && answer! >= 0 && answer! < q.options.length)
            answers[q.id] = answer!;
    }
    const quiz = { cursor: raw.cursor!, answers, submitted: raw.submitted === true };
    return quiz.submitted && !isComplete(questions, quiz) ? fallback : quiz;
}
