import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

    const getCountry = async () => {
      try {
        const response = await axios.get(url);
        setCountry({ found: true, data: response.data[0] });
      } catch (e) {
        setCountry({ found: false, data: {} });
      }
    }
    getCountry()

  }, [name])

  return country
};