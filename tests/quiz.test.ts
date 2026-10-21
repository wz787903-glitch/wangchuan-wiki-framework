import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answerAndAdvance, emptyQuiz, isComplete, restoreQuiz, score } from '../src/quiz.ts';
import { chapters } from '../src/data.ts';
const questions = chapters[0].questions;
test('answering advances to the next unanswered item', () => {
    const quiz = answerAndAdvance(questions, emptyQuiz(), questions[0].id, 0);
    assert.equal(quiz.cursor, 1);
    assert.equal(quiz.answers[questions[0].id], 0);
});
test('a stale change event does not answer the next question', () => {
    const quiz = answerAndAdvance(questions, emptyQuiz(), questions[0].id, 0);
    assert.equal(answerAndAdvance(questions, quiz, questions[0].id, 1), quiz);
});
test('the last answer wraps to an earlier missing question', () => {
    const quiz = answerAndAdvance(questions, { ...emptyQuiz(), cursor: 2 }, questions[2].id, 2);
    assert.equal(quiz.cursor, 0);
});
test('all answers require explicit submission and remain editable', () => {
    let quiz = emptyQuiz();
    for (const question of questions)
        quiz = answerAndAdvance(questions, quiz, question.id, question.answer);
    assert.equal(isComplete(questions, quiz), true);
    assert.equal(quiz.submitted, false);
    assert.equal(score(questions, quiz), 3);
    quiz = answerAndAdvance(questions, { ...quiz, cursor: 0 }, questions[0].id, 2);
    assert.equal(score(questions, quiz), 2);
});
test('submitted tests are immutable', () => {
    const quiz = { ...emptyQuiz(), submitted: true };
    assert.equal(answerAndAdvance(questions, quiz, questions[0].id, 0), quiz);
});
test('invalid option indices are ignored', () => {
    for (const index of [-1, 99, 1.5])
        assert.deepEqual(answerAndAdvance(questions, emptyQuiz(), questions[0].id, index), emptyQuiz());
});
test('restoration rejects incomplete submitted records and invalid cursors', () => {
    for (const value of [null, {}, { cursor: -1 }, { cursor: 99 }, { cursor: 0, answers: {}, submitted: true }])
        assert.deepEqual(restoreQuiz(value, questions), emptyQuiz());
});
test('restoration removes answers no longer in the question set', () => {
    assert.deepEqual(restoreQuiz({ cursor: 0, answers: { old: 1, [questions[0].id]: 99, [questions[1].id]: 1 }, submitted: false }, questions).answers, { [questions[1].id]: 1 });
});
test('sample question IDs and answers are valid across all chapters', () => {
    const ids = chapters.flatMap(c => c.questions.map(q => q.id));
    assert.equal(new Set(ids).size, ids.length);
    for (const chapter of chapters)
        for (const question of chapter.questions) {
            assert.ok(question.answer >= 0 && question.answer < question.options.length);
            assert.ok(question.explanation);
        }
});
