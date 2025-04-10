// src/products/dto/update-stock.dto.ts
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  quantity?: number; // Opcional, ya que no es necesario enviar cantidad siempre
}
