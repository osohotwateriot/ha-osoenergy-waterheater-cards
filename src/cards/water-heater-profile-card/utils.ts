import { HassEntity } from "home-assistant-js-websocket";

export function getProfile(entity: HassEntity) {
    let profile: {}[] = [];
    let profileKeys = getProfileKeys(entity);
    for (var i = 0; i < 24; i++) {
        var key = profileKeys[i];
        var current = {};
        current[key] = 10;
        profile.push(current);
    }

    if (entity.attributes.profile != null)
        for (var i = 0; i < entity.attributes.profile.length; i++) {
            var key = Object.keys(entity.attributes.profile[i])[0];
            var current = {};
            current[key] = Math.round(entity.attributes.profile[i][key]);
            profile[i] = current;
        }

    return profile;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export function getServiceProfile(profile: {}[]) {
    let profileResult: {} = {};
    for (var i = 0; i < 24; i++) {
        var param = "hour_" + pad(i, 2);
        profileResult[param] = 10;
    }

    if (profile != null)
        for (var i = 0; i < profile.length; i++) {
            var key = Object.keys(profile[i])[0];
            var param = "hour_" + pad(i, 2);
            profileResult[param] = Math.round(profile[i][key]);
        }

    return profileResult;
}

export function getProfileKeys(entity: HassEntity): string[] {
    let profileKeys: string[] = [];
    for (var i = 0; i < 24; i++) {
        let key = "";
        if (i < 10) key = "0" + i + ":00";
        else key = i + ":00";
        profileKeys.push(key);
    }

    if (entity.attributes.profile != null)
        for (var i = 0; i < entity.attributes.profile.length; i++) {
            var key = Object.keys(entity.attributes.profile[i])[0];
            profileKeys[i] = key;
        }

    return profileKeys;
}
