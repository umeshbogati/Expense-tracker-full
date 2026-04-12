import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useEffect } from "react";
import { fetchUsers } from "../store/slices/userSlice";
import { useNavigate } from "react-router";

const AllUsers = () => {
    const dispatch = useAppDispatch();
    const { users, loadingAll } = useAppSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    if (loadingAll) {
        return <CircularProgress />
    }

    if (!users) {
        return <h1>No users found</h1>
    }


    return (
        <Box margin="40px auto" padding={4} borderRadius={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Table showing all user data">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Roles</TableCell>
                            <TableCell align="right">Permissions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(users).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row" onClick={() => navigate(`/users/${user.id}`)}>
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.roles.map(role => role.name).join(", ")}</TableCell>
                                <TableCell align="right">{user.roles.flatMap(role => role.permissions).map(permission => permission.name).join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AllUsers;