import React from "react";
import { Col, Row, Container } from "react-bootstrap";
// import styled from "styled-components";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage/characterPage";
import GotService from "../../services/gotService";
import BookPage from "../pages/bookPage/bookPage";
import HousePage from "../pages/housesPage/housesPage";
import BooksItem from "../pages/booksItem/booksItem";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

// const BtnStyle = styled.button`
//   border-radius: 10px;
//   padding: 15px;
//   margin-bottom: 2.5em;
//   transition: all 0.2s ease-out;
//   :hover {
//     color: white;
//     background-color: black;
//   }
// `;

export default class App extends React.Component {
  constructor() {
    super();
    this.showRandomChar = this.showRandomChar.bind(this);
  }

  GotService = new GotService();

  state = {
    view: true,
    error: false,
    id: null,
  };
  componentDidMount() {}

  componentDidUpdate() {
    function Params() {
      let { id } = useParams();
      console.log({ id });
      return this.setState({
        id: { id },
      });
    }
    Params();
  }

  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }

  showRandomChar() {
    const { view } = this.state;
    if (view) {
      this.setState({
        view: false,
      });
    } else {
      this.setState({
        view: true,
      });
    }
  }

  render() {
    const { view } = this.state;

    const viewRandomChar = view ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, span: 5 }}>{viewRandomChar}</Col>
            </Row>
            <Routes>
              <Route path="/characters" element={<CharacterPage />} />
              <Route path="/houses" element={<HousePage />} />
              <Route path="/books" exact element={<BookPage />} />
              <Route
                path="/books/:id"
                element={<BooksItem bookid={this.state.id} />}
              />
            </Routes>
          </Container>
        </div>
      </Router>
    );
  }
}
