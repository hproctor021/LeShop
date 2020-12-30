import bycrypt from 'bcryptjs'
// used to hash user's passwords

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bycrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bycrypt.hashSync('12345', 10)
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bycrypt.hashSync('12345', 10)
    },
]

export default users