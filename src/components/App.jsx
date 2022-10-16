import { useState, useEffect } from 'react';
import { searchImage } from './API/API';
import { SearchBar } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage, ToastWrapper } from './Toast/Toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!query) return;

    const getImages = async (query, page) => {
      try {
        setIsLoaded(true);
        const data = await searchImage(query, page);
        if (data.length === 0) {
          setIsLoaded(false);
          return toastMessage();
        } else {
          setItems(prevState => [...prevState, ...data]);
          setIsLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImages(query, page);
  }, [page, query]);

  const handleLargeImage = image => {
    setLargeImage(image);
  };

  const handleFormSubmit = value => {
    if (query !== value) {
      setQuery(value);
      setPage(1);
      setItems([]);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const modalClose = () => {
    setLargeImage('');
  };

  return (
    <>
      <ToastWrapper />
      <SearchBar imageName={handleFormSubmit} />
      <ImageGallery items={items} handleLargeImage={handleLargeImage} />
      {items.length > 0 && <LoadMore onClick={loadMore}></LoadMore>}
      {isLoaded && <Loader>Loading...</Loader>}
      {largeImage && (
        <Modal onClose={modalClose}>
          <img src={largeImage} alt={query} />
        </Modal>
      )}
    </>
  );
};
