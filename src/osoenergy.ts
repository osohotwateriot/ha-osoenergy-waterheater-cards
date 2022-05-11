import { version } from "../package.json";
import "./utils/form/custom/ha-selector-oso-energy-action";
import "./utils/form/custom/ha-selector-oso-energy-color";
import "./utils/form/custom/ha-selector-oso-energy-info";
import "./utils/form/custom/ha-selector-oso-energy-alignment";

export { WaterHeaterProfileCard } from "./cards/water-heater-profile-card/water-heater-profile-card";
export { WaterHeaterInfoCard } from "./cards/water-heater-info-card/water-heater-info-card";

console.info(`%c OSO Energy - ${version}`, "color: #ef5350; font-weight: 700;");
