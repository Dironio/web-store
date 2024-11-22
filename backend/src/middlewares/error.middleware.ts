// import { NextFunction, Request, Response } from "express";
// import { validationResult } from "express-validator";


// function errorValidate(req: Request, res: Response, next: NextFunction) {
//     const error = validationResult(req);

//     if (!error.isEmpty()) {
//         console.log(error.array());
//         return res.status(400).json(error.array());
//     }

//     next();
// }

// export default errorValidate;