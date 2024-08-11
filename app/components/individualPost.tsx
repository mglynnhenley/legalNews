import { Card, CardContent, Container, Typography } from '@mui/material';
import { IndividualPost } from '../types';
import Image from 'next/image';

export const NewsPost: React.FC<IndividualPost> = (IndividualPost) => (
  <Container maxWidth="md" sx={{ paddingTop: 16 }}>
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography
          component="h2"
          variant="h2"
          color="inherit"
          // Change the font size for different screen sizes 
          sx={{
            fontSize: {
              xs: '2rem', 
              sm: '2.5rem',
              md: '3rem',
            },
          }}
        >
          {IndividualPost.title}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {IndividualPost.subtitle}
        </Typography>
        <Image
          src={IndividualPost.image}
          alt=""
          layout="responsive"
          width={100}
          height={100}
        />
        {IndividualPost.text && (
          <Typography variant="body1" color="inherit">
            {IndividualPost.text}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Container>
);
