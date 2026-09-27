import { useState } from "react";
import { useNavigate } from "react-router-dom";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const cities = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
  ],

  "Arunachal Pradesh": [
    "Itanagar",
    "Naharlagun",
  ],

  Assam: [
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
  ],

  Bihar: [
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
    "Darbhanga",
    "Purnia",
    "Ara",
  ],

  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Bilaspur",
  ],

  Goa: [
    "Panaji",
    "Margao",
    "Vasco da Gama",
  ],

  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
  ],

  Haryana: [
    "Gurugram",
    "Faridabad",
    "Panipat",
    "Ambala",
  ],

  "Himachal Pradesh": [
    "Shimla",
    "Manali",
    "Dharamshala",
  ],

  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
  ],

  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubballi",
  ],

  Kerala: [
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur",
  ],

  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
  ],

  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
  ],

  Manipur: [
    "Imphal",
  ],

  Meghalaya: [
    "Shillong",
    "Tura",
  ],

  Mizoram: [
    "Aizawl",
  ],

  Nagaland: [
    "Kohima",
    "Dimapur",
  ],

  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
  ],

  Punjab: [
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
  ],

  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
  ],

  Sikkim: [
    "Gangtok",
  ],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
  ],

  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
  ],

  Tripura: [
    "Agartala",
  ],

  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Prayagraj",
    "Agra",
    "Noida",
    "Ghaziabad",
  ],

  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Rishikesh",
  ],

  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Siliguri",
  ],
};

const cinemas = {
  Patna: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Gaya: [
    "PVR Cinemas",
    "INOX",
  ],

  Mumbai: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Delhi: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Bengaluru: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Kolkata: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Hyderabad: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],

  Pune: [
    "PVR Cinemas",
    "INOX",
    "Cinepolis",
  ],
};

const defaultCinemas = [
  "PVR Cinemas",
  "INOX",
  "Cinepolis",
];

function Location() {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  const availableCities =
    cities[selectedState] || [];

  const availableCinemas =
    cinemas[selectedCity] || defaultCinemas;

  const handleStateChange = (event) => {
    const state = event.target.value;

    setSelectedState(state);
    setSelectedCity("");
    setSelectedCinema("");
  };

  const handleCityChange = (event) => {
    const city = event.target.value;

    setSelectedCity(city);
    setSelectedCinema("");
  };

  const handleContinue = () => {
    if (
      !selectedState ||
      !selectedCity ||
      !selectedCinema
    ) {
      alert(
        "Please select State, City and Cinema."
      );
      return;
    }

    navigate("/movies", {
      state: {
        state: selectedState,
        city: selectedCity,
        cinema: selectedCinema,
      },
    });
  };

  return (
    <div className="location-page">

      <div className="location-container">

        {/* Header */}

        <div className="location-header">

          <div className="location-icon">
            📍
          </div>

          <h1>Select Your Location</h1>

          <p>
            Select your state, city and cinema
            to book your movie tickets.
          </p>

        </div>

        {/* State */}

        <div className="location-field">

          <label>
            🇮🇳 Select State
          </label>

          <select
            value={selectedState}
            onChange={handleStateChange}
          >

            <option value="">
              Select State
            </option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}

          </select>

        </div>

        {/* City */}

        <div className="location-field">

          <label>
            🏙️ Select City
          </label>

          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >

            <option value="">
              {selectedState
                ? "Select City"
                : "First Select State"}
            </option>

            {availableCities.map((city) => (
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            ))}

          </select>

        </div>

        {/* Cinema */}

        <div className="location-field">

          <label>
            🎬 Select Cinema
          </label>

          <select
            value={selectedCinema}
            onChange={(event) =>
              setSelectedCinema(
                event.target.value
              )
            }
            disabled={!selectedCity}
          >

            <option value="">
              {selectedCity
                ? "Select Cinema"
                : "First Select City"}
            </option>

            {availableCinemas.map(
              (cinema) => (
                <option
                  key={cinema}
                  value={cinema}
                >
                  {cinema}
                </option>
              )
            )}

          </select>

        </div>

        {/* Continue Button */}

        <button
          className="location-continue-btn"
          onClick={handleContinue}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default Location;