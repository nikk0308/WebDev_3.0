import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(__dirname);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      cache: false,
      database: process.env.DB_NAME || 'mydb',
      logging: ['warn', 'error'],
      synchronize: true,
      // migrationsTableName: 'migrations',
      migrations: [__dirname + '/../../migrations/*.{js,ts}'],
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // migrationsRun: true,
    }),
  ],
})
export class OrmModule {}