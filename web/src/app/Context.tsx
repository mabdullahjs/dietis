import React, { createContext, useState } from "react";
import { type ContextType } from "../types/contextType";

export const MyContext = createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode
}

const Context: React.FC<Props> = (props: Props) => {
  const [mainMenu, setMainMenu] = useState<string>("Teams");
  const [selectLeader, setSelectLeader] = useState<boolean>(false);

  const mainMenuHandler = (value: string): any => {
    setMainMenu(value);
  };

  const selectUnassignLeaderHandler = (): any => {
    setSelectLeader(!selectLeader);
  };

  return (
    <MyContext.Provider
      value={{
        mainMenu,
        mainMenuHandler,
        selectLeader,
        selectUnassignLeaderHandler
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;
