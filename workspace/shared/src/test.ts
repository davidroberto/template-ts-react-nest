export const greetFromShared = (name: string): string => {
  return `Hello ${name} from shared ssspackassgssse!`;
};

export interface User {
  id: number;
  name: string;
  email: string;
}