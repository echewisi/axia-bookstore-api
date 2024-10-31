// books/books.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './schema/books.schema';
import { AuthorsModule } from '../../authors/author.module';
import { GenresModule } from '../../genres/genre.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]), // Register Book schema
    AuthorsModule,  
    GenresModule,   
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}


