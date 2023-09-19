import { KeyboardShortcut } from "./KeyboardShortcut";

export class ShortcutManager {
    private shortCutList: KeyboardShortcut[];
    constructor() {
        this.shortCutList = [];
    }

    registerNewHook(newShortcut : KeyboardShortcut) {
        this.shortCutList.push(newShortcut);
    }

    callbackHook( e: React.KeyboardEvent<HTMLImageElement> ) {
        for (const shortcut of this.shortCutList ) {
            if (
                (shortcut.key === e.key) &&
                (shortcut.shift === e.shiftKey) &&
                (shortcut.ctrl === e.ctrlKey)  ) {
                    e.preventDefault();
                    shortcut.callback(e);
                    return; 
            }
        }
    }


}


