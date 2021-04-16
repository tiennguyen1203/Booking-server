import { User } from '../../../../entities/user.entity';
import { Location } from '../../../../entities/location.entity';

export interface AdminGetMeResponse extends User {
  location: Location;
}
