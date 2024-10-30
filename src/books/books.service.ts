import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(authorId?: string, genreId?: string): Promise<Book[]> {
    const filter = {};
    if (authorId) filter['author'] = authorId;
    if (genreId) filter['genre'] = genreId;

    return this.bookModel
      .find(filter)
      .populate('author', 'name')
      .populate('genre', 'name')
      .exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel
      .findById(id)
      .populate('author', 'name bio')
      .populate('genre', 'name description')
      .exec();
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .populate('author', 'name')
      .populate('genre', 'name')
      .exec();
    if (!updatedBook)
      throw new NotFoundException(`Book with ID ${id} not found`);
    return updatedBook;
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Book with ID ${id} not found`);
  }
}
