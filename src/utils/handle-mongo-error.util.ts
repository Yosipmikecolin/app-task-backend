import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

export function handleMongoError(error: any) {
  // ? Errores de duplicados (índice único)
  if (error instanceof MongoServerError && error.code === 11000) {
    return new BadRequestException({
      message: 'Ya existe un registro con esos datos.',
      detail: error.keyValue,
    });
  }

  // ? Errores de validaciones de mongoose (Schema Validation)
  if (error.name === 'ValidationError') {
    return new BadRequestException({
      message: 'Datos inválidos.',
      detail: error.errors,
    });
  }

  // ? Errores de CastError (IDs mal formados u ObjectId inválido)
  if (error.name === 'CastError') {
    return new BadRequestException({
      message: 'ID inválido.',
      detail: error.message,
    });
  }

  // ? Errores de cualquier otro error inesperado
  return new InternalServerErrorException({
    message: 'Error interno en el servidor.',
    detail: error.message,
  });
}
