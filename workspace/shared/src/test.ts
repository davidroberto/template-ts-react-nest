export const greetFromShared = (name: string): string => {
  return `Hello ${name} from shared ss !`;
};

export interface User {
  id: number;
  name: string;
  email: string;
}