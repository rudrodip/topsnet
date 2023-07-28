'use client'

import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { ZenodoData } from '@src/apiWrapper/types';
import zenodoApi from '@src/apiWrapper/zenodoApiWrapper';

export interface ExplorerContextType {
  data: ZenodoData | null,
  setData: Dispatch<SetStateAction<ZenodoData | null>>
}

const ExplorerContext = createContext<ExplorerContextType>({
  data: null,
  setData: () => {}
});

const useExplorerContext = () => React.useContext(ExplorerContext);

const ExplorerContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ZenodoData | null>(null);

  useEffect(() => {
    if (!data) {
      console.log("Fetching data from API...");
      zenodoApi
        .getRecords({ size: 6 })
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  return (
    <ExplorerContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </ExplorerContext.Provider>
  );
};



export { ExplorerContext, ExplorerContextProvider, useExplorerContext }