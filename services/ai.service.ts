import dotenv from 'dotenv';
import { serverContext } from '../utils/promt.js';
dotenv.config();
export async function getAiResponse(question: string): Promise<string> {
  try {
    const apiKey=process.env.GROQ_API_KEY;
    const response= await fetch("https://api.groq.com/openai/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        temperature: 0.1, // Temperatura casi en cero para aniquilar las alucinaciones
        max_tokens: 300,
        messages: [
          { role: 'system', content: serverContext },
          { role: 'user', content: `Pregunta del jugador: "${question}"\n\n(Regla interna estricta: Si la respuesta a esta pregunta NO está en tu texto de información, di que no sabes. NO inventes comandos).` }
        ]
      }),
      signal: AbortSignal.timeout(15000) // Evita que Node.js se quede congelado si Groq se cae
    });
    const data = await response.json();
    if (!data.choices) {
       console.error("Error desde la API de IA (posible límite de tokens):", data);
       throw new Error("Respuesta inválida de la IA");
    }
    // Limpiar cualquier markdown residual programáticamente
    let finalAnswer = data.choices[0].message.content;
    finalAnswer = finalAnswer.replace(/\*\*(.*?)\*\*/g, '§l$1§f'); // Convertir **negrita** a Minecraft
    finalAnswer = finalAnswer.replace(/[*#]/g, ''); // Eliminar asteriscos o numerales sueltos
    
    return finalAnswer;
  } catch (error) {
    console.error("Error comunicándose con la IA:", error);
    return "Lo siento, la inteligencia artificial está dormida en este momento.";
  }
}