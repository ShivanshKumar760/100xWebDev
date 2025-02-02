import react,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,Button,TextInput,Image,StyleSheet } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "a1813c5705cb15d0203702ed77f4023b"; // 🔴 Replace this with your OpenWeatherMap API key


export default function App()
{
  const [city,setCity]=useState("New Delhi");
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);

  const fetchWeather=async ()=>{
    if(!city.trim()) return ;
    setLoading(true);
    try {
      const response=await axios( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      alert("City Not Found");
    }
    setLoading(false);
  };


  useEffect(()=>{
    fetchWeather();
  },[]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>🌤️ Weather App</Text>
        <View style={styles.searchContainer}>
          <TextInput value={city} onChangeText={setCity} placeholder="Enter City" style={styles.input}/>
          <TouchableOpacity onPress={fetchWeather}><Text>Search</Text></TouchableOpacity>
        </View>
        {loading && <Text style={styles.loading}>Fetching weather...</Text>}

        {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <MaterialCommunityIcons 
            name={getWeatherIcon(weather.weather[0].main)}
            size={100}
            color="orange"
          />
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
      </View>
    </>
  )


}




const getWeatherIcon = (condition) => {
  const icons = {
    Clear: "weather-sunny",
    Clouds: "weather-cloudy",
    Rain: "weather-rainy",
    Snow: "weather-snowy",
    Thunderstorm: "weather-lightning",
    Drizzle: "weather-partly-rainy",
    Mist: "weather-fog",
  };
  return icons[condition] || "weather-cloudy";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  loading: {
    fontSize: 16,
    color: "gray",
  },
  weatherContainer: {
    alignItems: "center",
  },
  city: {
    fontSize: 22,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});
