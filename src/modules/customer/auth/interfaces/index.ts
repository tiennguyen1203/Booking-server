import { User } from "../../../../entities";

  export interface JwtBody {
    id: string;
    email: string;
    role: string;
  }