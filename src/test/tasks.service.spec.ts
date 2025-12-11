import { getModelToken } from '@nestjs/mongoose';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('tasks-service', () => {
  let service: TasksService;

  // ? El mock del modelo
  let taskModelMock: any = jest.fn().mockImplementation(() => ({}));

  taskModelMock.find = jest.fn().mockReturnThis();
  taskModelMock.exec = jest.fn();
  taskModelMock.findByIdAndUpdate = jest.fn().mockReturnThis();
  taskModelMock.findByIdAndDelete = jest.fn().mockReturnThis();

  // ? Antes de cada test
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: taskModelMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  // ? Test de findAll
  it('Obtener todas las tareas', async () => {
    const tasks = [{ title: 'Test', description: 'Test' }];

    taskModelMock.find().exec.mockResolvedValue(tasks);

    const result = await service.findAll();

    expect(result).toEqual(tasks);
  });

  // ? Test de create
  it('crear una tarea', async () => {
    const task = { title: 'Nueva', description: 'Test' };
    const expectedResult = { _id: '123', ...task };

    const mockTaskInstance = {
      save: jest.fn().mockResolvedValue(expectedResult),
    };

    taskModelMock.mockImplementation(() => mockTaskInstance);

    const result = await service.create(task);

    expect(taskModelMock).toHaveBeenCalledWith(task);
    expect(mockTaskInstance.save).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  // ? Test de update
  it('Actualizar una tarea', async () => {
    const id = '12345';
    const task = { title: 'Sacar al perro', description: 'En la tarde' };
    const updatedTask = { _id: id, ...task };

    taskModelMock.findByIdAndUpdate.mockReturnThis();
    taskModelMock.exec.mockResolvedValue(updatedTask);

    const result = await service.update(id, task);

    expect(taskModelMock.findByIdAndUpdate).toHaveBeenCalledWith(id, task, {
      new: true,
    });
    expect(result).toEqual(updatedTask);
  });

  // ? Test de update - NotFoundException
  it('Actualizar una tarea — NotFoundException', async () => {
    taskModelMock.findByIdAndUpdate.mockReturnThis();
    taskModelMock.exec.mockResolvedValue(null);

    await expect(service.update('123', {})).rejects.toThrow(NotFoundException);
  });

  // ? Test de remove
  it('Eliminar una tarea', async () => {
    const id = '123';
    const deletedTask = { _id: id };

    taskModelMock.findByIdAndDelete.mockReturnThis();
    taskModelMock.exec.mockResolvedValue(deletedTask);

    const result = await service.remove(id);

    expect(taskModelMock.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedTask);
  });
});
