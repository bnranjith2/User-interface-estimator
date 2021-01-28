import React from "react";
// import Sidebarbuttons from "../../components/Sidebarbuttons";
import Addcomponent from "../../components/Addcomponent";
import './examplecontainer.css';

const Examplecontainer = () => {
  return (
    <div className = 'example-container'>
      <h1>Deadline Estimator Components</h1>
      
      {/* <div className = 'example-container__sidebar-buttons'>
        <h2>Sidebar Buttons</h2>
        <Sidebarbuttons/>
        -------------------------------------------
      </div> */}

      <div className = 'example-container__add-component'>
        <h2>Add Component</h2>
        <Addcomponent/>
        --------------------------------------------------------
      </div>

    </div>
  );
};


export default Examplecontainer;
