import { Request, Response } from 'express';

const useProtectedApi = (_req: Request, res: Response) => {
  
 res.json({ name: "Ichigo Kurosaki", age: 18, race: "Hybrid"})
}

export default useLogin;