import { FluxDispatcher } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

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
    if (!message.content?.startsWith("<enc:")) return false;

    const content = message.content.split(":")[1];
    
    return content?.length > 2;
};

let patches = [];

const startPlugin = () => {
    try {
        const patch1 = before("generate", RowManager.prototype, ([data]) => {
            if (shouldModify(data.message)) {
                const decryptedContent = (() => { try { return atob(data.message.content.split(":")[1]) } catch { return null } })();
                if(decryptedContent == null) return
                data.message.content = `${decryptedContent}\n-# [Triggered Encryption]`;

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