import { logger, commands } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import Settings from "./Settings";

const MessageActions = findByProps("sendMessage", "receiveMessage");
const Locale = findByProps("Messages");

let patches = [];

export default {
    onLoad: () => {
        patches.push(commands.registerCommand({
            name: "fshapi",
            displayName: "fshapi",
            description: "Commands to connect to fsh api",
            displayDescription: "Commands to connect to fsh api",
            options: [{
                name: "base64",
                displayName: "base64",
                description: 'encode/decode to base64',
                displayDescription: 'encode/decode to base64',
                //required: false,
                type: 1,
                options: [{
                    name: "type",
                    displayName: "type",
                    description: 'to encode or decode',
                    displayDescription: 'to encode or decode',
                    required: true,
                    type: 3,
                    choices: [{
                        name: 'encode',
                        value: 'encode'
                    },
                    {
                        name: 'decode',
                        value: 'decode'
                    }]
                }]
            }],
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
    },
    settings: Settings,
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