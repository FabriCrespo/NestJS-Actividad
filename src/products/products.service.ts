import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FindProductsDto, SortOrder } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}


  async create(createProductDto: CreateProductDto) {
    try {
      if (createProductDto.price <= 0) {
        throw new BadRequestException('Price must be greater than 0');
      }

      if (createProductDto.stock < 0) {
        throw new BadRequestException('Initial stock cannot be negative');
      }

      // Validar que el título y artista no estén vacíos
      if (!createProductDto.title.trim() || !createProductDto.artist.trim()) {
        throw new BadRequestException('Title and artist cannot be empty');
      }

      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product already exists: ${createProductDto.title} already exists`,
          );
        }
      }
      throw error;
    }
  }

  async findAll(params: FindProductsDto) {
    const { 
      page = 1, 
      limit = 10, 
      title, 
      artist, 
      genre, 
      minPrice, 
      maxPrice,
      releaseDateFrom,
      releaseDateTo,
      sortBy = 'title', 
      sortOrder = SortOrder.ASC 
    } = params;
    
    // Asegurarse de que page y limit sean números
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Construir el objeto where con validaciones
    const where: any = {
      AND: []
    };

    if (title) {
      where.AND.push({ title: { contains: title, mode: 'insensitive' } });
    }
    if (artist) {
      where.AND.push({ artist: { contains: artist, mode: 'insensitive' } });
    }
    if (genre) {
      where.AND.push({ genre: { contains: genre, mode: 'insensitive' } });
    }
    if (minPrice !== undefined) {
      where.AND.push({ price: { gte: Number(minPrice) } });
    }
    if (maxPrice !== undefined) {
      where.AND.push({ price: { lte: Number(maxPrice) } });
    }
    if (releaseDateFrom) {
      where.AND.push({ releaseDate: { gte: new Date(releaseDateFrom) } });
    }
    if (releaseDateTo) {
      where.AND.push({ releaseDate: { lte: new Date(releaseDateTo) } });
    }

    // Si no hay filtros, eliminar el array AND vacío
    if (where.AND.length === 0) {
      delete where.AND;
    }

    try {
      const [total, products] = await Promise.all([
        this.prismaService.product.count({ where }),
        this.prismaService.product.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: {
            [sortBy]: sortOrder.toLowerCase()
          },
        }),
      ]);

      return {
        data: products,
        meta: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
          hasNextPage: pageNum < Math.ceil(total / limitNum),
          hasPreviousPage: pageNum > 1
        },
      };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    if (id <= 0) {
      throw new BadRequestException('ID must be a positive number');
    }

    const productFound = await this.prismaService.product.findUnique({
      where: { id: id },
    });
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      if (id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
        throw new BadRequestException('Price must be greater than 0');
      }

      if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
        throw new BadRequestException('Stock cannot be negative');
      }

      const productFound = await this.prismaService.product.update({
        where: { id: id },
        data: updateProductDto,
      });

      return productFound;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Product with id ${id} not found`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      if (id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      const deletedProduct = await this.prismaService.product.delete({
        where: { id: id },
      });
      return deletedProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Product with id ${id} not found`);
        }
      }
      throw error;
    }
  }

  async updateStock(
    productId: number,
    updateStockDto: UpdateStockDto,
  ): Promise<void> {
    if (productId <= 0) {
      throw new BadRequestException('Product ID must be a positive number');
    }

    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const { quantity } = updateStockDto;
    if (quantity === undefined) {
      throw new BadRequestException('Quantity is required to update the stock');
    }

    // Validar que la cantidad no sea cero
    if (quantity === 0) {
      throw new BadRequestException('Quantity cannot be zero');
    }

    const newStock = product.stock + quantity;

    // Validar stock máximo (por ejemplo, 1000 unidades)
    if (newStock > 1000) {
      throw new BadRequestException('Stock cannot exceed 1000 units');
    }

    if (newStock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }

    await this.prismaService.product.update({
      where: { id: productId },
      data: { stock: newStock },
    });
  }

  async findByArtist(artist: string) {
    return await this.prismaService.product.findMany({
      where: {
        artist: {
          contains: artist.toLowerCase()
        }
      },
      orderBy: {
        title: 'asc'
      }
    });
  }

  async findByGenre(genre: string) {
    return await this.prismaService.product.findMany({
      where: {
        genre: {
          contains: genre.toLowerCase()
        }
      },
      orderBy: {
        artist: 'asc'
      }
    });
  }

  
}
