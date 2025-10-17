import { FluxDispatcher } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";
import { box, randomBytes } from '../../../common/tweetnacl.js';

const encodeUTF8 = (str: string): Uint8Array => new TextEncoder().encode(str);
const decodeUTF8 = (bytes: Uint8Array): string => new TextDecoder().decode(bytes);

const encodeBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));
const decodeBase64 = (str: string): Uint8Array => Uint8Array.from(atob(str), c => c.charCodeAt(0));

const RowManager = findByName("RowManager");

const pluginName = "Encryption";
function constructMessage(message, channel) {
    let msg = {
        id: "",
        type: 0,
        content: "",
        channel_id: channel.id,
        author: {
            id: "",
            username: "",
            avatar: "",
            discriminator: "",
            publicFlags: 0,
            avatarDecoration: null,
        },
        attachments: [],
        embeds: [],
        mentions: [],
        mention_roles: [],
        pinned: false,
        mention_everyone: false,
        tts: false,
        timestamp: "",
        edited_timestamp: null,
        flags: 0,
        components: [],
    };

    if (typeof message === "string") msg.content = message;
    else msg = { ...msg, ...message };

    return msg;
}

const shouldModify = (message) => {
    if (!message?.content?.startsWith("<enc:")) return false;

    const parts = message.content.split(":");
    if (parts.length < 2) return false;

    const encryptedContent = parts[1];

    return encryptedContent?.length > 2;
};


let patches = [];

const startPlugin = () => {
    try {
        logger.log("TweetNaCl: " + box.keyPair())
        const patch1 = before("generate", RowManager.prototype, ([data]) => {
            if (shouldModify(data.message)) {
            try {
                let decryptedContent = atob(data.message.content?.split(":")[1]) ?? null
                
                
                if(decryptedContent == null) return
                data.message.content = `${decryptedContent}\n-# [Triggered Encryption]`;
            } catch(e) { return }
            }
        });
        patches.push(patch1);

        logger.log(`${pluginName} loaded.`);
    } catch (err) {
        logger.error(`[${pluginName} Error]`, err);
    }
};

export default {
    onLoad: () => {
        logger.log(`Loading ${pluginName}...`);

        for (let type of ["MESSAGE_CREATE", "MESSAGE_UPDATE", "LOAD_MESSAGES", "LOAD_MESSAGES_SUCCESS"]) {
            logger.log(`Dispatching ${type} to enable handler.`);
            FluxDispatcher.dispatch({
                type,
                message: constructMessage("PLACEHOLDER", { id: "0" }),
                messages: [],
            });
        }
        
        startPlugin();
    },

    onUnload: () => {
        logger.log(`Unloading ${pluginName}...`);
        for (let unpatch of patches) unpatch();
        patches = [];
        logger.log(`${pluginName} unloaded.`);
    },

    settings: Settings,
};