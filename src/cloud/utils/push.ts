export const sendPushNotification = async (user: Parse.User, payload: any, appIdentifier: string): Promise<void> => {
    const sessions = await new Parse.Query(Parse.Session).equalTo("user", user).find({ useMasterKey: true });

    const installationIds = sessions.map((item) => item.get("installationId"));

    // User doest not have installations, we cannot build a push query
    if (installationIds.length === 0) {
        return;
    }

    const query = new Parse.Query(Parse.Installation);
    query.containedIn("installationId", installationIds);
    query.equalTo("appIdentifier", appIdentifier);
    payload.where = query;
    await Parse.Push.send(payload, { useMasterKey: true });
};

export const sendGroupPushNotification = async (
    users: Parse.User[],
    payload: any,
    appIdentifier: string
): Promise<void> => {
    const sessions = await new Parse.Query(Parse.Session).containedIn("user", users).find({ useMasterKey: true });

    const installationIds = sessions.map((item) => item.get("installationId"));

    // User doest not have installations, we cannot build a push query
    if (installationIds.length === 0) {
        return;
    }

    const query = new Parse.Query(Parse.Installation);
    query.containedIn("installationId", installationIds);
    query.equalTo("appIdentifier", appIdentifier);
    payload.where = query;
    await Parse.Push.send(payload, { useMasterKey: true });
};
