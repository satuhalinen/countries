import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout, auth, db } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function fetchUserName() {
      if (user) {
        const citiesRef = collection(db, "users");
        const q = query(citiesRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserName(doc.data().name);
        });
      } else {
        setUserName(null);
      }
    }
    fetchUserName();
  }, [user]);

  return (
    <Container fluid>
      <Row>
        <Navbar style={{ backgroundColor: "rgb(186 230 142)" }}>
          <Container fluid className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="navbar_collapse" id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                {user ? (
                  <Link to="/countries">
                    <Button variant="contained">Countries</Button>
                  </Link>
                ) : null}
                {user ? (
                  <Link to="/favourites">
                    <Button variant="contained">Favourites</Button>
                  </Link>
                ) : null}
                {!user ? (
                  <Link to="/register">
                    <Button variant="contained">Register</Button>
                  </Link>
                ) : null}
                {!user ? (
                  <Link to="/login">
                    <Button
                      style={{
                        backgroundColor: "#6A8D73",
                        borderColor: "#6A8D73",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                ) : null}
                {user ? (
                  <Link>
                    <Button
                      style={{
                        backgroundColor: "rgb(41 128 64)",
                        borderColor: "rgb(41 128 64)",
                      }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Link>
                ) : null}
              </Nav>
              <p className="helloParagraph">
                {userName ? `Hello ${userName}!` : "Welcome!"}
              </p>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
