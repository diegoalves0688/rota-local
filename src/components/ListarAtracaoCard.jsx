import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ListarAtracaoCard(props) {

  let image = props.banner ?? 'http://localhost:8080/images/banner.png'

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="iamgem"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description.length <= 250 ? props.description : props.description.substring(0, 250) + '...'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="detail" size="small" href={"/atracoes/"+props.atracaoId}>Ver detalhes</Button>
        <Button className="location" size="small">{props.location}</Button>
      </CardActions>
    </Card>
  );
}