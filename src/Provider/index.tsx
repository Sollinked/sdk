import * as account from "../Account";
import * as mail from '../Mail';
import * as github from '../Github';
import * as calendar from '../Calendar';
import * as integration from '../Integration';
import React from 'react';
import { ProviderProps, SollinkedContextState } from "../../types";
import { User, UserUpdateParams } from "../Account/types";
import { MailTier } from "../Mail/types";
import { UpdateUserReservationParams, UserReservationSetting } from "../Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams } from "../Github/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCookies } from 'react-cookie';
import { convertToLocalDayAndHour } from "../../utils";
import { UpdateIntegrationParams } from "../Integration/types";

class UninitializedError extends Error {
    constructor() {
      super(); // (1)
      this.name = "UninitializedError"; // (2)
    }
}

const DEFAULT_USER = {
    id: 0,
    address: "",
    username: "",
    calendar_advance_days: 0,
    display_name: "",
    email_address: "",
    profile_picture: "",
    facebook: "",
    instagram: "",
    twitter: "",
    twitch: "",
    tiktok: "",
    youtube: "",
    tiers: [],
};

// react's version
export const SollinkedContext = createContext<SollinkedContextState>({
    user: DEFAULT_USER,
    signature: "",
    isVerified: false,
    isVerifying: false,
    init: undefined,
});

export const useSollinked = () => {
    return useContext(SollinkedContext);
}

export const Provider = ({
    children,
    auth
}: ProviderProps) => {
    const [user, setUser] = useState<User>(DEFAULT_USER);
    const [cookies, setCookie, /* removeCookie */] = useCookies([ 'signatures' ]);
    const [isVerifying, setIsVerifying] = useState(false);
    const isVerified = useMemo(() => {
        return user.id > 0;
    }, [user]);
    const signature = useMemo(() => {
        if(auth.signature) {
            return auth.signature;
        }

        if(!cookies || !cookies.signatures) {
            return "";
        }

        if(!auth.address) {
            return "";
        }

        return cookies.signatures[auth.address] as string ?? "";
    }, [cookies, auth]);

    // account functions
    // uses customSignature to verify address if specified
    const me = useCallback(async(customSignature?: string) => {
        let sigToVerify = customSignature ?? signature;
        if(!auth.address || !auth.message || !sigToVerify) {
            return;
        }

        let { address, message } = auth;
        try {
            let res = await account.me({ address, message, signature: sigToVerify });
            if(!res) {
                setIsVerifying(false);
                return;
            }

            if(typeof res === "string") {
                setIsVerifying(false);
                return;
            }

            let user = res.data.data;
            let signatures = cookies['signatures'];
            
            if(user) {
                let reservationSettings = user.reservationSettings ?? [];
                reservationSettings.forEach((setting, index) => {
                    let { day, hour } = convertToLocalDayAndHour(setting.day, setting.hour); 
                    reservationSettings[index].day = day;
                    reservationSettings[index].hour = hour;
                });
                user.reservationSettings = reservationSettings;
            }

            setCookie("signatures", { ...signatures, [auth.address]: sigToVerify }, { path: '/' });
            setUser(user ?? DEFAULT_USER);
            setIsVerifying(false);

            return user;
        }

        catch {
            // unable to get me
            setIsVerifying(false);
            return;
        }
    }, [ auth, signature, cookies, setCookie ]);

    // create the account
    const createAccount = useCallback(async(username: string) => {
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let userRes = await account.create({address, message, signature, username});
        if(!userRes || typeof userRes === 'string') {
            return;
        }

        let user = userRes.data.data;
        setUser(user ?? DEFAULT_USER);
        return user;
    }, [ auth, signature ]);

    // updates the account
    const updateAccount = useCallback(async(params: Omit<UserUpdateParams, "address" | "message" | "signature">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await account.update(user.id, {address, message, signature, ...params});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // mail functinos
    const setMailTiers = useCallback(async(tiers: MailTier[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await mail.setTiers(user.id, {address, message, signature, tiers});
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    const claimMail = useCallback(async(id: number, claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await mail.claim(user.id, {address, message, signature, mailId: id, claimToAddress });
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    const claimAllMail = useCallback(async(claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await mail.claimAll(user.id, {address, message, signature, claimToAddress});
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    // calendar functions
    const setCalendarPresetPrice = useCallback(async(reservationSettings: UserReservationSetting[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await calendar.setPresetPrice(user.id, {address, message, signature, reservationSettings});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const setCalendarCustomPrice = useCallback(async(params: Omit<UpdateUserReservationParams, "address" | "message" | "signature">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await calendar.setCustomPrice({address, message, signature, ...params});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // github 
    const createGithubProfile = useCallback(async(params: Omit<CreateGitHubSettingParams, "address" | "message" | "signature" | "user_id">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await github.create({...params, address, message, signature, user_id: user.id});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const updateGithubProfile = useCallback(async(githubSettingId: number, params: Omit<UpdateGitHubSettingParams, "address" | "message" | "signature">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await github.update(githubSettingId, {address, message, signature, ...params});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const deleteGithubProfile = useCallback(async(githubSettingId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await github.del(githubSettingId, {address, message, signature});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const toggleGitHubProfileStatus = useCallback(async(githubSettingId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await github.toggle(githubSettingId, {address, message, signature});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const newGithubIssue = useCallback(async(params: NewGithubIssueParams) => {
        return await github.newIssue(params);
    }, []);

    const getGithubDetails = useCallback(async(owner: string, repo: string) => {
        return await github.get(owner, repo);
    }, []);

    // integration
    const updateIntegration = useCallback(async(webhookId: number, params: Omit<UpdateIntegrationParams, "address" | "message" | "signature">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await integration.update(webhookId, {...params, address, message, signature});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const testIntegration = useCallback(async(webhookId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            return;
        }

        let { address, message } = auth;
        let res = await integration.test(webhookId, {address, message, signature});
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // initialize
    const init = useCallback(async(customSignature?: string) => {
        if(!auth.address) {
            return;
        }

        setIsVerifying(true);
        let res = await me(customSignature);

        if(!res) {
            res = await createAccount(auth.address);
        }
        setIsVerifying(false);
        setUser(res ?? DEFAULT_USER);
        return res;
    }, [ auth, createAccount, me ]);

    return (
        <SollinkedContext.Provider
            value={{
                user,
                signature,
                isVerified,
                isVerifying,

                init,

                // user
                account: {
                    me,
                    create: createAccount,
                    update: updateAccount,
                },

                mail: {
                    setTiers: setMailTiers,
                    claim: claimMail,
                    claimAll: claimAllMail,
                },

                calendar: {
                    setPresetPrice: setCalendarPresetPrice,
                    setCustomPrice: setCalendarCustomPrice,
                },

                github: {
                    create: createGithubProfile,
                    update: updateGithubProfile,
                    toggle: toggleGitHubProfileStatus,
                    get: getGithubDetails,
                    newIssue: newGithubIssue,
                    delete: deleteGithubProfile,
                },

                integration: {
                    update: updateIntegration,
                    test: testIntegration,
                }
            }}
        >
            {children}
        </SollinkedContext.Provider>
    )
}