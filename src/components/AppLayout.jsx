import React from "react";

import { IpInfoContainer, IpTrackerMap } from "../components";

function AppLayout() {
  return (
    <section className="app-layout">
      <IpInfoContainer />
      <IpTrackerMap />
    </section>
  );
}

export default AppLayout;
