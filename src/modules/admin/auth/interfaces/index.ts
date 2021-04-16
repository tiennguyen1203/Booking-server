import { Location } from '../../../../entities';
import { User } from '../../../../entities/user.entity';

export interface AdminJwtBody extends JwtBody {
  location: Location;
}

export interface JwtBody {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  success: boolean;
}
