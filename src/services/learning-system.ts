import { db, topics, questions, answers } from '../database';
import { ITopic, IQuestion, IAnswer } from '../models';

class TreeNode {
    question: IQuestion;
    subQuestions: TreeNode[];

    constructor(question: IQuestion) {
        this.question = question;
        this.subQuestions = [];
    }
}

export class LearningSystem {

    async createTopic(topic: ITopic): Promise<ITopic> {
        const result = await db.one(
            `INSERT INTO topics(${topics}) VALUES($1) RETURNING *`,
            [topic]
        );
        return result;
    }

    async createQuestion(question: IQuestion): Promise<IQuestion> {
        const result = await db.one(
            `INSERT INTO questions(${questions}) VALUES($1) RETURNING *`,
            [question]
        );
        return result;
    }

    async createAnswer(answer: IAnswer): Promise<IAnswer> {
        const result = await db.one(
            `INSERT INTO answers(${answers}) VALUES($1) RETURNING *`,
            [answer]
        );
        return result;
    }
    async buildTopicTree(topicId: number): Promise<TreeNode> {
        const primaryQuestions = await this.getQuestionsByParent(topicId, true);
        const root = new TreeNode(null);

        await this.buildQuestionTree(root, primaryQuestions);

        return root;
    }

    private async buildQuestionTree(node: TreeNode, questions: IQuestion[]): Promise<void> {
        for (const question of questions) {
            const subQuestions = await this.getQuestionsByParent(question.id, false);
            const childNode = new TreeNode(question);
            node.subQuestions.push(childNode);

            await this.buildQuestionTree(childNode, subQuestions);
        }
    }

    async getTopicById(id: number): Promise<ITopic | null> {
        try {
            const topic = await db.oneOrNone('SELECT * FROM topics WHERE id = $1', id);
            return topic;
        } catch (error) {
            // Handle errors, e.g., log the error and return null.
            console.error('Error in getTopicById:', error);
            return null;
        }
    }

    async getQuestionsByParent(parentId: number, isPrimary: boolean): Promise<IQuestion[]> {
        try {
            const questions = await db.manyOrNone('SELECT * FROM questions WHERE parent_id = $1 AND is_primary = $2', [parentId, isPrimary]);
            return questions;
        } catch (error) {
            // Handle errors, e.g., log the error and return an empty array.
            console.error('Error in getQuestionsByParent:', error);
            return [];
        }
    }

    async getAnswersByQuestion(questionId: number): Promise<IAnswer[]> {
        try {
            const answers = await db.manyOrNone('SELECT * FROM answers WHERE question_id = $1', questionId);
            return answers;
        } catch (error) {
            // Handle errors, e.g., log the error and return an empty array.
            console.error('Error in getAnswersByQuestion:', error);
            return [];
        }
    }
    async dfsCalculateScore(node: TreeNode): Promise<number> {
        if (!node.question) {
            return 0;
        }

        const answers = await this.getAnswersByQuestion(node.question.id);

        let score = 0;

        for (const answer of answers) {
            if (answer.is_correct) {
                score += 1;
            }
        }

        for (const subQuestion of node.subQuestions) {
            score += await this.dfsCalculateScore(subQuestion);
        }

        return score;
    }

    async calculateTotalScore(topicId: number): Promise<number> {
        const root = await this.buildTopicTree(topicId);
        const score = await this.dfsCalculateScore(root);

        const totalQuestions = this.countTotalQuestions(root);
        return (score / totalQuestions) * 100;
    }

    countTotalQuestions(node: TreeNode): number {
        let count = 0;
        if (node.question) {
            count += 1;
        }
        for (const subQuestion of node.subQuestions) {
            count += this.countTotalQuestions(subQuestion);
        }
        return count;
    }
}
