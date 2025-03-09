import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import { ILike } from "typeorm";

export class UserController {

    // create new user
    static createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { firstname, lastname, email, password, age, phone } = req.body;

            // Check if email exists
            const existingUser = await userRepository.findOneBy({ email });
            if (existingUser) {
                res.status(400).json({ message: "Email already exists", status: 400 });
                return;
            }

            //  Check if phone exists 
            if (phone) {
                const existingUserByPhone = await userRepository.findOneBy({ phone });
                if (existingUserByPhone) {
                    res.status(400).json({ message: "Phone number already exists", status: 400 });
                    return;
                }
            }

            // Create new user
            const user = new User();
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.password = password;
            user.age = age;
            user.phone = phone;

            // Hash password before save
            user.hashPassword();
            await userRepository.save(user);

            res.status(201).json({ message: "User created successfully", status: 201, user });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", status: 500, error });
        }
    };

    // get users with basic filters 
    static getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const { firstname, lastname, email, age, phone, status } = req.query;
            const filters: any = {};

            // filter by any fields 
            if (firstname) filters.firstname = ILike(`%${firstname}%`);
            if (lastname) filters.lastname = ILike(`%${lastname}%`);
            if (email) filters.email = ILike(`%${email}%`);
            if (age) filters.age = Number(age);
            if (phone) filters.phone = ILike(`%${phone}%`);
            const users = await userRepository.find({ where: filters });

            if (users.length === 0) {
                res.status(404).json({ message: "No users found", status: 404 });
                return;
            }

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", status: 500, error });
        }
    };

    // get detail user info
    static getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await userRepository.findOneBy({ id: req.params.id });
            if (!user) {
                res.status(404).json({ message: "User not found", status: 404 });
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", status: 500, error });
        }
    };

    // update user by id
    static updateUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { firstname, lastname, email, age, phone } = req.body;
            const user = await userRepository.findOneBy({ id: id });
            if (!user) {
                res.status(404).json({ message: "user not found", status: 404 });
            }

            // check email exists if input contains email 
            if (email && email !== user.email) {
                const existingUserByEmail = await userRepository.findOneBy({ email });
                if (existingUserByEmail) {
                    res.status(400).json({ message: "Email already exists", status: 400 });
                    return;
                }
            }

            // check phone exists if input contains phone
            if (phone && phone !== user.phone) {
                const existingUserByPhone = await userRepository.findOneBy({ phone });
                if (existingUserByPhone) {
                    res.status(400).json({ message: "Phone number already exists", status: 400 });
                    return;
                }
            }

            await userRepository.update(id, {
                firstname,
                lastname,
                email,
                age,
                phone
            })

            const updatedUser = await userRepository.findOneBy({ id: id });
            res.status(200).json({ message: "User updated successfully", status: 200, user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", status: 500, error });
        }
    };

    // delete user
    static deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await userRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).json({ message: "User deleted", status: 204 });
            } else {
                res.status(404).json({ message: "User not found", status: 404 });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", status: 500, error });
        }
    };
}
