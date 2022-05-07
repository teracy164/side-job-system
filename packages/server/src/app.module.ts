import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT || 5432),
      database: process.env.DATABASE_NAME || 'test',
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    ApiModule,
  ],
})
export class AppModule {}
