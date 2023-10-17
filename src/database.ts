import { IDatabase, IMain } from 'pg-promise';

const pgp: IMain = require('pg-promise')();
const connectionString = 'postgres://psql:password@localhost:5432/learning_system';
const db: IDatabase<{}> = pgp(connectionString);

const topics = new pgp.helpers.ColumnSet(['primary_question'], { table: 'topics' });
const questions = new pgp.helpers.ColumnSet(['text', 'is_primary', 'topic_id'], { table: 'questions' });
const answers = new pgp.helpers.ColumnSet(['text', 'is_correct', 'question_id'], { table: 'answers' });

export { db, topics, questions, answers };
