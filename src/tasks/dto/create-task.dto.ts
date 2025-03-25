import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}
