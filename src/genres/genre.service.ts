// genres/genres.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './schema/genres.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = new this.genreModel(createGenreDto);
    return genre.save();
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }

  async findOne(id: string): Promise<Genre> {
    const genre = await this.genreModel.findById(id).exec();
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found`);
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const updatedGenre = await this.genreModel
      .findByIdAndUpdate(id, updateGenreDto, { new: true })
      .exec();
    if (!updatedGenre)
      throw new NotFoundException(`Genre with ID ${id} not found`);
    return updatedGenre;
  }

  async delete(id: string): Promise<void> {
    const result = await this.genreModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Genre with ID ${id} not found`);
  }
}
