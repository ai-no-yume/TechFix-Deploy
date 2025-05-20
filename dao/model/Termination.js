export default class Termination {
    /**
     * Constructs an empty Termination instance.
     */
    constructor() {
        this.employeeId = '';
        this.date = '';
        this.type = '';
        this.reason = '';
        this.letter = ''
    }

    // ======================
    // GETTERS (Accessors)
    // ======================

    getEmployeeId() {
        return this.employeeId;
    }

    getDate() {
        return this.date;
    }

    getType() {
        return this.type;
    }

    getReason() {
        return this.reason;
    }

    getLetter() {
        return this.letter;
    }

    getCleanData() {
        return {
            employeeId: this.employeeId,
            date: this.date,
            type: this.type,
            reason: this.reason,
            letter: this.letter
        };
    }

    // ======================
    // SETTERS (Mutators)
    // ======================

    setEmployeeId(employeeId) {
        this.employeeId = employeeId;
    }

    setDate(date = new Date().toISOString()) {
        this.date = date;
    }

    setType(type) {
        this.type = type;
    }

    setReason(reason) {
        this.reason = reason;
    }

    setLetter(letter) {
        this.letter = letter;
    }
}
