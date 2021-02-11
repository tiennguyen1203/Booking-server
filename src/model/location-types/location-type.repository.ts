import { EntityRepository, Repository } from "typeorm";
import { LocationType } from "./location-type.entity";

@EntityRepository(LocationType)
export class LocationTypeRepository extends Repository<LocationType> { }
