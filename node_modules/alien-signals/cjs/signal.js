"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signal = void 0;
exports.signal = signal;
const system_js_1 = require("./system.js");
function signal(oldValue) {
    return new Signal(oldValue);
}
class Signal {
    constructor(currentValue) {
        this.currentValue = currentValue;
        // Dependency
        this.subs = undefined;
        this.subsTail = undefined;
        this.linkedTrackId = -1;
    }
    get() {
        const activeTrackId = system_js_1.System.activeTrackId;
        if (activeTrackId !== 0 && this.linkedTrackId !== activeTrackId) {
            this.linkedTrackId = activeTrackId;
            system_js_1.Dependency.linkSubscriber(this, system_js_1.System.activeSub);
        }
        return this.currentValue;
    }
    set(value) {
        if (this.currentValue !== (this.currentValue = value)) {
            const subs = this.subs;
            if (subs !== undefined) {
                (0, system_js_1.startBatch)();
                system_js_1.Dependency.propagate(subs);
                (0, system_js_1.endBatch)();
            }
        }
    }
}
exports.Signal = Signal;
