import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,//Ignora quaisquer dados que não estejam presentes no DTO
		forbidNonWhitelisted: true, //Não permite que sejam recebidos dados não listados no DTO
		transform: true //Automaticamente tipar os dados recebidos pela requisição.
	}))
	await app.listen(3000);
}
bootstrap();
