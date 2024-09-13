import {useGetProductsApi, useGetTagsApi} from '@src/api';
import {Tag} from '@src/types';
import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';

interface IAppContext {
  tags: Tag[];
  selectedTag?: string;
  setSelectedTag: Dispatch<React.SetStateAction<string | undefined>>;
}

export const AppContext = createContext<IAppContext>({
  tags: [],
  selectedTag: undefined,
  setSelectedTag: () => {},
});

interface AppContextProvideProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppContextProvideProps> = ({children}) => {
  const {tags, syncronizeTags} = useGetTagsApi();
  const {products, syncronizeProducts} = useGetProductsApi();
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (products && tags) {
      syncronizeProducts();
    }
  }, [products, tags]);

  useEffect(() => {
    if (tags) {
      syncronizeTags();
    }
  }, [tags]);

  return (
    <AppContext.Provider
      value={{
        tags: tags ?? [],
        selectedTag,
        setSelectedTag,
      }}>
      {children}
    </AppContext.Provider>
  );
};
