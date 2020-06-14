import React from 'react';
import { withRouter } from "react-router-dom";

class Home extends React.Component {
    render() {
      return (
        <div className="container-fluid">
            <p>Add User</p>
        </div>
      );
    }
  }

export default withRouter(Home);