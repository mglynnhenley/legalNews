'use client';

import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Header from './components/header/header';
import PostList from './components/postFeed/postList';
import EnterEmail from './components/emailInput';
import { useFavorites } from './contexts/favouritesContext';
import { getPosts } from './utils/dataService';
import { Trie } from './utils/search';
import { IndividualPost, Posts } from './types';

const filterPostsByFavorites = (data: Posts, favorites: string[]) =>
  data.filter((individualPost: IndividualPost) =>
    favorites.includes(individualPost.id)
  );

function PostFeed() {
  const { favorites } = useFavorites();
  const [data, setData] = useState<Posts>([]);
  const [searchTrie, setSearchTrie] = useState(new Trie());
  const [showFavoritePosts, setShowFavoritePosts] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const toggleFavoritePosts = () => {
    setShowFavoritePosts(!showFavoritePosts);
  };

  const fetchAndSetData = async () => {
    try {
      const allPostData = await getPosts();
      const newSearchTrie = new Trie();

      allPostData.forEach((individualPost: IndividualPost) => {
        newSearchTrie.insert(individualPost.title, individualPost);
        newSearchTrie.insert(individualPost.subtitle, individualPost);
      });

      setData(allPostData);
      setSearchTrie(newSearchTrie);
    } catch (error) {
      console.error('Error fetching and filtering data:', error);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    const filteredPosts = searchTrie.search(searchValue);
    setData(Array.from(filteredPosts));
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const filteredPosts = showFavoritePosts
    ? filterPostsByFavorites(data, favorites)
    : data;

  return (
    <main>
      <Header
        isFavoriteFilled={showFavoritePosts}
        onFavoriteClick={toggleFavoritePosts}
        onSearchInputChange={handleSearch}
        textToDisplay="mein Lieblings"
      ></Header>
      <Grid container justifyContent="center" paddingTop={8} paddingBottom={8}>
        <PostList postsToDisplay={filteredPosts} searchText={searchValue} />
      </Grid>
      <EnterEmail />
    </main>
  );
}

export default PostFeed;
