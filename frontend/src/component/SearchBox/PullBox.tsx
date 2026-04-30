import { searchCity } from "../../utils/cities";
import { useCityData } from "../../stores/cityData";
interface PullBoxProps {
  cityName: string;
}
export const PullBox = ({ cityName }: PullBoxProps) => {
    const {setCityData} = useCityData()
  const cities = searchCity(cityName);
  if (!cities || cities.length === 0) {
    return null;
  }
  const handleClick = (cityName:string) =>{
    setCityData(cityName)
  }
  return (
    <ul className='searchingUl'>
      {cities.map((city) => (
        <li key={city.code} onClick={()=>handleClick(city.name)}>{city.name}</li>
      ))}
    </ul>
  );
};
