// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// const request = require('request-promise');
import * as request from 'request-promise';

const URL = 'https://www.toutiao.com/stream/widget/local_weather/data';
let barItem: any;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function getWeatherData() {
	let barStr = '获取天气失败';
	const {weather, temperature, city: cityConfig} = vscode.workspace.getConfiguration('weather');
	try {
		const response = await request({url: URL, json: true});
		const {city, weather:{day_condition, high_temperature, low_temperature}} = response.data;
		barStr = '';
		if (cityConfig.display) {
			barStr += `${city} `;
		}
		if (temperature.display) {
			barStr += `${day_condition} `;
		}
		if (weather.display) {
			barStr += `${low_temperature}°c ~ ${high_temperature}°c`;
		}
	} catch(error) {
		vscode.window.showInformationMessage(error);
	}
	return barStr;
}

async function display() {
	if (!barItem) {
		barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	}
	barItem.text = await getWeatherData();
	barItem.show();
}

export async function activate(context: vscode.ExtensionContext) {
	await display();
	let disposable = vscode.commands.registerCommand('weather.refresh', async () => {
		await display();
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
