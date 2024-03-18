import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import Map from "../components/Map";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const country = location.state ? location.state.country : null;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API}`
      )
      .catch(() => {
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country]);

  if (loading || !country) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="grow"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <>
      <Container>
        <Row className="m-5">
          <Col>
            {" "}
            <Image
              thumbnail
              src={`https://source.unsplash.com/featured/1600x900?${country.capital}`}
            />
          </Col>
          <Col>
            <h2 className="display-4">{country.name.common}</h2>
            <h3>Capital {country.capital}</h3>
            {!error && weather && (
              <div>
                <p>
                  Right now it is <strong>{weather.main.temp}</strong> degrees
                  in {country.capital} and {weather.weather[0].description}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="light" onClick={() => navigate("/countries")}>
              Back to Countries
            </Button>
            <Map country={country}></Map>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CountriesSingle;
