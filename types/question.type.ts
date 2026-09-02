export interface Pregunta{
  id: number;
  user: string;
  question: string;
  answer: string;
  status: "answered" | "unanswered";
}
export interface ErrorIA {
  success: false;
  message: string;
}
export type RespuestaServicio = Pregunta | ErrorIA;