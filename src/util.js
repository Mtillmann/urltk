import Transformer from './Transformer';

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

// from https://github.com/vuejs/vitepress/blob/006fd800956de5f12f63980e854239c240a70203/src/client/app/composables/copyCode.ts#L45C1-L87C2
// downgraded to js
export async function copyToClipboard(text) {
    try {
        return navigator.clipboard.writeText(text)
    } catch {
        const element = document.createElement('textarea')
        const previouslyFocusedElement = document.activeElement

        element.value = text

        // Prevent keyboard from showing on mobile
        element.setAttribute('readonly', '')

        element.style.contain = 'strict'
        element.style.position = 'absolute'
        element.style.left = '-9999px'
        element.style.fontSize = '12pt' // Prevent zooming on iOS

        const selection = document.getSelection()
        const originalRange = selection
            ? selection.rangeCount > 0 && selection.getRangeAt(0)
            : null

        document.body.appendChild(element)
        element.select()

        // Explicit selection workaround for iOS
        element.selectionStart = 0
        element.selectionEnd = text.length

        document.execCommand('copy')
        document.body.removeChild(element)


        if (selection && originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }

        // Get the focus back on the previously focused element, if any
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }
}

export function checkTypeConflicts(tasks) {

    const conflicts = [false];

    for (let i = 1; i < tasks.length; i++) {
        const previousTaskReturn = new Set([Transformer.tasks[tasks[i - 1]].returns]);
        const currentTaskAccepts = new Set(Transformer.tasks[tasks[i]].accepts);
        const diff = previousTaskReturn.difference(currentTaskAccepts);

        if (diff.size === 0) {
            conflicts.push(false);
            continue;
        }

        conflicts.push([...diff]);
    }
    return conflicts;
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}


export function deflateAction(action) {
    return [
        action.guid,
        action.version,
        action.name,
        action.filter,
        action.tasks.map(task => [task.name, task.args])
    ];
}

export function inflateAction(action) {
    return {
        guid: action[0],
        version: action[1],
        name: action[2],
        filter: action[3],
        tasks: action[4].map(task => ({name: task[0], args: task[1]}))
    };
}

export function cropText(text, len) {
    text = String(text);
    if (['undefined', false, null, ''].includes(len)) {
        return text;
    }

    if (text.length <= len) {
        return text;
    }

    return String(text).slice(0, len - 3) + '…';
}

export function download(content, mimeType, filename) {
    const blob = new Blob([content], {type: mimeType});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(url);
}

export function validateAction(action) {
    const keys = new Set(["version", "name", "filter", "tasks"]);
    const actionKeys = new Set(Object.keys(action));

    if (keys.difference(actionKeys).size > 0) {
        console.log('a');
        return false;
    }

    if (action.tasks.length === 0) {
        console.log('b');
        return false;
    }

    if (typeof action.name !== "string") {
        console.log('c');
        return false;
    }

    if (typeof action.filter !== "string") {
        console.log('d');
        return false;
    }

    if (typeof action.version !== "number") {
        console.log('e');
        return false;
    }

    if (action.version !== 1) {
        console.log('f');
        return false;
    }

    if (!Array.isArray(action.tasks)) {
        console.log('g');
        return false;
    }

    for (const task of action.tasks) {

        if (!Transformer.tasks[task.name]) {
            console.log('h');
            return false;
        }

        if (!Array.isArray(task.args)) {
            console.log('i');
            return false;
        }

        if (task.args.some(arg => ["string", "boolean"].includes(typeof arg) === false)) {
            console.log('j');
            return false;
        }


        const originalMinLength = Transformer.tasks[task.name].args.filter(arg => !arg.default).length;
        const originalLength = Transformer.tasks[task.name].args.length;

        if (task.args.length < originalMinLength || task.args.length > originalLength) {
            console.log('k');
            return false;
        }

    }

    return true;
}

export function actionsFromBase64(base64) {

    try {
        let actions = JSON.parse(atob(base64));
        if (!Array.isArray(actions)) {
            return false;
        }

        actions = actions.map(action => inflateAction(action))
            .filter(action => validateAction(action));

        return actions.length > 0 ? actions : false;
    } catch (e) {
        return false;
    }
}

export function isPwa() {
    return ["fullscreen", "standalone", "minimal-ui"].some(
        (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
    );
}

export async function registerSW() {


    if (/5173/.test(new URL(window.location).port)) {
        console.log(`skipping service worker for port 5173...`);
        return true;
    }

    await (async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("/sw.js", {
                    scope: "/",
                });
                if (registration.installing) {
                    console.log("Service worker installing");
                } else if (registration.waiting) {
                    console.log("Service worker installed");
                } else if (registration.active) {
                    console.log("Service worker active");
                }
            } catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    })();

    return true;
}