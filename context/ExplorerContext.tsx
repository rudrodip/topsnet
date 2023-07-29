'use client'
import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { ZenodoData } from '@src/apiWrapper/types';
import zenodoApi from '@src/apiWrapper/zenodoApiWrapper';
import { useAuthContext } from './AuthContext';
import { getUserData } from '@src/firebase/getUserData';
import { addLike, removeLike, addPinned, removePinned } from '@src/firebase/firestore_utils';

export interface ExplorerContextType {
  data: ZenodoData | null;
  setData: Dispatch<SetStateAction<ZenodoData | null>>;
  liked: number[];
  setLiked: Dispatch<SetStateAction<number[]>>;
  pinned: number[];
  setPinned: Dispatch<SetStateAction<number[]>>;
  addToLiked: (id: number) => void;
  removeFromLiked: (id: number) => void;
  addToPinned: (id: number) => void;
  removeFromPinned: (id: number) => void;
}

const ExplorerContext = createContext<ExplorerContextType>({
  data: null,
  setData: () => {},
  liked: [],
  setLiked: () => {},
  pinned: [],
  setPinned: () => {},
  addToLiked: () => {},
  removeFromLiked: () => {},
  addToPinned: () => {},
  removeFromPinned: () => {},
});

const useExplorerContext = () => React.useContext(ExplorerContext);

const ExplorerContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ZenodoData | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [pinned, setPinned] = useState<number[]>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    if (!data) {
      console.log("Fetching data from API...");

      if (user) {
        let dataTemp: ZenodoData = {
          hits: {
            hits: [],
            total: 0
          },
        };

        getUserData(user)
          .then((res) => {
            if (res) {
              setLiked(res.liked);
              setPinned(res.pinned);

              const promises = res.recommended.map((id) =>
                zenodoApi.getRecord(id.toString())
              );

              Promise.all(promises)
                .then((results) => {
                  dataTemp.hits.hits = results;
                  setData(dataTemp);
                })
                .catch((err) => console.log(err));
            } else {
              setData(dataTemp);
            }
          })
          .catch((err) => console.log(err));
      } else {
        zenodoApi
          .getRecords({ size: 6 })
          .then((res) => {
            setData(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [data, user]);

  // Function to add an ID to the liked array
  const addToLiked = (id: number) => {
    setLiked((prevLiked) => [...prevLiked, id]);
    addLike(user, id)
  };

  // Function to remove an ID from the liked array
  const removeFromLiked = (id: number) => {
    setLiked((prevLiked) => prevLiked.filter((item) => item !== id))
    removeLike(user, id);
  };

  // Function to add an ID to the pinned array
  const addToPinned = (id: number) => {
    setPinned((prevPinned) => [...prevPinned, id]);
    addPinned(user, id)
  };

  // Function to remove an ID from the pinned array
  const removeFromPinned = (id: number) => {
    setPinned((prevPinned) => prevPinned.filter((item) => item !== id));
    removePinned(user, id)
  };

  return (
    <ExplorerContext.Provider
      value={{
        data: data,
        setData: setData,
        liked: liked,
        setLiked: setLiked,
        pinned: pinned,
        setPinned: setPinned,
        addToLiked: addToLiked,
        removeFromLiked: removeFromLiked,
        addToPinned: addToPinned,
        removeFromPinned: removeFromPinned,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export { ExplorerContext, ExplorerContextProvider, useExplorerContext };
