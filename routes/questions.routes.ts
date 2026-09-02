import { Router } from 'express';
import { getQuestions, postQuestions, updateQuestion } from '../controllers/questions.controller.js';


const router:Router= Router();

router.get("/", getQuestions);

router.post("/", postQuestions);

router.put("/:id", updateQuestion);

export default router;