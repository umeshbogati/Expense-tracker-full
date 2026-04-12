import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useEffect } from "react";
import { fetchUserById } from "../store/slices/userSlice";
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string}>();
    const { users, loadingById } = useAppSelector(state => state.users);
    const user = id ? users[id] : undefined;
    const isLoading = id ? loadingById[id] : false;

    // Assignment: If we already have user information, we do not need to dispatch
    useEffect(() => {
        if (id && !user) {
            dispatch(fetchUserById(id));
        }
    }, [id,user, dispatch])

    if (isLoading) {
        return <CircularProgress />
    }

    if (!user) {
        return <h1>User not found</h1>
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
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="right">{user.name}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.roles.map(role => role.name).join(", ")}</TableCell>
                            <TableCell align="right">{user.roles.flatMap(role => role.permissions).map(permission => permission.name).join(", ")}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default UserPage;