import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import * as config from 'config'

async function bootstrap() {
  const PORT = 3000
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)

  const serverConfig = config.get('server')
  console.log(serverConfig)

  await app.listen(PORT);
  logger.log(`Application listening on port: ${PORT}`)
}
bootstrap();
