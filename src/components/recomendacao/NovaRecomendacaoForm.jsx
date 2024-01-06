import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';

export default function NovaRecomendacaoForm() {

    const navigate = useNavigate();
    const params = useParams();

    const [cookies, setCookie] = useCookies(['user']);
    const [recomendacao, setRecomendacao] = useState('')
    const atracaoId = params.atracaoId;
 
    function handleSubmit(event) {
        event.preventDefault();

        if (cookies.user != null && cookies.token != null){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/usuario/' + cookies.user + '/atracao/' + atracaoId, {
                recomendacao: recomendacao,
            }, {
                headers: {
                    'X-API-KEY': cookies.user,
                    'X-API-TOKEN': cookies.token,
                }
            }).then((response) => {
                console.log(response);
                alert("Recomendação criada com sucesso!")
                window.location.reload(false);
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }        
    }

    return (
        <React.Fragment>
            <form className='form-nova-recomendacao' onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Digite sua recomendação"
                        onChange={e => setRecomendacao(e.target.value)}
                        value={recomendacao}
                        fullWidth
                        required
                    />
                </Stack>
                <Button className='salvar-recomendacao-button' variant="contained" type="submit">Salvar Recomendação</Button>
            </form>     
        </React.Fragment>
    )
}