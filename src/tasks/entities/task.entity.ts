import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    descripcion: string;

    @Column({name: 'is_completed'})
    isCompleted: boolean;

    @CreateDateColumn({name: 'create_at'})
    createdAd: Date;
}