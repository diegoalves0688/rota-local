import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ListarAtracaoCard(props) {

  let image = props.banner ?? 'http://localhost:8080/images/banner.png'

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="iamgem"
      />
      <CardContent className='atracao-card-content'>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography className='card-avatar' gutterBottom variant="body2" component="div">
          <ListItemAvatar>
            <div><Avatar alt='foto' src={props.usuariofoto} />{props.usuarionome}</div>
          </ListItemAvatar>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description.length <= 250 ? props.description : props.description.substring(0, 250) + '...'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="detail" size="small" href={"/atracoes/"+props.atracaoId}>Ver detalhes</Button>
      </CardActions>
      <div className='card-location'><LocationOnIcon></LocationOnIcon>{props.cidade}</div>
    </Card>
  );
}