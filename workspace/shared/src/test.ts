export const greetFromShared = (name: string): string => {
  return `Hello ${name} from shared package!`;
};

export interface User {
  id: number;
  name: string;
  email: string;
}