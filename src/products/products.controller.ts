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
import { RoleGuard } from 'src/common/auth/role.guard';
import { Roles } from 'src/common/auth/role.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
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
        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|webp)$/)) {
          return callback(
            new BadRequestException('Only jpg, jpeg, png files are allowed!'),
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
    @Req() req,
  ) {
    try {
      if (!image) {
        throw new BadRequestException('No file provided!');
      }

      createProductDto.product_image = `/uploads/${image.filename}`;

      const userId = req.user?.id;
      if (!userId) {
        throw new BadRequestException('User ID not found');
      }

      // Mahsulotni saqlash
      const savedProduct = await this.productsService.create(createProductDto);

      return {
        message: 'Product image uploaded successfully',
        product: savedProduct,
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
  }

  @Post('create-many')
  // @Roles('admin')
  // @UseGuards(RoleGuard)
  createMany(@Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createMany(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('mine')
  async getMine(@Req() req) {
    const product_id = req.user.id;
    return this.productsService.getMine(product_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseGuards(RoleGuard)
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
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    try {
      // Mahsulotni bazadan olish
      const existingProduct = await this.productsService.findOne(id);
      if (!existingProduct) {
        return { message: 'Product not found' };
      }

      let product_picture = existingProduct.product_image; // Eski rasm

      if (file) {
        product_picture = '/uploads/' + file.filename;

        // ✅ **Eski rasmni o‘chirish**
        if (
          existingProduct.product_image &&
          existingProduct.product_image !== '/uploads/default.png'
        ) {
          const oldImagePath = `.${existingProduct.product_image}`; // Faylga to'liq yo‘l
          try {
            await fs.unlink(oldImagePath); // Faylni o‘chirish
          } catch (unlinkError) {
            console.error('Failed to delete old image:', unlinkError.message);
          }
        }
      }

      const updatedData = {
        ...updateProductDto,
        product_image: product_picture,
      };

      const updatedProduct = await this.productsService.update(id, updatedData);

      return {
        message: 'Product image updated successfully',
        updatedProduct,
      };
    } catch (error) {
      return { message: 'Error updating product image', error: error.message };
    }
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
