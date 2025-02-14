/* tslint:disable */
/* eslint-disable */
/**
 * NinjaAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AppointmentPostIn
 */
export interface AppointmentPostIn {
    /**
     * 
     * @type {Date}
     * @memberof AppointmentPostIn
     */
    date: Date;
    /**
     * 
     * @type {string}
     * @memberof AppointmentPostIn
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof AppointmentPostIn
     */
    description?: string;
}

/**
 * Check if a given object implements the AppointmentPostIn interface.
 */
export function instanceOfAppointmentPostIn(value: object): value is AppointmentPostIn {
    if (!('date' in value) || value['date'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    return true;
}

export function AppointmentPostInFromJSON(json: any): AppointmentPostIn {
    return AppointmentPostInFromJSONTyped(json, false);
}

export function AppointmentPostInFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppointmentPostIn {
    if (json == null) {
        return json;
    }
    return {
        
        'date': (new Date(json['date'])),
        'email': json['email'],
        'description': json['description'] == null ? undefined : json['description'],
    };
}

export function AppointmentPostInToJSON(json: any): AppointmentPostIn {
    return AppointmentPostInToJSONTyped(json, false);
}

export function AppointmentPostInToJSONTyped(value?: AppointmentPostIn | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'date': ((value['date']).toISOString()),
        'email': value['email'],
        'description': value['description'],
    };
}

