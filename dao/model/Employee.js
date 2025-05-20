/**
 * Represents an Employee with personal and professional attributes.
 * This class includes getter and setter methods for full encapsulation.
 */
export default class Employee {
    /**
     * Constructs an empty Employee instance.
     */
    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.mobile = '';
        this.address = '';
        this.role = '';
        this.profilePicture = '';
        this.hireDate = '';
        this.status = '';
        this.letter = ''
    }

    // ======================
    // GETTERS (Accessors)
    // ======================

    /** @returns {string} The employee’s unique identifier. */
    getId() {
        return this.id;
    }

    /** @returns {string} The employee’s first name. */
    getFirstName() {
        return this.firstName;
    }

    /** @returns {string} The employee’s last name. */
    getLastName() {
        return this.lastName;
    }

    /** @returns {string} The employee’s email address. */
    getEmail() {
        return this.email;
    }

    /** @returns {string} The employee’s contact mobile number. */
    getMobile() {
        return this.mobile;
    }

    /** @returns {string} The employee’s residential address. */
    getAddress() {
        return this.address;
    }

    /** @returns {string} The employee’s job title or role. */
    getRole() {
        return this.role;
    }

    /** @returns {string} The employee’s profile picture path or encoded image. */
    getProfilePicture() {
        return this.profilePicture;
    }

    /** @returns {string} The ISO-formatted hiring date of the employee. */
    getHireDate() {
        return this.hireDate;
    }

    getStatus() {
        return this.status;
    }

    getLetter() {
        return this.letter;
    }

    // ======================
    // SETTERS (Mutators)
    // ======================

    /** @param {string} id - New identifier to assign. */
    setId(id) {
        this.id = id;
    }

    /** @param {string} firstName - New first name. */
    setFirstName(firstName) {
        this.firstName = firstName;
    }

    /** @param {string} lastName - New last name. */
    setLastName(lastName) {
        this.lastName = lastName;
    }

    /** @param {string} email - New email address. */
    setEmail(email) {
        this.email = email;
    }

    /** @param {string} mobile - New mobile number. */
    setMobile(mobile) {
        this.mobile = mobile;
    }

    /** @param {string} address - New address. */
    setAddress(address) {
        this.address = address;
    }

    /** @param {string} role - New role. */
    setRole(role) {
        this.role = role;
    }

    /** @param {string} profilePicture - New profile picture data. */
    setProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
    }

    /** @param {string} hireDate - New ISO-formatted hire date. */
    setHireDate(hireDate = new Date().toISOString()) {
        this.hireDate = hireDate;
    }

    setStatus(status) {
        this.status = status;
    }

    setLetter(letter) {
        this.letter = letter;
    }
}
