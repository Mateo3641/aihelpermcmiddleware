import { db } from '../config/db.js';
import { Request, Response } from 'express';
import type {Pregunta} from '../types/question.type.js'
import { processQuestionService } from '../services/questions.service.js';

export const getQuestions = async(req: Request, res: Response) => {
  try {
    const result= await db.query("select * from questions ORDER BY id DESC");
    res.json(result.rows)
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Failed to retrieve questions"});
  }
};

export const postQuestions= async(req:Request,res:Response)=>{
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.MC_SERVER_SECRET}`) {
      console.warn("\n[SECURITY] Intento de acceso denegado sin clave secreta.");
      res.status(401).json({message: "No autorizado. Clave secreta inválida."});
      return;
    }
    console.log("\n[DEBUG] Petición entrante desde Minecraft:", req.body);
    const {user,question}=req.body;
  if(!user || !question){
    res.status(400).json({message:"Usuario y pregunta son obligatorios"})
    return;    
  }
  const newQuestion:Omit<Pregunta,"id"|"status">={
    user: user,
    question:question,
    answer: "unanswered",
  }
  const result= await db.query(`insert into questions ("user",question,answer) 
    values ($1,$2,$3) returning *`,[newQuestion.user,newQuestion.question,
      newQuestion.answer]);
  const respuestaFinal=await processQuestionService(
    result.rows[0].id,result.rows[0].question);
  if ("success" in respuestaFinal) {
    // Al entrar aquí, TypeScript dice: "Ah, si tiene la palabra 'success' adentro, 
    // entonces ESTOY SEGURO de que es un ErrorIA y no una Pregunta".
    
    res.status(201).json({ 
      ticket: result.rows[0], 
      aviso: respuestaFinal.message // ¡Ya no hay línea roja aquí!
    });
} else {
    // Si no tiene 'success', TypeScript sabe que obligatoriamente es una Pregunta
    res.status(201).json(respuestaFinal);
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Failed to create question"});
  }
};

export const updateQuestion = async(req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const {answer,status}= req.body;
      const result = await db.query(`update questions set answer=$2,status=$3 
        where id=$1 returning *`,[id,answer,status])
      if(result.rowCount===0){
      res.status(404).json({message: "Pregunta sin respuesta"})
      return
    }
      res.json({message:"question updated",question:result.rows[0]})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to update question"});
    }
};