import DBConnection from '../database';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const salt = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
    id: number;
    username: string;
    password: string;
};
class UserModel {
    async getAll(): Promise<User[]> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannont get Users ${err}`);
        }
    }
    async addNew(user: User): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'insert into users(username, password) values($1, $2)';
            const hash = bcrypt.hashSync(user.password + pepper, salt);
            const values = [user.username, hash];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont add the User ${err}`);
        }
    }
    async getById(id: string): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from users where id = $1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont get the User ${err}`);
        }
    }
    async deleteById(id: string): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'delete from Users where id = $1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont dele the User ${err}`);
        }
    }
    async authenticate(user: User): Promise<User | null> {
        const conn = await DBConnection.connect();
        const sql = 'select password from users where username=$1';
        const result = await conn.query(sql, [user.username]);
        if (result.rows.length > 0) {
            if (
                bcrypt.compareSync(
                    user.password + pepper,
                    result.rows[0].password
                )
            ) {
                return user;
            }
        }
        return null;
    }
}
export default new UserModel();
