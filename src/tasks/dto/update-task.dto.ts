import { IsOptional, IsString } from "class-validator";

export class UpdateTaskDto{

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    isCompleted?: boolean;
}
