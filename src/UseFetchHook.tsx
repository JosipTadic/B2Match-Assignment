import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useFetch = (url: string) => {
  interface IFoods {
    results: IResults[];
    meta: IMetaResults;
  }
  interface IResults {
    event_id: number;
    product_description: string;
    country: string;
    city: string;
    address: string;
    reason_for_recall: string;
    classification: string;
    distribution_pattern: string;
    recalling_firm: string;
  }
  interface IMetaResults {
    results: ITotal;
  }
  interface ITotal {
    limit: number;
    skip: number;
    total: number;
  }

  const [foods, setFoods] = useState<IFoods>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("effect");
    axios.get<IFoods>(url).then((response: AxiosResponse) => {
      setFoods(response.data);
      setLoading(false);
    });
  }, [url]);
  console.log("render", foods, "foods");

  return { foods, loading };
};

export default useFetch;
