import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseurl from '../app/apiMethods/apiMethod';
import logo from '../assets/images/logo.svg';
import MAButton from '../components/my-components/MAButton';
import MAModal from '../components/my-components/MAModal';


function Login() {

    //form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reSendloading, setReSendloading] = useState(false);
    const [code, setCode] = useState(0);
    const [invalid, setInvalid] = useState("");
    const [resend, setResend] = useState("");

    //Naivgation
    const navigate = useNavigate()

    //useEffect for check token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/schedule')
        }
    }, [])

    //send code function
    const sendCode = () => {
        setLoading(true);
        axios.post(baseurl + 'api/v1/login/two-factor/send-code', {
            email,
            password
        })
            .then((res) => {
                console.log(res);
                setLoading(false)
                localStorage.setItem('token', res.data.accessToken);
                navigate('/schedule')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                setError(true);
            });
    }
    return (
        <>
            <Box sx={{ backgroundColor: "#d3bc89", padding: "10px" }}>
                <img src={logo} alt="logo" />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' , marginBottom:'10%' }}>
                <Box sx={{
                    backgroundColor: "#EDE9E9",
                    width: "30%",
                    padding: "5%",
                    borderRadius: "20px"
                }}>
                    <Typography sx={{ marginTop: "1%", textAlign: "center", fontSize: "200%" }} >LOGIN</Typography>
                    <Box>
                        <Typography style={{textAlign:'center'}}>Email:mabdullah2037@gmail.com</Typography>
                        <Typography style={{textAlign:'center'}}>password:asdfgfdsa123</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Email" variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Password" type='password' variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                        <MAButton loading={loading} onClick={sendCode} variant="contained" label="Login" />
                    </Box>


                    <MAModal open={error}
                        close={() => setError(false)}
                        modalTitle="Warning"
                        width='30%'
                        innerContent='Email or Password is Invalid' />

                </Box>
            </Box>
        </>
    )
}

export default Login