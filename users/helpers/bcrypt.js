import bcrypt from 'bcryptjs';

const handleHash = (password) => { 
    return bcrypt.hashSync(password, 11);
};

const handleCompare = (password, crypt) => {
    return bcrypt.compareSync(password, crypt);
};

export {handleHash, handleCompare};