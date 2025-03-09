import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Length, IsEmail, IsOptional } from "class-validator";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid") // ✅ Dùng UUID làm id
    id: string;

    @Column()
    @Length(2, 50)
    firstname!: string;

    @Column()
    @Length(2, 50)
    lastname!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column({ select: false })
    @Length(6, 100)
    password!: string;

    @Column({ nullable: true })
    age?: number;

    @Column({ unique: true, nullable: true })
    @IsOptional()
    phone?: string;

    @BeforeInsert()
    generateUUID() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkPassword(plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, this.password);
    }
}  