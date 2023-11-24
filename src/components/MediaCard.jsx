import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import banner from '../banner.png';

/**
 *
 * Props:
 * - 
 * - 
 */
export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.banner}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="detail" size="small">Ver detalhes</Button>
        <Button className="location" size="small">{props.location}</Button>
      </CardActions>
    </Card>
  );
}