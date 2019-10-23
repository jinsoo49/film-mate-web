import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default function(props) {
  const {
    match: {
      params: { id }
    },
    location: { pathname },
    history: { push }
  } = props;

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMovie, setIsMovie] = useState(pathname.includes("/movie/"));

  async function LoadDetail() {
    setIsMovie(isMovie);
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      setError("can't find anything");
    } finally {
      console.log(result);
      setResult(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    LoadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DetailPresenter result={result} error={error} loading={loading} />;
}
