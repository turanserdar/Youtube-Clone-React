import { createContext, useEffect, useState } from 'react';
import { categories } from '../constants';
import { getData } from '../utils/getData';

// 1) create the context foundation
export const YoutubeContext = createContext();

// 2) provide the data held in the context to the app
export const YoutubeProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]
  );
  const [videos, setVideos] = useState(null);

  // fetch the relevant data from the API whenever the selectedCategory changes
  useEffect(() => {
    // clear previous data when fetching new data
    setVideos(null);

    // if the selected category type is 'home' or 'trending',
    // fetch data by the category type name
    if (
      selectedCategory.type === 'home' ||
      selectedCategory.type === 'trending'
    ) {
      getData(`/${selectedCategory.type}`).then((data) =>
        setVideos(data.data)
      );
    }

    // if the selected category type is 'category',
    // make a request to the search endpoint
    if (selectedCategory.type === 'category') {
      getData(`/search?query=${selectedCategory.name}`).then((data) =>
        setVideos(data.data)
      );
    }
  }, [selectedCategory]);

  return (
    <YoutubeContext.Provider
      value={{ selectedCategory, setSelectedCategory, videos }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};
