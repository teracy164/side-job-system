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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Task
 */
export interface Task {
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    client: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    price: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    expireDate: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    recruitmentNumber: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    tags: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    note: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    createUserId?: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    updatedAt?: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    updateUserId?: number;
    /**
     * 
     * @type {Array<User>}
     * @memberof Task
     */
    assigners?: Array<User>;
}

export function TaskFromJSON(json: any): Task {
    return TaskFromJSONTyped(json, false);
}

export function TaskFromJSONTyped(json: any, ignoreDiscriminator: boolean): Task {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': json['title'],
        'description': json['description'],
        'client': json['client'],
        'price': json['price'],
        'expireDate': json['expireDate'],
        'recruitmentNumber': json['recruitmentNumber'],
        'tags': json['tags'],
        'note': json['note'],
        'createdAt': !exists(json, 'createdAt') ? undefined : json['createdAt'],
        'createUserId': !exists(json, 'createUserId') ? undefined : json['createUserId'],
        'updatedAt': !exists(json, 'updatedAt') ? undefined : json['updatedAt'],
        'updateUserId': !exists(json, 'updateUserId') ? undefined : json['updateUserId'],
        'assigners': !exists(json, 'assigners') ? undefined : ((json['assigners'] as Array<any>).map(UserFromJSON)),
    };
}

export function TaskToJSON(value?: Task | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'client': value.client,
        'price': value.price,
        'expireDate': value.expireDate,
        'recruitmentNumber': value.recruitmentNumber,
        'tags': value.tags,
        'note': value.note,
        'createdAt': value.createdAt,
        'createUserId': value.createUserId,
        'updatedAt': value.updatedAt,
        'updateUserId': value.updateUserId,
        'assigners': value.assigners === undefined ? undefined : ((value.assigners as Array<any>).map(UserToJSON)),
    };
}

