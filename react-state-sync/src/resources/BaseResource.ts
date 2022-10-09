import { ApiQueryParams } from "../types/api";

export abstract class BaseResource<T>{
  public getAll = async (params?: ApiQueryParams) => {
    throw new Error("Not implemented");
  }

  public post = async (data: Partial<T>) => {
    throw new Error("Not implemented");
  }

  public get = async (id: string) => {
    throw new Error("Not implemented");
  }

  public put = async (id: string, data: Partial<T>) => {
    throw new Error("Not implemented");
  }

  public delete = async (id: string) => {
    throw new Error("Not implemented");
  }
}