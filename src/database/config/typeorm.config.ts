import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'yourStrong(!)Password',
  database: 'NestJS',
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations'],
  cli: {
    migrationsDir: __dirname + '/../migrations',
    entitiesDir: __dirname + '/../entities',
    subscribersDir: __dirname + '/../subscribers'
  },
  synchronize: true
}
