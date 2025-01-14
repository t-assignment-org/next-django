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
 * @interface HttpError
 */
export interface HttpError {
    /**
     * 
     * @type {number}
     * @memberof HttpError
     */
    statusCode: number;
    /**
     * 
     * @type {string}
     * @memberof HttpError
     */
    message?: string | null;
    /**
     * 
     * @type {any}
     * @memberof HttpError
     */
    data?: any | null;
}

/**
 * Check if a given object implements the HttpError interface.
 */
export function instanceOfHttpError(value: object): value is HttpError {
    if (!('statusCode' in value) || value['statusCode'] === undefined) return false;
    return true;
}

export function HttpErrorFromJSON(json: any): HttpError {
    return HttpErrorFromJSONTyped(json, false);
}

export function HttpErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): HttpError {
    if (json == null) {
        return json;
    }
    return {
        
        'statusCode': json['status_code'],
        'message': json['message'] == null ? undefined : json['message'],
        'data': json['data'] == null ? undefined : json['data'],
    };
}

export function HttpErrorToJSON(json: any): HttpError {
    return HttpErrorToJSONTyped(json, false);
}

export function HttpErrorToJSONTyped(value?: HttpError | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'status_code': value['statusCode'],
        'message': value['message'],
        'data': value['data'],
    };
}

