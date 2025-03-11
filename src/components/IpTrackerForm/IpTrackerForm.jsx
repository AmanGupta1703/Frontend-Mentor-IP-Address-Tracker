import React, { useRef, useEffect, useState } from "react";

import { useIpAddress } from "../../hooks/useIpAddress";
import { useFetch } from "../../hooks/useFetch";
import { IP_DOMAIN, IP_REGEX, startsWithNumber } from "../../utils";
import "./IpTrackerForm.css";

function IpTrackerForm() {
  const [ipAddresInput, setIpAddressInput] = useState("");
  const inputIpAddressRef = useRef(null);

  const { dispatch } = useIpAddress();

  const { data, error, loading } = useFetch(ipAddresInput);

  const handleSubmit = async function (ev) {
    ev.preventDefault();

    if (!ipAddresInput) return alert("IP Address required!");

    const isIpAddressValid = startsWithNumber.test(ipAddresInput)
      ? IP_REGEX.test(ipAddresInput)
      : IP_DOMAIN.test(ipAddresInput);

    if (!isIpAddressValid) return alert("Invalid IP Address provided!");

    if (error) {
      return alert("something went wrong in fetching data. Try again later...");
    }

    if (!error && !loading && Object.values(data).every((val) => val !== "")) {
      const {
        ip,
        location: { region, country, timezone, lat, lng },
        as: { asn },
        isp,
      } = data;

      const formattedData = {
        ipAddress: ip,
        location: `${region}, ${country} ${asn}`,
        timezone: `UTC ${timezone}`,
        isp,
        lat,
        lng,
      };
      dispatch({ type: "IPADDRESS/SET_DATA", payload: formattedData });
    } else {
      console.log(error);
      return alert("Error Occured... Please try again later.");
    }
  };

  const handleChange = function (ev) {
    const { value } = ev.target;
    setIpAddressInput(value);
  };

  useEffect(function () {
    inputIpAddressRef.current.focus();
  }, []);

  useEffect(
    function () {
      if (!IP_DOMAIN.test(ipAddresInput)) return;
      dispatch({ type: "IPADDRESS/SET_INPUT_VALUE", payload: ipAddresInput });
    },
    [ipAddresInput],
  );

  return (
    <form className="iptracker-form" onSubmit={handleSubmit}>
      <div className="iptracker-form__wrapper">
        <input
          className="input input--ip-address"
          required
          placeholder="Search for any IP address or domain"
          ref={inputIpAddressRef}
          value={ipAddresInput}
          onChange={handleChange}
        />
        <button className="btn btn--sm btn--submit" type="submit">
          <img src="/images/icon-arrow.svg" />
        </button>
      </div>
    </form>
  );
}

export default IpTrackerForm;
