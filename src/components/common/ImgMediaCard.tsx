import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export interface Image {
  url: string
}
interface ImgMediaCardProps {
  title: string
  description?: string
  id: string
  images?: Image[]
  learnMoreFunction?: (id: string) => void
}
export default function ImgMediaCard({
  title,
  description,
  images,
  learnMoreFunction,
  id
}: ImgMediaCardProps) {
  const getRandomMediaImage = (images?: Image[]): string => {
    let imageUrls = []

    if (!images || images.length === 0) {
      imageUrls = [
        '/static/images/book-1.jpg',
        '/static/images/book-2.jpeg',
        '/static/images/book-3.jpeg',
        '/static/images/book-4.jpeg'
      ]
    } else {
      imageUrls = images.map((image) => image.url)
    }

    const randomIndex = Math.floor(Math.random() * imageUrls.length)

    return imageUrls[randomIndex]
  }

  const handleLearnMore = () => {
    if (learnMoreFunction) {
      learnMoreFunction(id)
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={title} height="350" image={getRandomMediaImage(images)} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add To Cart</Button>
        <Button size="small" onClick={handleLearnMore}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
