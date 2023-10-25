import { NavigationNative, React } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

import { lazy, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { currentSettings } from "../..";
import { LFMSettings } from "../../../../defs";
import { initialize } from "../../manager";

const { FormRow, FormInput, FormDivider, FormSwitchRow, FormText, FormIcon } = Forms;

const Constants = {
    DEFAULT_URL = "https://api.fsh.plus"
};

function UpdateButton() {
    async function onPressCallback() {
        for (const key in storage) {
            if (storage[key] != null) {
                currentSettings[key] = storage[key];
            }
        }

        await initialize();
        showToast("Settings updated!", getAssetIDByName("Check"));
    }

    return <TouchableOpacity onPress={onPressCallback}>
        <FormText style={{ marginRight: 12 }}>UPDATE</FormText>
    </TouchableOpacity>;
}

export default React.memo(function Settings() {
    const settings = useProxy(storage) as LFMSettings;
    const navigation = NavigationNative.useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: "Fsh Configuration",
            headerRight: UpdateButton
        });
    }, []);

    return (
        <ScrollView>
            <FormInput
                value={settings.appName || undefined}
                onChangeText={(value: string) => settings.appName = value.trim()}
                title="Discord Application Name"
                placeholder={Constants.DEFAULT_APP_NAME}
                returnKeyType="done"
            />
            <FormDivider />
            <FormInput required
                value={settings.username || undefined}
                onChangeText={(value: string) => settings.username = value.trim()}
                title="Last.fm username"
                helpText={!settings.username && <Text style={{ color: "#FF0000" }}>{"This field is required!"}</Text>}
                placeholder={Constants.DEFAULT_URL.toString()}
                returnKeyType="done"
            />
            {/*
            <FormDivider />
            <FormRow
                label="Debug"
                subLabel="View debug information"
                leading={<FormIcon source={getAssetIDByName("debug")} />}
                trailing={FormRow.Arrow}
                onPress={() => {
                    navigation.push("VendettaCustomPage", {
                        title: "Debug",
                        render: lazy(() => import("./Debug"))
                    });
                }}
            />
            */}
        </ScrollView>
    );
});

/*import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

export default () => (
    <FormText>
        FSH FSH
    </FormText>
)*/