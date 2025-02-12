import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

async function clearDatabase() {
  const configService = new ConfigService();
  const prismaService = new PrismaService(configService);

  try {
    await prismaService.cleanDb();
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prismaService.$disconnect();
  }
}

clearDatabase();