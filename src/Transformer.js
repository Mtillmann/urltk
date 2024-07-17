import detrack from "./Tasks/detrack"
import deref from "./Tasks/deref"
import extract_get from "./Tasks/extract_get"
import extract_hash from "./Tasks/extract_hash"
import extract_host from "./Tasks/extract_host"
import extract_path from "./Tasks/extract_path"
import wrap from "./Tasks/wrap"
import noop from "./Tasks/noop"
import remove_get from "./Tasks/remove_get"
import remove_hash from "./Tasks/remove_hash"
import replace_in_hash from "./Tasks/replace_in_hash"
import replace_in_host from "./Tasks/replace_in_host"
import replace_in_path from "./Tasks/replace_in_path"
import regexp from "./Tasks/regexp"
import set_get from "./Tasks/set_get"
import decode from "./Tasks/decode"
import encode from "./Tasks/encode"
import to_url from "./Tasks/to_url"

export default {
    tasks: {
        to_url,
        noop,
        detrack,
        deref,
        extract_get,
        extract_hash,
        extract_host,
        extract_path,
        wrap,
        remove_get,
        remove_hash,
        replace_in_hash,
        replace_in_host,
        replace_in_path,
        regexp,
        decode,
        encode,
        set_get
    },

    grouped: {
        tool: {
            noop,
            wrap,
            detrack,
            deref
        },
        convert: {
            to_url,
            decode,
            encode
        },
        modify: {
            regexp,
            set_get,
            replace_in_hash,
            replace_in_host,
            replace_in_path,
            remove_get,
            remove_hash
        },
        extract: {
            extract_get,
            extract_hash,
            extract_host,
            extract_path
        }
    },

    run(url, tasks) {
        url = new URL(url);

        const trace = [];

        try {
            for (const task of tasks) {
                const acceptable = this.tasks[task.name].accepts.some(type => url.constructor.name === type);
                if (!acceptable) {
                    throw new Error(`${task.name} does not accept ${url.constructor.name}`);
                }

                const args = task.args || [];
                url = this.tasks[task.name].apply(url, ...args);
                trace.push({url})
            }
        } catch (e) {
            trace.push({url, error: e.message});

            return {url, error: e.message, trace};
        }


        return {url, trace};
    },

    filter(url, actions) {
        try {
            url = new URL(url);
        } catch (e) {
            return false;
        }

        return actions.some(action => {
            const raw = action.filter;
            if (['*', '', undefined, null].includes(raw?.trim())) {
                return true;
            }

            if (raw.slice(0, 3) === 're:') {
                const regex = new RegExp(raw.slice(3));
                return regex.test(url.href);
            }

            const parts = raw.split(',').map(part => part.trim());
            return parts.some(part => url.href.includes(part));
        });
    }
}