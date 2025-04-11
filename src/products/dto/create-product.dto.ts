import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'The title of the vinyl record' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The artist/band name' })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiPropertyOptional({ description: 'Musical genre' })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({ description: 'Release date of the vinyl' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  releaseDate?: Date;

  @ApiProperty({ description: 'Price of the vinyl', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Available stock', minimum: 0, default: 0 })
  @IsNumber()
  stock: number;
}
