import { OmitType } from '@nestjs/mapped-types';
import { User } from './users.entity';
export class UserDto extends OmitType(User, ['password', 'admin'] as const) {}
