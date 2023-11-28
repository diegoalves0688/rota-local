import { React, useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios';

export default function VisualizarAtracao() {

    const params = useParams();
    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracoes/'+params.atracaoId).then( response => {
            console.log(response.data)
        }).catch(response => console.log(response))
    }, []);

    return (
        <div>

        </div>
    )
}