import React from "react";
import { Layout, SideBar } from "./styles";

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import Calendar from "./Calendar";
import Slot from "./Calendar"

const renderAssistant = () => {
  return(
    <div>
      <Assistant />
    </div>
  );
}


class Assignment extends React.Component {
  render() {
    const assistants = []
    for (let i = 0; i < 20; i++) {
      assistants.push(renderAssistant());
    }

    return(
      <DndProvider backend={Backend}>
        <Layout>
          <SideBar>
            {assistants}
          </SideBar>
          <Calendar />
        </Layout>
      </DndProvider>
    );
  }
}

export default Assignment;