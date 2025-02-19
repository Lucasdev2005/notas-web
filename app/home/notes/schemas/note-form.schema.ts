import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  description: z.string(),
});