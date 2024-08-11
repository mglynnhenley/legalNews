import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IndividualPost } from '@/types';
import Link from 'next/link';
import { useFavorites } from '@/contexts/favouritesContext';
import FavoriteButton from '../favouriteButton';

type IndividualPostWithSearchText = IndividualPost & { searchText: string };

const Item: React.FC<IndividualPostWithSearchText> = ({
  id,
  image,
  title,
  subtitle,
  type,
  searchText,
}) => {
  const { toggleFavorite, favorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav === id);
  const onClickFavorite = () => toggleFavorite(id);
  const favoriteButtonText = isFavorite
    ? 'Von den Favoriten entfernen'
    : 'zu Favoriten hinzufügen';

  const makeTextBold = (text: string, searchText: string) => {
    if (!searchText) return text;
    const regex = new RegExp(`\\b(${searchText})`, 'gi');
    return text.split(regex).map((match, index) => {
      // The first element in the array is the matched text, so make bold
      if (index === 1) {
        return <strong key={index}>{match}</strong>;
      }
      return match;
    });
  };

  return (
    <Card sx={{ m: 1 }}>
      <Link
        href={{
          pathname: '/post',
          query: {
            id: id,
          },
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="100" image={image} alt={title} />
          <CardContent>
            {type == 'NEWS' && (
              <Typography
                variant="button"
                color="text.secondary"
                gutterBottom
              >
                {type}
              </Typography>
            )}
            <Typography gutterBottom variant="h5" component="div">
              {makeTextBold(title, searchText)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {makeTextBold(subtitle, searchText)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <FavoriteButton
          isFavoriteFilled={isFavorite}
          onFavoriteClick={onClickFavorite}
          textToDisplay={favoriteButtonText}
        ></FavoriteButton>
      </CardActions>
    </Card>
  );
};

export default Item;
