import { User } from "../../../../entities";

export interface CustomerJwtBody extends JwtBody {
    user: User;
  }
  export interface JwtBody {
    id: string;
    email: string;
    role: string;
  }