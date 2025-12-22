import { Router } from 'express';
import { getQuestions } from '../controllers/questionsController';
import { submitAnswers } from '../controllers/answersController';
import authRoutes from './auth';

const router = Router();

router.use('/auth', authRoutes);
router.get('/questions', getQuestions);
router.post('/answers', submitAnswers);

export default router;
