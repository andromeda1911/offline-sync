export function resolveConflicts(localData, serverData) {
    return localData.map((localItem) => {
        const serverItem = serverData.find((item) => item.id === localItem.id);

        if (!serverItem || new Date(localItem.updatedAt) > new Date(serverItem.updatedAt)) {
            // Local item is newer, keep it
            return localItem;
        } else {
            // Server item is newer, overwrite local
            return serverItem;
        }
    });
}