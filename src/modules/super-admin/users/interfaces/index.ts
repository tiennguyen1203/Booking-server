import { AuthResponse } from '../../../../modules/customer/auth/auth.service';
import { Location } from '../../../../entities';

export interface AdminAuthResponse extends AuthResponse {
  location: Location;
}
