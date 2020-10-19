import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[],
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    if ( error instanceof ValidationError ){
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ message: 'Validation fails', errors });
    }

    console.error(error);

    // O cliente front-end receberá apenas essa mensagem quando acontecer algum erro
    return response.status(500).json({ message: 'Internal server error' })

};

export default errorHandler;