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


import * as runtime from '../runtime';
import type {
  AppointmentGetOut,
  AppointmentPostIn,
  HttpError,
} from '../models/index';
import {
    AppointmentGetOutFromJSON,
    AppointmentGetOutToJSON,
    AppointmentPostInFromJSON,
    AppointmentPostInToJSON,
    HttpErrorFromJSON,
    HttpErrorToJSON,
} from '../models/index';

export interface AppappointmentRoutesAppointmentCreateAppointmentRequest {
    appointmentPostIn: AppointmentPostIn;
}

export interface AppappointmentRoutesAppointmentGetAppointmentsRequest {
    date?: Date | null;
}

/**
 * 
 */
export class AppointmentsApi extends runtime.BaseAPI {

    /**
     * Create Appointment
     */
    async appappointmentRoutesAppointmentCreateAppointmentRaw(requestParameters: AppappointmentRoutesAppointmentCreateAppointmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AppointmentGetOut>> {
        if (requestParameters['appointmentPostIn'] == null) {
            throw new runtime.RequiredError(
                'appointmentPostIn',
                'Required parameter "appointmentPostIn" was null or undefined when calling appappointmentRoutesAppointmentCreateAppointment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/appointments/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppointmentPostInToJSON(requestParameters['appointmentPostIn']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AppointmentGetOutFromJSON(jsonValue));
    }

    /**
     * Create Appointment
     */
    async appappointmentRoutesAppointmentCreateAppointment(requestParameters: AppappointmentRoutesAppointmentCreateAppointmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AppointmentGetOut> {
        const response = await this.appappointmentRoutesAppointmentCreateAppointmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Appointments
     */
    async appappointmentRoutesAppointmentGetAppointmentsRaw(requestParameters: AppappointmentRoutesAppointmentGetAppointmentsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AppointmentGetOut>>> {
        const queryParameters: any = {};

        if (requestParameters['date'] != null) {
            queryParameters['date'] = (requestParameters['date'] as any).toISOString().substring(0,10);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/appointments/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AppointmentGetOutFromJSON));
    }

    /**
     * Get Appointments
     */
    async appappointmentRoutesAppointmentGetAppointments(requestParameters: AppappointmentRoutesAppointmentGetAppointmentsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AppointmentGetOut>> {
        const response = await this.appappointmentRoutesAppointmentGetAppointmentsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
