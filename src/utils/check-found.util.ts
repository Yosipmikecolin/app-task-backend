import { NotFoundException } from '@nestjs/common';

export function checkFound<T>(resource: T, message: string) {
  if (!resource) {
    throw new NotFoundException(message);
  }
  return resource;
}
