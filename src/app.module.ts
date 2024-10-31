// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/author.module';
import { GenresModule } from './genres/genre.module';

import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore',
    ),

    BooksModule,
    AuthorsModule,
    GenresModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, 
    },
  ],
})
export class AppModule {}
