// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const request = require('request-promise');

const URL = 'https://www.toutiao.com/stream/widget/local_weather/data';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	try {
		const response = await request({url: URL, json: true});
		const {city, weather:{day_condition, high_temperature, low_temperature}} = response.data;
		barItem.text = `${city} ${day_condition} ${low_temperature}°c ~ ${high_temperature}°c `;
	} catch (error) {
		barItem.text = '获取天气失败';
	}
	barItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}
