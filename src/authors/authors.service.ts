// authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './schema/authors.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
    if (!updatedAuthor) throw new NotFoundException(`Author with ID ${id} not found`);
    return updatedAuthor;
  }

  async delete(id: string): Promise<void> {
    const result = await this.authorModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Author with ID ${id} not found`);
  }
}
