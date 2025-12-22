import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};
