import { AuthCallParams } from "../../types";

export interface CreateIntegrationParams extends AuthCallParams {
    type: 'discord' | 'custom';
    value: string;
    template: string;
}

export interface UpdateIntegrationParams extends AuthCallParams {
    value: string;
    template: string;
}