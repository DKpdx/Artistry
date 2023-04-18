import { useEffect, useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import Construct from './Construct.js';
import { AuthContext } from '@galvanize-inc/jwtdown-for-react';
import LoginForm from './LoginForm.js';
import CreateAccountForm from './CreateAccountForm.js';
import ErrorNotification from './ErrorNotification';
import FetchLikesBtn from "./components/FetchLikesBtn.js";
import Alert from './components/AlertNoLikes.js'
import Nav from "./Nav.js";
import './App.css';


const App = () => {

  const { token } = useContext(AuthContext)
  console.log(token)

  const [alertSee, setAlertSee] = useState(false)
  const [likes, setLikes] = useState([])

  const getLikes = async () => {
    const likesBy = '/likes/{liked_by}'
    const response = await fetch(likesBy);
    if (response.ok) {
      const data = await response.json();
      const likes = data.likes;
      setLikes(likes)
    }
  }

  useEffect(() => {
    getLikes();
  }, [])

  const [cardData, setCardData] = useState([]);
  const [visible, setVisible] = useState(5);

  const allCardData = async () => {
    const response = await axios.get('https://randomuser.me/api/?results=35')
    setCardData(response.data.results)
  }

  const loadMore = () => {
    setVisible(visible + 5)
  }

  useEffect(() => {
    allCardData()
  }, [])

  return (
    <>
  <div className="App">{cardData.slice(0, visible).map(renderCard)}
  </div>
    <div>
      {alertSee && <Alert>My alert</Alert>}
      <FetchLikesBtn onClick={() => setAlertSee(true)}>
        Show Likes
      </FetchLikesBtn>
    </div>
    <Nav />
    <Routes>
      <Route path="/likes/liked_by_id" element={<FetchLikesBtn />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/accounts" element={<CreateAccountForm />} />
    </Routes>
  </>
);
};
const renderCard = (art_id, indexedDB) => {
  return (
    <Card style={{ width: "18rem"}}>
      <Card.Img variant="top" src={art_id.art_pic_url} />
      <Card.Body>
        <Card.Title>
          {art_id.title}
        </Card.Title>
          <Card.Text>
            <ul>
              <li>{art_id.art_pic_url}</li>
              <li>{art_id.title}</li>
            </ul>
          </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default App;
