import {defineStore} from "pinia";
import {mergeDeep, uuidv4} from './util';


const storage_key = 'urltk_pinia_state';

const defaultState = {
    storage_key,
    version: 6, // increment this to reset the state to current defaults

    settings: {
        theme: 'system',
        showURLControls: true,
        showOpenButton: true,
        showDiffButton: true,
        showCopyButton: true,
        showShareButton: true,
        cropURLsInURLView: true,
        cropURLsInHistoryView: true,
        historyLimit: 100,
        derefInNewTab: 'pwa-only',
    },
    history: [],
    actions: [
        {
            "version": 1,
            "name": "Anonymize",
            "filter": "*",
            "tasks": [
                {
                    "name": "detrack",
                    "args": []
                },
                {
                    "name": "deref",
                    "args": []
                }
            ],
            "id": "3fec789f-2390-4fb1-8daa-af3a1628de4f"
        }
    ]

}


let localState = localStorage.getItem(storage_key) ? JSON.parse(localStorage.getItem(storage_key)) : defaultState;

function setTheme(theme) {
    if (theme === 'system') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.bsTheme = theme;
}

setTheme(localState?.settings?.theme || 'system');
const defaultVersion = defaultState.version;
if (localState.version !== defaultVersion) {
    localState = mergeDeep(defaultState, localState);
    console.log('patching state');
    localState.version = defaultVersion;
}

export default defineStore('store', {
    state: () => localState,
    actions: {
        setTheme() {
            setTheme(this.settings.theme);
        },
        pushHistory(url) {


            this.history = this.history.filter(item => item !== url.href);
            this.history.unshift(url.href);
            this.history = this.history.slice(0, this.settings.historyLimit);
        },
        saveAction(action, index, position) {
            if (index === 'new') {
                action.id = uuidv4();
                /*

                if (position === 'top') {
                    this.actions.unshift(action);
                } else {
                    this.actions.push(action);
                }

                 */

                this.actions.splice(position, 0, action);
            } else {
                this.actions[index] = action;
            }
        }
    }
});

