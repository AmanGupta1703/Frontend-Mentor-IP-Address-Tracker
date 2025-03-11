import React from "react";

import { Container, IpTrackerForm, IpDetailsBox } from "../";
import "./IpInfoContainer.css";

function IpInfoContainer() {
  return (
    <Container className="ip-info-container">
      <h1 className="primary-heading">IP Address Tracker</h1>
      <IpTrackerForm />
      <IpDetailsBox />
    </Container>
  );
}

export default IpInfoContainer;
