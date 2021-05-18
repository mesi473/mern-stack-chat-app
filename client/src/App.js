import React from 'react';
import Login from './components/Login';
import {CssBaseline,Container} from '@material-ui/core'
import './app.css';


export default function App() {
    return (
        <Container maxWidth="lg"  >
            <Login/>
            <CssBaseline/>
        </Container>
    )
}
