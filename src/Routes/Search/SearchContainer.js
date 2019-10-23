import React, { useState, useEffect } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default function() {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault(); // enter으로 submit 되는것을 방지
    if (searchTerm !== "") {
      SearchByTerm(searchTerm);
    }
  };

  const updateTerm = event => {
    const {
      target: { value }
    } = event;
    setSearchTerm(value);
  };

  const SearchByTerm = async function SearchData(term) {
    setLoading(true);
    // const { searchTerm } = search;
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch {
      setError("can't find results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    SearchByTerm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
}
