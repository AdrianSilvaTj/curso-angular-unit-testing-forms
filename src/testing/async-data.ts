import { defer, of } from "rxjs";

/* para las funciones asincronas
(1) <T> genericos, para asignar tipado de manera dinamica */
export function asyncData<T>(data: T){
  return defer(() => Promise.resolve(data));
}

export function asyncError(error: unknown){
  return defer(() => Promise.reject(error));
}

export function mockObservable<T>(data: T){
  return of(data);
}

export function mockPromise<T>(data: T){
  return Promise.resolve(data);
}
