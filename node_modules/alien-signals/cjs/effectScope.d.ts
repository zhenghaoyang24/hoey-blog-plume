import { DirtyLevels, IEffectScope } from './system.js';
export declare function effectScope(): EffectScope;
export declare class EffectScope implements IEffectScope {
    nextNotify: undefined;
    deps: undefined;
    depsTail: undefined;
    trackId: number;
    dirtyLevel: DirtyLevels;
    canPropagate: boolean;
    notify(): void;
    run<T>(fn: () => T): T;
    stop(): void;
}
