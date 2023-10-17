import { LearningSystem } from './src/services/learning-system'; // Update the import path.
import { ITopic } from './src/models';
import { expect } from 'chai';

describe('LearningSystem', () => {
    const learningSystem = new LearningSystem();

    describe('createTopic', () => {
        it('should create a new topic', async () => {
            const topic: ITopic = {
                primary_question: 'Sample Topic Question',
            };

            const newTopic = await learningSystem.createTopic(topic);

            expect(newTopic).to.be.an('object');
            expect(newTopic.primary_question).to.equal('Sample Topic Question');
        });

        it('should handle errors when creating a topic', async () => {
            const invalidTopic: ITopic = {
                primary_question: '', // Invalid, primary_question is required.
            };

            try {
                await learningSystem.createTopic(invalidTopic);
            } catch (error) {
                // Check that the error is handled as expected.
                expect(error).to.be.an('object');
                expect(error.message).to.equal('Validation error: primary_question is required');
            }
        });
    });

});
