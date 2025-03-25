import { User } from '../../users/entities/user.entity';
export declare class Task {
    id: number;
    title: string;
    descripcion: string;
    isCompleted: boolean;
    createdAt: Date;
    user: User;
}
