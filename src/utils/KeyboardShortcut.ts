export class KeyboardShortcut {
    public ctrl: boolean;
    public shift: boolean;
    public key: string; 
    public callback: Function
    constructor(key : string, ctrl:boolean, shift:boolean, callback: Function) {
        this.ctrl = ctrl;
        this.shift = shift;
        this.key = key;
        this.callback = callback;
    }


    toggleCtrl() :KeyboardShortcut {
        this.ctrl = true;
        return this;
    }
    
    toggleShift() :KeyboardShortcut  {
        this.shift = true;
        return this;
    }

}