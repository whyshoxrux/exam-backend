import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file) {
          return callback(null, true); // Agar fayl yo'q bo'lsa, xatolik qaytarmaslik uchun
        }
        if (!/^image\/(jpeg|jpg|png|webp)$/.test(file.mimetype)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and WEBP files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadProductPicture(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      // Agar rasm yuklanmagan bo'lsa, default_image.png dan foydalanamiz
      createProductDto.product_image = image
        ? `/uploads/${image.filename}`
        : '/uploads/default_image.png';

      const savedProduct = await this.productsService.create(createProductDto);

      return {
        message: 'Product created successfully!',
        product: savedProduct,
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw new BadRequestException(
        `Error uploading product: ${error?.message || 'Unknown error'}`,
      );
    }
  }

  @Post('create-many')
  @Roles('admin')
  @UseGuards(RoleGuard)
  createMany(@Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createMany(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `product-${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!/^image\/(jpeg|jpg|png|gif)$/i.test(file.mimetype)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const productId = parseInt(id, 10);
      if (isNaN(productId)) {
        throw new BadRequestException('Invalid product ID');
      }

      const existingProduct = await this.productsService.findOne(productId);
      if (!existingProduct) {
        throw new BadRequestException('Product not found');
      }

      let product_picture = existingProduct.product_image;

      if (file) {
        product_picture = `/uploads/${file.filename}`;

        if (
          existingProduct.product_image &&
          existingProduct.product_image !== '/uploads/default.png'
        ) {
          const oldImagePath = `.${existingProduct.product_image}`;
          try {
            await fs.unlink(oldImagePath);
          } catch (unlinkError) {
            console.error('Failed to delete old image:', unlinkError.message);
          }
        }
      }

      const updatedData = {
        ...updateProductDto,
        product_image: product_picture,
      };

      const updatedProduct = await this.productsService.update(
        productId,
        updatedData,
      );

      return {
        message: 'Product image updated successfully',
        updatedProduct,
      };
    } catch (error) {
      console.error('Update Error:', error);
      throw new BadRequestException(`Error updating product: ${error.message}`);
    }
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsService.remove(productId);
  }
}
