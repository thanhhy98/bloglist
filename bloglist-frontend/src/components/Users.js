import { Link } from "react-router-dom"
import { Table, TableRow, TableContainer, TableHead, TableCell, TableBody, Paper, Typography, Pagination} from '@mui/material'
import { useState } from "react"
const Users = ({users}) => {
    const [page, setPage] = useState(1)

    const pagination = users.slice((page - 1) * 5, page * 5)
    const usersPage = Math.ceil(users.length / 5)

    const handlePage = (e, value) => {
        setPage(value)
      }
    return (
        <>
            <Typography variant="h5">Users</Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize: '17px', p: 3.3}}></TableCell>
                    <TableCell><strong>blog created</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {pagination.map(user => (
                        <User key={user.id}
                              id={user.id}
                              name={user.name}
                              blogs={user.blogs}
                        />
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Pagination count={usersPage} page={page} onChange={handlePage} size='large'/>
        </>
    )
}

const User = ({name, blogs, id}) => {
    const blogsNumber = blogs.length

    return (
        <TableRow>
            <TableCell sx={{fontSize: '17px', p: 3.3}}>
            <Link to={`/users/${id}`} style={{textDecoration: 'none'}}>{name}</Link>
            </TableCell>
            <TableCell>{blogsNumber}</TableCell>
        </TableRow>
    )
}

export default Users