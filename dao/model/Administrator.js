/**
 * Represents an Administrator with account attributes.
 * This class includes getter and setter methods for full encapsulation.
 */
export default class Administrator {
    constructor() {
        /** @type {string} */
        this.email = '';

        /** @type {string} */
        this.password = '';
    }

    // ======================
    // GETTERS (Accessors)
    // ======================

    /** @returns {string} The administrator’s email address. */
    getEmail() {
        return this.email;
    }

    /** @returns {string} The administrator’s password. */
    getPassword() {
        return this.password;
    }

    // ======================
    // SETTERS (Mutators)
    // ======================

    /** @param {string} email - New email address. */
    setEmail(email) {
        this.email = email;
    }

    /** @param {string} password - New password. */
    setPassword(password) {
        this.password = password;
    }
}
