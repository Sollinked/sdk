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

export type IntegrationButtonType = "discord" | "custom";

export type WebhookType = "discord" | "custom";
export type WebhookStatus = "active" | "inactive";
export type Webhook = {
    id: number;
    user_id: number;
    type: WebhookType;
    value: string;
    template: string;
    status: WebhookStatus;
    created_at: string;
    updated_at: string;
}