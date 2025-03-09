import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};
