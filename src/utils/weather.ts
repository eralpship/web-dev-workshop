import Brightness7Outlined from "@mui/icons-material/Brightness7Outlined";
import CloudQueueOutlined from "@mui/icons-material/CloudQueueOutlined";
import FilterDramaOutlined from "@mui/icons-material/FilterDramaOutlined";
import CloudOutlined from "@mui/icons-material/CloudOutlined";
import LensBlurOutlined from "@mui/icons-material/LensBlurOutlined";
import GrainOutlined from "@mui/icons-material/GrainOutlined";
import FlashOnOutlined from "@mui/icons-material/FlashOnOutlined";
import AcUnitOutlined from "@mui/icons-material/AcUnitOutlined";
import InvertColorsOutlined from "@mui/icons-material/InvertColorsOutlined";
import NightsStayOutlined from "@mui/icons-material/NightsStayOutlined";
import WindPowerOutlined from "@mui/icons-material/WindPowerOutlined";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

// Based on https://developer.accuweather.com/weather-icons
export const accuWeatherIconMap: { [key: number]: SvgIconComponent } = {
  1: WbSunnyOutlined, // Sunny
  2: Brightness7Outlined, // Mostly Sunny
  3: CloudOutlined, // Partly Sunny
  4: CloudQueueOutlined, // Intermittent Clouds
  5: FilterDramaOutlined, // Hazy Sunshine
  6: CloudOutlined, // Mostly Cloudy
  7: CloudOutlined, // Cloudy
  8: CloudOutlined, // Dreary (Overcast)
  11: LensBlurOutlined, // Fog
  12: GrainOutlined, // Showers
  13: GrainOutlined, // Mostly Cloudy w/ Showers
  14: GrainOutlined, // Partly Sunny w/ Showers
  15: FlashOnOutlined, // T-Storms
  16: FlashOnOutlined, // Mostly Cloudy w/ T-Storms
  17: FlashOnOutlined, // Partly Sunny w/ T-Storms
  18: GrainOutlined, // Rain
  19: AcUnitOutlined, // Flurries
  20: AcUnitOutlined, // Mostly Cloudy w/ Flurries
  21: AcUnitOutlined, // Partly Sunny w/ Flurries
  22: AcUnitOutlined, // Snow
  23: AcUnitOutlined, // Mostly Cloudy w/ Snow
  24: AcUnitOutlined, // Ice
  25: AcUnitOutlined, // Sleet
  26: InvertColorsOutlined, // Freezing Rain
  29: AcUnitOutlined, // Rain and Snow
  30: WbSunnyOutlined, // Hot
  31: AcUnitOutlined, // Cold
  32: WindPowerOutlined, // Windy
  33: NightsStayOutlined, // Clear (Night)
  34: NightsStayOutlined, // Mostly Clear (Night)
  35: NightsStayOutlined, // Partly Cloudy (Night)
  36: NightsStayOutlined, // Intermittent Clouds (Night)
  37: NightsStayOutlined, // Hazy Moonlight
  38: NightsStayOutlined, // Mostly Cloudy (Night)
  39: GrainOutlined, // Partly Cloudy w/ Showers (Night)
  40: GrainOutlined, // Mostly Cloudy w/ Showers (Night)
  41: FlashOnOutlined, // Partly Cloudy w/ T-Storms (Night)
  42: FlashOnOutlined, // Mostly Cloudy w/ T-Storms (Night)
  43: AcUnitOutlined, // Mostly Cloudy w/ Flurries (Night)
  44: AcUnitOutlined, // Mostly Cloudy w/ Snow (Night)
};
