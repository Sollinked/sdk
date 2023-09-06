export type ApiResult<T> = {
    success: boolean;
    message?: string;
    data?: T
}

export type SollinkedProps = {
    address?: string;
    signature?: string;
    message?: string;
}

export interface AuthCallParams {
    address: string;
    signature: string;
    message: string;
}

export interface PublicCallParams {
    address: string;
}