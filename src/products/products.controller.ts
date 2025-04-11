import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindProductsDto } from './dto/find-products.dto';

@ApiBearerAuth('bearer') // Actualizado
@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controlador
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new vinyl record',
    description: 'Creates a new vinyl record in the inventory'
  })
  @ApiResponse({
    status: 201,
    description: 'The vinyl record has been successfully created'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided'
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all vinyl records',
    description: 'Retrieves a paginated list of vinyl records with optional filters and sorting'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'title', required: false, type: String, description: 'Filter by title' })
  @ApiQuery({ name: 'artist', required: false, type: String, description: 'Filter by artist' })
  @ApiQuery({ name: 'genre', required: false, type: String, description: 'Filter by genre' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Minimum price' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Maximum price' })
  @ApiQuery({ name: 'releaseDateFrom', required: false, type: Date, description: 'Release date from' })
  @ApiQuery({ name: 'releaseDateTo', required: false, type: Date, description: 'Release date to' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['price', 'title', 'artist', 'releaseDate', 'stock', 'createdAt'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({
    status: 200,
    description: 'List of vinyl records retrieved successfully',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Black Album' },
              artist: { type: 'string', example: 'Metallica' },
              genre: { type: 'string', example: 'Rock' },
              releaseDate: { type: 'string', format: 'date-time', example: '1991-08-12T00:00:00Z' },
              price: { type: 'number', example: 29.99 },
              stock: { type: 'number', example: 50 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: false }
          }
        }
      }
    }
  })
  findAll(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.findAll(findProductsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', description: 'The id of the product to get' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Update product stock' })
  async updateStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<void> {
    await this.productsService.updateStock(Number(id), updateStockDto);
  }

  @Get('artists/:artist')
  @ApiOperation({ summary: 'Find products by artist name' })
  findByArtist(@Param('artist') artist: string) {
    return this.productsService.findByArtist(artist);
  }

  @Get('genres/:genre')
  @ApiOperation({ summary: 'Find products by genre' })
  findByGenre(@Param('genre') genre: string) {
    return this.productsService.findByGenre(genre);
  }
}
