import { getAiResponse } from "./ai.service.js";
import {db} from '../config/db.js';
import { RespuestaServicio } from "../types/question.type.js";

export async function processQuestionService(id:number,question: string): Promise<RespuestaServicio> {
    try {
        const answer = await getAiResponse(question);
        const result = await db.query(`update questions set answer=$2, status=$3 
            where id=$1 returning *`,[id,answer, "answered"]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        return {success:false, message:"Error al obtener respuesta de la ia, pregunta registrada en espera de respuesta"};
    }        
}