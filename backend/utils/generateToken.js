import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    //secret lives in the env file, to better 'hide' sensitive information
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        // this will hold onto the generated token for 30days, then will need another issued
        expiresIn: '30d'
    })
}

export default generateToken