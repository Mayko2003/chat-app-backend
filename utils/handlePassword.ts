import bcrypt from 'bcrypt';


const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, receivedPassword: string) => {
    return await bcrypt.compare(password, receivedPassword);
};

export { encryptPassword, comparePassword };