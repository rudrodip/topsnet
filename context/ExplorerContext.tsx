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
  setData: () => { },
  liked: [],
  setLiked: () => { },
  pinned: [],
  setPinned: () => { },
  addToLiked: () => { },
  removeFromLiked: () => { },
  addToPinned: () => { },
  removeFromPinned: () => { },
});

const useExplorerContext = () => React.useContext(ExplorerContext);

const ExplorerContextProvider = ({ children }: { children: ReactNode }) => {
  // Use state to hold the ZenodoData, liked, and pinned arrays and their setter functions
  const [data, setData] = useState<ZenodoData | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [pinned, setPinned] = useState<number[]>([]);

  // Get the user from the AuthContext (assuming it provides the user)
  const { user } = useAuthContext();

  // Use useEffect to fetch the data from the API or user-specific recommendations
  useEffect(() => {
    // Check if data is not already set to prevent unnecessary API calls
    if (!data) {
      console.log("Fetching data from API...");

      if (user) {
        // Prepare a temporary object to hold the fetched data
        let dataTemp: ZenodoData = {
          hits: {
            hits: [],
            total: 0
          },
        };

        // Fetch the recommended data for the user
        getUserData(user)
          .then((res) => {
            if (res) {
              // Set the liked and pinned arrays from the user data
              setLiked(res.liked);
              setPinned(res.pinned);

              // If there are recommended items, fetch them from the API
              const promises = res.recommended.map((id) =>
                zenodoApi.getRecord(id.toString())
              );

              // Wait for all the API calls to complete using Promise.all
              Promise.all(promises)
                .then((results) => {
                  // Once all the data is fetched, update the temporary object
                  dataTemp.hits.hits = results;
                  // Set the updated data into the state
                  setData(dataTemp);
                })
                .catch((err) => console.log(err));
            } else {
              // If there are no recommended items, set the empty data object
              setData(dataTemp);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // If there's no user, fetch the default data
        zenodoApi
          .getRecords({ size: 6 })
          .then((res) => {
            // Set the fetched data into the state
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
    addLike(user, id);
  };

  // Function to remove an ID from the liked array
  const removeFromLiked = (id: number) => {
    setLiked((prevLiked) => prevLiked.filter((item) => item !== id));
    removeLike(user, id);
  };

  // Function to add an ID to the pinned array
  const addToPinned = (id: number) => {
    setPinned((prevPinned) => [...prevPinned, id]);
    addPinned(user, id);
  };

  // Function to remove an ID from the pinned array
  const removeFromPinned = (id: number) => {
    setPinned((prevPinned) => prevPinned.filter((item) => item !== id));
    removePinned(user, id);
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
