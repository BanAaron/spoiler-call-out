import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface SpoilerCalloutSettings {
    rgb: string;
}

const DEFAULT_SETTINGS: SpoilerCalloutSettings = {
    rgb: '138, 92, 245'
}

// noinspection JSUnusedGlobalSymbols
export default class SpoilerCallout extends Plugin {
    settings: SpoilerCalloutSettings;

    async onload() {
        await this.loadSettings();

        this.addCommand({
            id: 'insert-spoiler-callout',
            name: 'Insert spoiler callout',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection('> [!spoiler] Spoiler\n> Spoiler text');
            }
        });

        this.addCommand({
            id: 'insert-spoiler-callout-collapsable',
            name: 'Insert spoiler callout (collapsable)',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection('> [!spoiler]- Spoiler\n> Spoiler text');
            }
        });

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new SampleSettingTab(this.app, this));
    }

    onunload() {

    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class SampleSettingTab extends PluginSettingTab {
    plugin: SpoilerCallout;

    constructor(app: App, plugin: SpoilerCallout) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Colour')
            .setDesc('The colour of the spoiler callout in RGB (0-255)')
            .addText(text => text
                .setPlaceholder('255, 255, 255')
                .setValue(this.plugin.settings.rgb)
                .onChange(async (value) => {
                    this.plugin.settings.rgb = value;
                    await this.plugin.saveSettings();
                }));
    }
}
