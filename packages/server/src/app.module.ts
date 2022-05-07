import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';

const dialectOptions: { ssl: boolean | any } = { ssl: false };
if (process.env.DATABASE_SSL) {
  dialectOptions.ssl = { require: true, rejectUnauthorized: false };
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'front/src/.output/public'),
      exclude: ['/api/*'],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT || 5432),
      database: process.env.DATABASE_NAME || 'test',
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      ssl: Boolean(process.env.DATABASE_SSL || false),
      dialectOptions,
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
