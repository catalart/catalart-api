import { Type } from '@nestjs/common';

const metadataKey = 'Queryable';

export function Queryable(target: any, propertyKey: any) {
  Reflect.defineMetadata(metadataKey, true, target, propertyKey);
}

export function queryableUsingClass<T>(type: Type<T>, propertyKey: keyof T) {
  const property = propertyKey.toString();
  return queryableUsingInstance(new type(), property);
}

export function queryableUsingInstance<T>(instance: T, propertyKey: string) {
  return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
}
