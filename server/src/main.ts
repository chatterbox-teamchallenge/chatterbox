import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chatterbox-chattingmore.netlify.app'
    ],
    methods: "*",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Chatterbox-API')
    .setDescription('CRUD RESTful API documentation')
    .setVersion('1.1.2')
    .addTag('chatterbox-backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/rest/docs', app, document);
  await app.listen(5000);
}
bootstrap();
