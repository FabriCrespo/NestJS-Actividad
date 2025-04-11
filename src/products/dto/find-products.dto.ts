import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsEnum, IsDate, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FindProductsDto {
  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
    example: 1
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    default: 10,
    example: 10
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Filter by title',
    example: 'Black Album'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by artist name',
    example: 'Metallica'
  })
  @IsString()
  @IsOptional()
  artist?: string;

  @ApiPropertyOptional({
    description: 'Filter by music genre',
    example: 'Rock'
  })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({
    description: 'Minimum price filter',
    example: 10.99
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    example: 49.99
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Filter by release date (from)',
    example: '2020-01-01'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  releaseDateFrom?: Date;

  @ApiPropertyOptional({
    description: 'Filter by release date (to)',
    example: '2023-12-31'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  releaseDateTo?: Date;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: ['price', 'title', 'artist', 'releaseDate', 'stock', 'createdAt'],
    default: 'title',
    example: 'price'
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'title';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    default: SortOrder.ASC,
    example: SortOrder.DESC
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.ASC;
}

