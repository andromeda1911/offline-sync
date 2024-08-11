import { getAllLocalData, clearLocalData } from './storage';
import { resolveConflicts } from './conflict';

export function syncDataWithServer() {
    if (navigator.onLine) {
        return getAllLocalData().then((localData) => {
            return fetch('/sync', {
                method: 'POST',
                body: JSON.stringify(localData),
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then((serverData) => {
                const resolvedData = resolveConflicts(localData, serverData);
                // Update the server with resolved data if necessary
                return fetch('/sync', {
                    method: 'POST',
                    body: JSON.stringify(resolvedData),
                    headers: { 'Content-Type': 'application/json' },
                });
            })
            .then(() => clearLocalData())
            .catch((error) => console.error('Sync failed:', error));
        });
    }
}