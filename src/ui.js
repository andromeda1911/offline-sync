// src/ui.js
import { saveDataLocally } from './storage';
import { syncDataWithServer } from './sync';

export function saveData(data) {
    // Optimistic UI: Immediately update the UI with local changes
    renderDataLocally(data);

    // Save data locally
    saveDataLocally(data).then(() => {
        if (navigator.onLine) {
            syncDataWithServer();
        } else {
            // Register background sync if offline
            navigator.serviceWorker.ready.then((swRegistration) => {
                return swRegistration.sync.register('sync-data');
            });
        }
    }).catch((error) => {
        // Rollback UI if saving fails
        rollbackUIChanges(data);
        console.error('Failed to save data:', error);
    });
}

function renderDataLocally(data) {
    // Implement UI rendering logic here
    console.log('Data rendered locally:', data);
}

function rollbackUIChanges(data) {
    // Implement rollback logic here
    console.log('UI changes rolled back for data:', data);
}
