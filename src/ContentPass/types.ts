import { AuthCallParams } from "../../types";

export type ContentPass = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    amount: number; // limited amount
    value_usd: number; // price per pass
    cnft_count: number; // how many miinted
}

export type ContentCNFT = {
    id: number;
    mint_address: string;
    nft_id: number;
    content_pass_id: number;
    created_at: string;
}

export interface ContentPassCreateParams extends AuthCallParams {
    name: string;
    description: string;
    amount: number; // limited amount
    value_usd: number; // price per pass
}

export interface ContentPassUpdateParams extends AuthCallParams {
    name: string;
    description: string;
    amount: number; // limited amount
    value_usd: number; // price per pass
}

export interface ContentPassPayParams extends AuthCallParams {
    txHash: string;
}