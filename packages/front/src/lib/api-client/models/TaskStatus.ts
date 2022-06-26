/* tslint:disable */
/* eslint-disable */
/**
 * ShaFuku API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TaskStatus
 */
export interface TaskStatus {
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    taskId: number;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof TaskStatus
     */
    comment: string;
    /**
     * 
     * @type {string}
     * @memberof TaskStatus
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    createUserId?: number;
    /**
     * 
     * @type {string}
     * @memberof TaskStatus
     */
    updatedAt?: string;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    updateUserId?: number;
}

export function TaskStatusFromJSON(json: any): TaskStatus {
    return TaskStatusFromJSONTyped(json, false);
}

export function TaskStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): TaskStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'taskId': json['taskId'],
        'status': json['status'],
        'comment': json['comment'],
        'createdAt': !exists(json, 'createdAt') ? undefined : json['createdAt'],
        'createUserId': !exists(json, 'createUserId') ? undefined : json['createUserId'],
        'updatedAt': !exists(json, 'updatedAt') ? undefined : json['updatedAt'],
        'updateUserId': !exists(json, 'updateUserId') ? undefined : json['updateUserId'],
    };
}

export function TaskStatusToJSON(value?: TaskStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'taskId': value.taskId,
        'status': value.status,
        'comment': value.comment,
        'createdAt': value.createdAt,
        'createUserId': value.createUserId,
        'updatedAt': value.updatedAt,
        'updateUserId': value.updateUserId,
    };
}
