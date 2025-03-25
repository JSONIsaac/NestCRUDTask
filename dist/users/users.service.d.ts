import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(registerDto: RegisterDto): Promise<any>;
}
