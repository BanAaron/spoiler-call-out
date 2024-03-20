import { Notice, Plugin } from 'obsidian';

interface SpoilerCalloutSettings {
}

const DEFAULT_SETTINGS: SpoilerCalloutSettings = {}

export default class SpoilerCallout extends Plugin {
    settings: SpoilerCalloutSettings;

    async onload() {
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
