// app.ts
import express from 'express';
import { LearningSystem } from './services/learning-system';
import { ITopic, IQuestion, IAnswer } from './models';

const app = express();
const port = 3000;
const learningSystem = new LearningSystem();

app.use(express.json());

app.post('/topics', async (req, res) => {
    try {
        const topic: ITopic = req.body;
        const newTopic = await learningSystem.createTopic(topic);
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create topic' });
    }
});

app.get('/topics/:id/primary-questions', async (req, res) => {
    try {
        const topicId = parseInt(req.params.id, 10);
        const primaryQuestions = await learningSystem.getQuestionsByParent(topicId, true); //  function retrieves primary questions.
        res.status(200).json(primaryQuestions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch primary questions' });
    }
});

app.get('/questions/:id/sub-questions', async (req, res) => {
    try {
        const primaryQuestionId = parseInt(req.params.id, 10);
        const subQuestions = await learningSystem.getQuestionsByParent(primaryQuestionId, false); //  function retrieves sub-questions.
        res.status(200).json(subQuestions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sub-questions' });
    }
});

app.get('/questions/:id/answers', async (req, res) => {
    try {
        const questionId = parseInt(req.params.id, 10);
        const answers = await learningSystem.getAnswersByQuestion(questionId);
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch answers' });
    }
});

app.listen(port, () => {
    console.log(`Learning System API is running on port ${port}`);
});
