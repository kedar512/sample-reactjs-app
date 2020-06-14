import React from 'react';
import { withRouter } from "react-router-dom";

class UpdateUser extends React.Component {
    render() {
      return (
        <div className="container-fluid">
            <p>Update User</p>
        </div>
      );
    }
  }

export default withRouter(UpdateUser);