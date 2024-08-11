
import { IconButton, Typography, styled } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '@/styles/header.scss'

type FavoriteButtonProps = {
  isFavoriteFilled: boolean;
  onFavoriteClick: () => void;
  textToDisplay?: string;
};


export default function FavoriteButton({
  isFavoriteFilled,
  onFavoriteClick,
  textToDisplay,
}: FavoriteButtonProps) {
  return (
    <IconButton
      edge="end"
      aria-label="other-icon"
      onClick={onFavoriteClick}
    >
      {isFavoriteFilled ? (
        <FavoriteIcon htmlColor="#fa5e6f" fontSize="large" />
      ) : (
        <FavoriteBorderIcon htmlColor="#fa5e6f" fontSize="large" />
      )}
      <Typography
        textAlign="left"
        variant="button"
        className='favorite-button-text'
        gutterBottom
        sx={{
          color: '#fa5e6f',
          paddingLeft: '1vw',
        }}
      >
        {textToDisplay}
      </Typography>
    </IconButton>
  );
}
