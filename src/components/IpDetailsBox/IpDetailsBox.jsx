import React from "react";

import { useIpAddress } from "../../hooks/useIpAddress";
import "./ip-details-box.css";

function IpDetailsBox() {
  const { data } = useIpAddress();

  const containValues = Object.values(data).every((val) => val !== "");

  return (
    <div
      className={`${
        containValues ? "ip-details-box-container contain" : "ip-details-box-container"
      } `}>
      <div className="ip-details-box">
        <h3 className="ip-details-box__heading">Ip Address</h3>
        <p className="ip-details-box__data">{data?.ipAddress || "-"}</p>
      </div>

      <div className="ip-details-box">
        <h3 className="ip-details-box__heading">Location</h3>
        <p className="ip-details-box__data">{data?.location || "-"}</p>
      </div>

      <div className="ip-details-box">
        <h3 className="ip-details-box__heading">Timezone</h3>
        <p className="ip-details-box__data">{data?.timezone || "-"}</p>
      </div>

      <div className="ip-details-box">
        <h3 className="ip-details-box__heading">Isp</h3>
        <p className="ip-details-box__data">{data?.isp || "-"}</p>
      </div>
    </div>
  );
}

export default IpDetailsBox;
