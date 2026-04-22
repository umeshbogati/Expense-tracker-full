import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/storeHooks";
import appRoles from "../../constants/appRoles";
import PermissionsPanel from "./PermissionsPanel";
import RolesPanel from "./RolesPanel";
import CategoriesPanel from "./CategoriesPanel";

const TABS = ["Permissions", "Roles", "Categories"] as const;

const AdminPage = () => {
    const navigate = useNavigate();
    const { roles } = useAppSelector(state => state.auth);
    const [tab, setTab] = useState(0);

    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);

    if (!isSuperAdmin) {
        navigate("/");
        return null;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>Admin Actions</Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                    {TABS.map(t => <Tab key={t} label={t} />)}
                </Tabs>
            </Box>

            {tab === 0 && <PermissionsPanel />}
            {tab === 1 && <RolesPanel />}
            {tab === 2 && <CategoriesPanel />}
        </Container>
    );
};

export default AdminPage;