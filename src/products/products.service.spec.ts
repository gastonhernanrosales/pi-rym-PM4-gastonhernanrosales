// src/products/products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProductById', () => {
    it('should return a product if found', async () => {
      const mockProduct = { id: 1, name: 'Test Product' };
      jest.spyOn(repository, 'getById').mockResolvedValue(mockProduct);

      const product = await service.getProductById(1);
      expect(product).toEqual(mockProduct);
    });

    it('should throw a NotFoundException if no product is found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(undefined);

      await expect(service.getProductById(1)).rejects.toThrow(NotFoundException);
    });
  });

  // Agrega más pruebas para otros métodos del servicio
});

