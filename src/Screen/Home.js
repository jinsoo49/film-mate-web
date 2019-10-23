import React, { useState } from "react";
import { moviesApi } from "../api";

function GetHomePage() {
  const [state, setState] = useState();

  const getHomeData = async () => {
    try {
      const { data } = await moviesApi.nowPlaying();
      console.log(data);
      setState({
        state: data
      });
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   getHomeData(), [];
  // });

  return (
    <div>
      <p>{getHomeData.data}</p>
    </div>
  );
}

export default GetHomePage;
