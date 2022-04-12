const useLocalstorage = () => {
  const handleSetLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const handleGetLocalStorage = (key) => {
    return localStorage.getItem(key);
  };

  return {
    handleGetLocalStorage,
    handleSetLocalStorage
  };
};

export default useLocalstorage;
