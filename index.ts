export * from './src/Provider';

// import * as account from "./src/Account";
// import * as mail from './src/Mail';
// import * as github from './src/Github';
// import * as calendar from './src/Calendar';
// import { AuthCallParams, ProviderProps, SollinkedContextState } from "./types";
// import { User, UserCreateParams, UserUpdateParams } from "./src/Account/types";
// import { MailTier } from "./src/Mail/types";
// import { UpdatePresetPriceParams, UpdateUserReservationParams, UserReservationSetting } from "./src/Calendar/types";
// import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams } from "./src/Github/types";
// import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { useCookies } from 'react-cookie';

/* export class SollinkedAuthed {
    private props;
    private user?: User = undefined;

    constructor(props: AuthCallParams) {
        let { address, signature, message } = props;
        if(!address || !signature || !message) {
            throw Error("Invalid Params");
        }
        this.props = props;
        this.init();
    }

    // initialize
    init = async() => {
        let res = await this.me();
        if(typeof res === "string") {
            return;
        }
        this.user = res.data.data;
    }

    // account functions
    me = async() => {
        return await account.me({ ...this.props });
    }

    // update the account
    createAccount = async(params: UserCreateParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await account.create({...this.props, ...params});
    }

    updateAccount = async(params: UserUpdateParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await account.update(this.user.id, {...this.props, ...params});
    }

    // mail functinos
    setMailTiers = async(tiers: MailTier[]) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await mail.setTiers(this.user.id, {...this.props, tiers});
    }

    claimMail = async(id: number, claimToAddress?: string) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await mail.claim(this.user.id, {...this.props, mailId: id, claimToAddress });

    }

    claimAllMail = async(claimToAddress?: string) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await mail.claimAll(this.user.id, {...this.props, claimToAddress});

    }

    // calendar functions
    setCalendarPresetPrice = async(params: UpdatePresetPriceParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await calendar.setPresetPrice(this.user.id, params);
    }

    setCalendarCustomPrice = async(params: UpdateUserReservationParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await calendar.setCustomPrice(params);
    }

    // github 
    newGithubProfile = async(params: CreateGitHubSettingParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.create(params);
    }

    updateGithubProfile = async(githubSettingId: number, params: UpdateGitHubSettingParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.update(githubSettingId, params);
    }

    newGithubIssue = async(params: NewGithubIssueParams) => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.newIssue(params);
    }
} */