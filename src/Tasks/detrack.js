import remove_get from "./remove_get";

// from https://github.com/spekulatius/url-parameter-tracker-list
const forbiddenGetParams = [
    "fbclid",
    "gclid",
    "gclsrc",
    "utm_*",
    "_ga",
    "mc_cid",
    "mc_eid",
    "_bta_tid",
    "_bta_c",
    "trk_*",
    "gdfms",
    "gdftrk",
    "gdffi",
    "_ke",
    "sb_referer_host",
    "mkwid",
    "pcrid",
    "ef_id",
    "s_kwcid",
    "msclkid",
    "dm_i",
    "epik",
    "pk_*",
    "piwik_*",
    "mtm_*",
    "matomo_*",
    "hsa_*",
    "_branch_match_id",
    "mkevt",
    "mkcid",
    "mkrid",
    "campid",
    "toolid",
    "customid",
    "igsh*",
    "si",
    "sms_*",
    "WT.mc_id",
    "WT.nav",
    "campaign_id",
    "hootPostID",
    "wprov",
    "__s"
]

export default {

    description: 'delete tracking parameters',
    args: [],
    returns: ['URL'],
    accepts: ['URL'],
    apply(url) {
        return remove_get.apply(url, forbiddenGetParams.join(', '));
    }
}
