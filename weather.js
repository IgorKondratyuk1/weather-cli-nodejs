#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token didn`t entered');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved')
	}
	catch(e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('City didn`t entered');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	}
	catch(e) {
		printError(e.message);
	}
};

// Get weather
const getForcast = async () => {
	const city = await getKeyValue(TOKEN_DICTIONARY.city);

	try {
		const weather = await getWeather(city);
		
		printWeather(weather, getIcon(weather.weather[0].icon));
	}
	catch(err) {
		if (err?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (err?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(err.message);
		}
	}
};

const initCLI = async () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}

	if (args.s) {
		await saveCity(args.s);
	}

	if (args.t) {
		await saveToken(args.t);
	}

	getForcast();
};

initCLI();