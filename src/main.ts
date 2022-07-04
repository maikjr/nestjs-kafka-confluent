import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'app',
          brokers: [process.env.CONFLUENT_BROKER],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: process.env.CONFLUENT_USERANAME,
            password: process.env.CONFLUENT_PASSWORD,
          },
        },
        consumer: {
          groupId: 'app',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
