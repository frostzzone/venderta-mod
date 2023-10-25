import { logger, commands } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import Settings from "./Settings";

const MessageActions = findByProps("sendMessage", "receiveMessage");
const Locale = findByProps("Messages");

let patches = [];

export default {
    onLoad: () => {
        patches.push(commands.registerCommand({
            name: "name",
            displayName: "displayname",
            description: "description",
            displayDescription: "displayDescription",
            options: [{
                name: "message",
                displayName: "message",
                description: Locale.Messages.COMMAND_SHRUG_MESSAGE_DESCRIPTION,
                displayDescription: Locale.Messages.COMMAND_SHRUG_MESSAGE_DESCRIPTION,
                required: false,
                // @ts-ignore
                type: 3
            }],
            // @ts-ignore
            applicationId: -1,
            inputType: 1,
            type: 1,
        
            execute: (args, ctx) => {
                // args[0].value
               
                MessageActions.sendMessage(ctx.channel.id, {
                    content: 'ok'
                })
            }
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    }
}

/*export default {
    onLoad: () => {
        logger.log("Hello world!");
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}*/