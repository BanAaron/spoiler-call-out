import { Editor, MarkdownView, Plugin } from 'obsidian';

interface SpoilerCalloutSettings {
}

const DEFAULT_SETTINGS: SpoilerCalloutSettings = {}

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
