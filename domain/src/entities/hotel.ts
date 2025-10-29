import { Entity } from "./entity";

export interface Hotel extends Entity{
  name: string;
  address: string;
  description: string;
}
