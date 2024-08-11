'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header/header';
import { NewsPost } from '@/components/individualPost';
import { useFavorites } from '@/contexts/favouritesContext';
import { getPosts } from '@/utils/dataService';
import { useSearchParams } from 'next/navigation';
import { IndividualPost } from '@/types';

export default function IndividualPostPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const { toggleFavorite, favorites } = useFavorites();
  const [postData, setPostData] = useState<IndividualPost | null>(null);


  const fetchAndSetData = async (id: string) => {
    try {
      const allPostData = await getPosts();
      const filteredData = allPostData.find(
        (post: IndividualPost) => post.id === id
      );
      setPostData(filteredData);
    } catch (error) {
      console.error('Error fetching and filtering data:', error);
    }
  };

  useEffect(() => {
    fetchAndSetData(id);
  }, [id]);

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };
  const isFavorite = favorites.includes(id);
  const textToDisplay = isFavorite
  ? 'Von den Favoriten entfernen'
  : 'zu Favoriten hinzufügen';

  return (
    <main>
      <Header
        isFavoriteFilled={isFavorite}
        onFavoriteClick={handleToggleFavorite}
        textToDisplay={textToDisplay}
      />
      {postData && <NewsPost {...postData} />}
    </main>
  );
}
