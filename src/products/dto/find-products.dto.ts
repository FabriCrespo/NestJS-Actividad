import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsEnum, 
  IsDate, 
  Min,
  Max,
  IsIn,
  ValidateIf 
} from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

const VALID_SORT_FIELDS = ['price', 'title', 'artist', 'releaseDate', 'stock', 'createdAt'];

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
    maximum: 100,
    default: 10,
    example: 10
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
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
    example: 10.99,
    minimum: 0
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    example: 49.99,
    minimum: 0
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ValidateIf((o) => o.minPrice !== undefined)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: VALID_SORT_FIELDS,
    default: 'title'
  })
  @IsString()
  @IsIn(VALID_SORT_FIELDS)
  @IsOptional()
  sortBy?: string = 'title';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    default: SortOrder.ASC
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional({
    description: 'Filter by release date from',
    example: '1991-08-12'
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  releaseDateFrom?: Date;

  @ApiPropertyOptional({
    description: 'Filter by release date to',
    example: '1991-08-12'
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  releaseDateTo?: Date;
}



