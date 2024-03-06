import GoogleMapReact from "google-map-react";

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Map = ({ country }) => {
  const defaultProps = {
    center: {
      lat: country.capitalInfo.latlng[0],
      lng: country.capitalInfo.latlng[1],
    },
    zoom: 8,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: VITE_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
