import { Container, Paper } from '@mui/material';
import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Root() {
    return(
        <Container maxWidth="md" >
          <Header />
          <Paper sx={{p:4}}>
          <Outlet />
          </Paper>  
        </Container>
    )
}
