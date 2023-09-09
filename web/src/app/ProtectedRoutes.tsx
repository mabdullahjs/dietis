import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface prop {
    component: any
}
function ProtectedRoutes(props: prop) {
    const { component } = props
    //state
    const [loader, setLoader] = useState<boolean | null>(null);

    //navigate
    const navigate = useNavigate();

    //token
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setLoader(true)
        }
        else {
            navigate('/')
        }
    }, [])
    return (
        <>
            {loader ? (
                component
            ) : (
                <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "30%" }}
                >
                    <CircularProgress size="5rem" />
                </Box>
            )}
            {/* {component} */}
        </>
    )
}

export default ProtectedRoutes