
/**
 * Arcade Cooldowns
 * Manage independent ability cooldowns in MakeCode Arcade.
 */
//% color="#5B6EE1" icon="\uf017" block="Cooldowns"
namespace arcadeCooldowns {
    let cooldownEnds: { [name: string]: number } = {}

    /**
     * Start or restart an ability cooldown.
     * @param name ability name, e.g. "dash"
     * @param duration cooldown duration in milliseconds
     */
    //% block="start cooldown for %name for %duration ms"
    //% name.defl="dash"
    //% duration.defl=1000
    //% duration.min=0
    //% weight=80
    export function start(name: string, duration: number): void {
        if (duration < 0) {
            duration = 0
        }

        cooldownEnds[name] = control.millis() + duration
    }

    /**
     * Check whether an ability can be used.
     * @param name ability name
     */
    //% block="cooldown %name is ready"
    //% name.defl="dash"
    //% weight=70
    export function isReady(name: string): boolean {
        return remaining(name) == 0
    }

    /**
     * Get the remaining cooldown in milliseconds.
     * Returns 0 when the ability is ready.
     * @param name ability name
     */
    //% block="cooldown %name remaining (ms)"
    //% name.defl="dash"
    //% weight=60
    export function remaining(name: string): number {
        let end = cooldownEnds[name]

        if (end === undefined) {
            return 0
        }

        let timeLeft = end - control.millis()

        if (timeLeft <= 0) {
            delete cooldownEnds[name]
            return 0
        }

        return timeLeft
    }

    /**
     * Use an ability only if its cooldown has expired.
     * Starts its cooldown and returns true on success.
     * Returns false when the ability is still cooling down.
     * @param name ability name
     * @param duration cooldown duration in milliseconds
     */
    //% block="try use ability %name with cooldown %duration ms"
    //% name.defl="dash"
    //% duration.defl=1000
    //% duration.min=0
    //% weight=100
    export function tryUse(name: string, duration: number): boolean {
        if (!isReady(name)) {
            return false
        }

        start(name, duration)
        return true
    }

    /**
     * Clear an ability's cooldown immediately.
     * @param name ability name
     */
    //% block="clear cooldown %name"
    //% name.defl="dash"
    //% weight=50
    export function clear(name: string): void {
        delete cooldownEnds[name]
    }

    /**
     * Clear every active cooldown.
     */
    //% block="clear all cooldowns"
    //% weight=40
    export function clearAll(): void {
        cooldownEnds = {}
    }
}

