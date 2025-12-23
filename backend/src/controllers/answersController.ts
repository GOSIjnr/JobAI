import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { extractTraits, getCareerRecommendations } from '../services/aiService';

export const submitAnswers = async (req: Request, res: Response) => {
    const { userId, answers } = req.body;

    if (!userId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    try {
        // 1. Save answers
        // In a real app we'd map answers to questions, here assuming simple list for MVP
        // await prisma.answer.createMany(...)

        // 2. Call AI service
        // 2. Call AI service for traits and career path
        // const traits = await extractTraits(answers);
        const aiResponse = await getCareerRecommendations(answers);

        // 3. Return full AI response (includes recommendations, analysis, trait_profile, etc.)

        res.json({
            success: true,
            recommendations: aiResponse.recommendations,
            analysis: aiResponse.analysis,
            trait_profile: aiResponse.trait_profile,
            answer_distribution: aiResponse.answer_distribution,
            total_questions: aiResponse.total_questions,
            low_engagement: aiResponse.low_engagement,
            engagement_message: aiResponse.engagement_message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process answers' });
    }
};
