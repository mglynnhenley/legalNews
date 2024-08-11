"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FavoritesContextData {
  favorites: string[]; 
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(
  undefined
);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: string) => {
    setFavorites([...favorites, item]);
  };

  const removeFromFavorites = (item: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== item);
    setFavorites(updatedFavorites);
  };

  const toggleFavorite = (id: string) => {
    const isFavorite = favorites.some((fav) => fav === id);
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
