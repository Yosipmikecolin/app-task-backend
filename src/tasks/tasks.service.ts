import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { handleMongoError } from 'src/utils/handle-mongo-error.util';
import { checkFound } from 'src/utils/check-found.util';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      return await createdTask.save();
    } catch (error) {
      throw handleMongoError(error);
    }
  }

  async findAll() {
    try {
      return this.taskModel.find().exec();
    } catch (error) {
      throw handleMongoError(error);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();
      return checkFound(updatedTask, `Task with ID ${id} not found`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw handleMongoError(error);
      }
    }
  }

  async remove(id: string) {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
      return checkFound(deletedTask, `Task with ID ${id} not found`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw handleMongoError(error);
      }
    }
  }
}
