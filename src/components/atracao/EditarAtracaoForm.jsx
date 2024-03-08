import React, {useState} from 'react';
import { TextField, Button, Stack, Select, Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';

export default function EditarAtracaoForm() {

    return (
        <React.Fragment>
            <h3 className='form-editar-atracao-title'>Editar atração</h3>
            <form className='form-editar-atracao' action={<Link to="/login" />} >
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nome da atração"
                        fullWidth
                        required
                    />

                    <Box sx={{ minWidth: 220 }}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ paddingLeft: 2 }} variant="standard" htmlFor="uncontrolled-native">
                                Categoria*
                            </InputLabel>
                            <Select
                                variant='outlined'
                                color='secondary'
                                label="Categoria"
                                fullWidth
                                required>

                                <MenuItem value={"PRAIAS"}>Praias</MenuItem>
                                <MenuItem value={"TRILHAS"}>Trilhas</MenuItem>
                                <MenuItem value={"RESTAURANTES"}>Restaurantes</MenuItem>
                                <MenuItem value={"MUSEUS"}>Museus</MenuItem>
                                <MenuItem value={"CACHOEIRAS"}>Cachoeiras</MenuItem>
                                <MenuItem value={"BOATES"}>Boates</MenuItem>
                                <MenuItem value={"MONUMENTOS"}>Monumentos</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="País"
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Estado"
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Cidade"
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={4}
                        required
                        sx={{marginBottom: 4}}
                    />
                <Button variant="outlined" color="secondary" type="submit">Salvar</Button>
            </form>     
        </React.Fragment>
    )
}