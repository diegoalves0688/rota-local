import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useParams } from "react-router-dom"
import axios from 'axios';

export default function NovaRecomendacaoForm() {

    const params = useParams();

    const [recomendacao, setRecomendacao] = useState('')
    const atracaoId = params.atracaoId;
    const usuarioId = 1;
 
    function handleSubmit(event) {
        event.preventDefault();

        axios.post(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/usuario/' + usuarioId + '/atracao/' + atracaoId, {
            recomendacao: recomendacao,
        }).then((response) => {
            console.log(response);
            alert("Recomendação criada com sucesso!")
            window.location.reload(false);
        });
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
                <Button variant="outlined" color="secondary" type="submit">Salvar Recomendação</Button>
            </form>     
        </React.Fragment>
    )
}