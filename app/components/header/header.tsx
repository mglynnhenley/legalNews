'use client';

import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import { Toolbar, IconButton, styled, Box } from '@mui/material';
import Link from 'next/link';
import SearchBar from './searchBar';
import FavoriteButton from '../favouriteButton';
import '@/styles/header.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
interface HeaderProps {
  isFavoriteFilled: boolean;
  onFavoriteClick: () => void;
  onSearchInputChange?: (searchValue: string) => void;
  textToDisplay?: string;
}

export default function Header({
  isFavoriteFilled,
  onFavoriteClick,
  onSearchInputChange,
  textToDisplay
}: HeaderProps) {
  
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Link href={'/'}>
            <div className="logo-container">
              <Image
                src="/logo-fine.svg"
                alt="Fine Logo"
                className="logo"
                fill={true}
                priority
              />
            </div>
          </Link>
        </IconButton>
        {onSearchInputChange && (
          <SearchBar onSearchInputChange={onSearchInputChange} searchDelay={100} />
        )}
        <FavoriteButton
          isFavoriteFilled={isFavoriteFilled}
          onFavoriteClick={onFavoriteClick}
          textToDisplay={textToDisplay}
        ></FavoriteButton>
      </Toolbar>
    </AppBar>
  );
}
