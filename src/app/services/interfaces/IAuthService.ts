import {UserEntity} from '../../DB/mongo/entities/UserEntity.ts';
import {LoginUserDTO} from '../../dto/user/LoginUserDTO.ts';

interface IAuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDTO): Promise<UserEntity>;
}

export default IAuthService;
