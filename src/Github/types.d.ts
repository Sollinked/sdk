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