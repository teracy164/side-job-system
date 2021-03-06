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


import * as runtime from '../runtime';
import {
    AddUserDto,
    AddUserDtoFromJSON,
    AddUserDtoToJSON,
    AuthorityGroup,
    AuthorityGroupFromJSON,
    AuthorityGroupToJSON,
    LoginDto,
    LoginDtoFromJSON,
    LoginDtoToJSON,
    Task,
    TaskFromJSON,
    TaskToJSON,
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface AddTaskRequest {
    task: Task;
}

export interface AddUserRequest {
    addUserDto: AddUserDto;
}

export interface AssignTaskRequest {
    id: number;
}

export interface CancelTaskRequest {
    id: number;
}

export interface LoginRequest {
    loginDto: LoginDto;
}

export interface UpdateTaskRequest {
    id: number;
    task: Task;
}

/**
 * DefaultApi - interface
 * 
 * @export
 * @interface DefaultApiInterface
 */
export interface DefaultApiInterface {
    /**
     * 
     * @param {Task} task 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    addTaskRaw(requestParameters: AddTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>>;

    /**
     */
    addTask(requestParameters: AddTaskRequest, initOverrides?: RequestInit): Promise<Task>;

    /**
     * 
     * @param {AddUserDto} addUserDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    addUserRaw(requestParameters: AddUserRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<User>>;

    /**
     */
    addUser(requestParameters: AddUserRequest, initOverrides?: RequestInit): Promise<User>;

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    assignTaskRaw(requestParameters: AssignTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>>;

    /**
     */
    assignTask(requestParameters: AssignTaskRequest, initOverrides?: RequestInit): Promise<Task>;

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    cancelTaskRaw(requestParameters: CancelTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>>;

    /**
     */
    cancelTask(requestParameters: CancelTaskRequest, initOverrides?: RequestInit): Promise<Task>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    getAuthorityGroupsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<AuthorityGroup>>>;

    /**
     */
    getAuthorityGroups(initOverrides?: RequestInit): Promise<Array<AuthorityGroup>>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    getMyTasksRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Task>>>;

    /**
     */
    getMyTasks(initOverrides?: RequestInit): Promise<Array<Task>>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    getTasksRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Task>>>;

    /**
     */
    getTasks(initOverrides?: RequestInit): Promise<Array<Task>>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    getUsersRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<User>>>;

    /**
     */
    getUsers(initOverrides?: RequestInit): Promise<Array<User>>;

    /**
     * 
     * @param {LoginDto} loginDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<string>>;

    /**
     */
    login(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<string>;

    /**
     * 
     * @param {number} id 
     * @param {Task} task 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApiInterface
     */
    updateTaskRaw(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>>;

    /**
     */
    updateTask(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit): Promise<Task>;

}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI implements DefaultApiInterface {

    /**
     */
    async addTaskRaw(requestParameters: AddTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling addTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TaskToJSON(requestParameters.task),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async addTask(requestParameters: AddTaskRequest, initOverrides?: RequestInit): Promise<Task> {
        const response = await this.addTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async addUserRaw(requestParameters: AddUserRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.addUserDto === null || requestParameters.addUserDto === undefined) {
            throw new runtime.RequiredError('addUserDto','Required parameter requestParameters.addUserDto was null or undefined when calling addUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddUserDtoToJSON(requestParameters.addUserDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async addUser(requestParameters: AddUserRequest, initOverrides?: RequestInit): Promise<User> {
        const response = await this.addUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async assignTaskRaw(requestParameters: AssignTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling assignTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks/{id}/assigner`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async assignTask(requestParameters: AssignTaskRequest, initOverrides?: RequestInit): Promise<Task> {
        const response = await this.assignTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async cancelTaskRaw(requestParameters: CancelTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling cancelTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks/{id}/assigner`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async cancelTask(requestParameters: CancelTaskRequest, initOverrides?: RequestInit): Promise<Task> {
        const response = await this.cancelTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAuthorityGroupsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<AuthorityGroup>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/authorities`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AuthorityGroupFromJSON));
    }

    /**
     */
    async getAuthorityGroups(initOverrides?: RequestInit): Promise<Array<AuthorityGroup>> {
        const response = await this.getAuthorityGroupsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getMyTasksRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Task>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks/mine`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TaskFromJSON));
    }

    /**
     */
    async getMyTasks(initOverrides?: RequestInit): Promise<Array<Task>> {
        const response = await this.getMyTasksRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getTasksRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Task>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TaskFromJSON));
    }

    /**
     */
    async getTasks(initOverrides?: RequestInit): Promise<Array<Task>> {
        const response = await this.getTasksRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getUsersRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     */
    async getUsers(initOverrides?: RequestInit): Promise<Array<User>> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.loginDto === null || requestParameters.loginDto === undefined) {
            throw new runtime.RequiredError('loginDto','Required parameter requestParameters.loginDto was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/auth`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginDtoToJSON(requestParameters.loginDto),
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<string> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateTaskRaw(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTask.');
        }

        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling updateTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: TaskToJSON(requestParameters.task),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     */
    async updateTask(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit): Promise<Task> {
        const response = await this.updateTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
