import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';

const test = (req: Request, res: Response) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    const data = matchedData(req) 
    //matchedData will return the validated field
    //console.log(data)
    res.send(`Hello ${data.person}`)
  }
  res.send({ errors: result.array() });
}

export default test;