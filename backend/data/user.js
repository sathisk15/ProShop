import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('xxxx', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'John@example.com',
        password: bcrypt.hashSync('xxxx', 10),
    },
    {
        name: 'Jane Doe',
        email: 'Jane@example.com',
        password: bcrypt.hashSync('xxxx', 10),
    },
]

export default users