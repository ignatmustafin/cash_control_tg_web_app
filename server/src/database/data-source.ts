import {DataSource} from "typeorm";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

const dbDir = process.env.NODE_ENV == 'production' ? 'build/database/' : 'src/database/';

let connectionOptions: DataSourceOptions = process.env.NODE_ENV === "production" ? {
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "admin",
        database: "cash_control",
        synchronize: false,
        logging: true,
        entities: [dbDir + "entities/**/*.{ts,js}"],
        migrations: [dbDir + "migrations/**/*.{ts,js}"],
    } :
    {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "admin",
        database: "cash_control",
        synchronize: false,
        logging: true,
        entities: [dbDir + "entities/**/*.{ts,js}"],
        migrations: [dbDir + "migrations/**/*.{ts,js}"],
    };

export default new DataSource({
    ...connectionOptions,
});
