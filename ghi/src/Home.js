import { useState, useEffect } from "react";
import AllMyLikes from "./components/AllMyLikes";

const Home = () => {
  const [likes, setLikes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArts();
  }, []);

}
