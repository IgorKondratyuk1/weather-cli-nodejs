import chalk from "chalk";
import dedent from "dedent-js";

const printError = (message) => {
	console.log(chalk.bgRed("ERROR " + message));
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen("SUCCESS " + message));
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(" HELP ")}
		Without parameters - weather output 
		-s [CITY] - set your city
		-h - help output
		-t [API_KEY] - seve token`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgBlue(" Weather ")} In city ${res.name} 
		${icon}  ${res.weather[0].description}
		Temperature now: ${res.main.temp} C
		Feels like: ${res.main.feels_like} C
		Temperature: Max: ${res.main.temp_max} C / Min: ${res.main.temp_min} C
		Wind speed: ${res.wind.speed} m/s
		Humidity: ${res.main.humidity} %
		Clouds speed: ${res.clouds.all} %`
	);
}

export { printError, printSuccess, printHelp, printWeather };