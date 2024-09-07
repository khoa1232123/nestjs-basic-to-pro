import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  console.log('config', config);
  
  // plainInstance converts plain objects into class instances
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    /**
     * enableImplicitConversion will tell class-transformer that if it sees a primitive that is not defined in the class,
     * it should try to convert it to the correct type.
     * */
    enableImplicitConversion: true,
  });
  console.log('validatedConfig', validatedConfig);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
