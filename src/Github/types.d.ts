import { AuthCallParams } from "../../types";

export type UserGithubSetting = {
    id: number;
    user_id: number;
    repo_link: string;
    uuid: string;
    last_synced_at?: string;
    is_active: boolean;
    behavior: "mark" | "close";
    whitelists: string[];
    tiers: UserGithubTier[];
    logs: UserGithubIssueLog[];
}

export type UserGithubTier = {
    id: number;
    user_github_id: number;
    value_usd: number;
    label: string;
    color: string;
}

export type UserGithubIssueLog = {
    id: number;
    user_github_id: number;
    value_usd: string;
    tx_hash: string;
    from_user: string;
    from_email: string;
    title: string;
    body: string;
}

export interface CreateGitHubSettingParams extends AuthCallParams {
    user_id: number;
    repo_link: string;
}

export interface UpdateGitHubSettingParams extends AuthCallParams {
    tiers: UserGithubTier[];
    whitelists: string[];
    repo_link: string;
    behavior: "mark" | "close";
}
export interface NewGithubIssueParams extends AuthCallParams {
    repo_link: string;
    txHash: string;
    title: string;
    body: string;
    fromEmail?: string;
    fromUser?: string;
}