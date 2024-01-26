import * as account from "../Account/index.js";
import * as mail from '../Mail/index.js';
import * as github from '../Github/index.js';
import * as calendar from '../Calendar/index.js';
import * as integration from '../Integration/index.js';
import * as mailingList from '../MailingList/index.js';
import * as content from '../Content/index.js';
import * as contentPass from '../ContentPass/index.js';
import { AuthCallParams, ProviderProps, SollinkedContextState } from "../../types";
import { User, UserUpdateParams, UserUpdateTagParams } from "../Account/types";
import { MailTier, NewMailParams, OnMailPaymentParams } from "../Mail/types";
import { ReserveCalendarParams, UpdateUserReservationParams, UserReservationSetting } from "../Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams } from "../Github/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCookies } from 'react-cookie';
import { convertToLocalDayAndHour } from "../../utils.js";
import { UpdateIntegrationParams } from "../Integration/types";
import { BroadcastParams, DraftParams, ResendBroadcastParams, RetryBroadcastParams, UpdateMailingListPriceListParams } from "../MailingList/types.js";
import { ContentPassCreateParams, ContentPassPayParams, ContentPassUpdateParams } from "../ContentPass/types.js";
import { ContentCreateParams, ContentPayParams, ContentUpdateParams } from "../Content/types.js";

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
    is_verified: false,
};

// react's version
const SollinkedContext = createContext<SollinkedContextState>({
    user: DEFAULT_USER,
    signature: "",
    isVerified: false,
    isVerifying: false,
    init: undefined,
});

const useSollinked = () => {
    return useContext(SollinkedContext);
}

const Provider = ({
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

    // clear account
    const clear = useCallback(() => {
        setUser(DEFAULT_USER);
    }, []);

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

    const meContentPasses = useCallback(async() => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await account.meContentPasses({address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        return res.data.data;
    }, [ user, signature, auth ]);

    // create the account
    const createAccount = useCallback(async(username: string, customSignature?: string) => {
        let sigToVerify = customSignature ?? signature;
        if(!auth.address || !auth.message || !sigToVerify) {
            return;
        }

        let { address, message } = auth;
        let userRes = await account.create({address, message, signature: sigToVerify, username});
        if(!userRes || typeof userRes === 'string') {
            return;
        }

        let user = userRes.data.data;
        let signatures = cookies['signatures'];
        setCookie("signatures", { ...signatures, [auth.address]: sigToVerify }, { path: '/' });
        setUser(user ?? DEFAULT_USER);
        return user;
    }, [ auth, signature, cookies ]);

    // updates the account
    const updateAccount = useCallback(async(params: Omit<UserUpdateParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await account.update(user.id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // updates the account's tags, like BONK WHALE etc
    const updateAccountTags = useCallback(async(params: Omit<UserUpdateTagParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }

        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await account.updateTags(user.id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // user public functions
    const getHomepageUsers = useCallback(async() => {
        let res = await account.getHomepageUsers();
        if(typeof res === 'string') {
            return res;
        }

        if(!res.data.data) {
            return "Unable to get users";
        }

        return res.data.data;
    }, []);

    const searchUser = useCallback(async(username: string) => {
        let res = await account.search(username);
        if(typeof res === 'string') {
            return res;
        }

        if(!res.data.data) {
            return "Unable to get users";
        }

        return res.data.data;

    }, []);

    const searchUserAddress = useCallback(async(address: string) => {
        let res = await account.searchAddress(address);
        if(typeof res === 'string') {
            return res;
        }

        if(!res.data.data) {
            return "Unable to get user";
        }

        return res.data.data;

    }, []);

    const getUser = useCallback(async(username: string) => {
        let res = await account.get(username);
        if(typeof res === 'string') {
            return res;
        }

        if(!res.data.data) {
            return "Unable to get users";
        }

        return res.data.data;
    }, []);

    // mail functinos
    const setMailTiers = useCallback(async(tiers: MailTier[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.setTiers(user.id, {address, message, signature, tiers});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    // deprecated
    const claimMail = useCallback(async(id: number, claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.claim(user.id, {address, message, signature, mailId: id, claimToAddress });
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    // deprecated
    const claimAllMail = useCallback(async(claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.claimAll(user.id, {address, message, signature, claimToAddress});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, signature, auth, me ]);

    const getEmails = useCallback(async(username: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.getThreads(username, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        // await me();
        return res.data.data;
    }, [ user, signature, auth ]);

    const getEmailThread = useCallback(async(mailId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.getThread(mailId, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        // await me();
        return res.data.data;
    }, [ user, signature, auth ]);

    const newMail = useCallback(async(toUsername: string, params: Omit<NewMailParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mail.newMail(toUsername, {address, message, signature, ...params});
        
        if(typeof res === 'string') {
            return res;
        } 

        return res.data.data;
    }, [ user, signature, auth ]);

    const onMailPayment = useCallback(async(toUsername: string, params: OnMailPaymentParams) => {
        let res = await mail.onMailPayment(toUsername, params);
        if(typeof res === 'string') {
            return res;
        } 

        return res.data.data;
    }, [ ]);

    // mailing lists
    const newMailingList = useCallback(async(shouldUpdateMe?: boolean) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await mailingList.create({address, message, signature});
        if(typeof res === 'string') {
            return res;
        }

        if(shouldUpdateMe) {
            await me();
        }
        return res;
    }, [user, auth, signature, me]);

    const updateMailingListPriceTiers = useCallback(async(id: number, params: Omit<UpdateMailingListPriceListParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        // create new mailing list if id is 0 or id is not present
        if(!id) {
            let res = await newMailingList(false);
            if(typeof res === 'string') {
                return res;
            }
        }

        let res = await mailingList.updateTiers({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const newBroadcast = useCallback(async(params: Omit<BroadcastParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.broadcast({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const retryBroadcast = useCallback(async(id: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.retry(id, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const resendBroadcast = useCallback(async(params: Omit<ResendBroadcastParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.resend({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const saveBroadcastDraft = useCallback(async(params: Omit<BroadcastParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.saveDraft({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const updateBroadcastDraft = useCallback(async(id: number, params: Omit<DraftParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.updateDraft(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    const testBroadcastDraft = useCallback(async(id: number, params: Omit<BroadcastParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.testDraft(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    const broadcastDraft = useCallback(async(id: number, params: Omit<BroadcastParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.broadcastDraft(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const getBroadcastDraft = useCallback(async(id: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await mailingList.getDraft(id, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    // mailing list public functions
    const getUserMailingList = useCallback(async(username: string) => {
        return await mailingList.get(username);
    }, []);

    // content functions
    const createContent = useCallback(async(params: Omit<ContentCreateParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await content.create({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const updateContent = useCallback(async(id: number, params: Omit<ContentUpdateParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await content.update(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    const payContent = useCallback(async(id: number, params: Omit<ContentPayParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await content.pay(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    const publishContent = useCallback(async(id: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await content.publish(id, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const unpublishContent = useCallback(async(id: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await content.unpublish(id, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const getContentDraft = useCallback(async(id: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        return await content.getDraft(id, {address, message, signature});
    }, [user, auth, signature]);

    const getContent = useCallback(async(username: string, slug: string) => {
        return await content.get(username, slug, {...auth, signature});
    }, [user, auth, signature]);

    // content pass functions
    const createContentPass = useCallback(async(params: Omit<ContentPassCreateParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await contentPass.create({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const updateContentPass = useCallback(async(id: number, params: Omit<ContentPassUpdateParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await contentPass.update(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [user, auth, signature, me]);

    const payContentPass = useCallback(async(id: number, params: Omit<ContentPassPayParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;

        let res = await contentPass.pay(id, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        return res;
    }, [user, auth, signature]);

    // calendar functions
    const setCalendarPresetPrice = useCallback(async(reservationSettings: UserReservationSetting[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await calendar.setPresetPrice(user.id, {address, message, signature, reservationSettings});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const setCalendarCustomPrice = useCallback(async(params: Omit<UpdateUserReservationParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await calendar.setCustomPrice({address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // public functions
    const getUserCalendarSettings = useCallback(async(username: string) => {
        return await calendar.getUserSettings(username);
    }, []);

    const reserveUserCalendar = useCallback(async(params: ReserveCalendarParams) => {
        return await calendar.reserve(params);
    }, []);

    // github 
    const createGithubProfile = useCallback(async(params: Omit<CreateGitHubSettingParams, keyof AuthCallParams | "user_id">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await github.create({...params, address, message, signature, user_id: user.id});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const updateGithubProfile = useCallback(async(githubSettingId: number, params: Omit<UpdateGitHubSettingParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await github.update(githubSettingId, {address, message, signature, ...params});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const deleteGithubProfile = useCallback(async(githubSettingId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await github.del(githubSettingId, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const toggleGitHubProfileStatus = useCallback(async(githubSettingId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await github.toggle(githubSettingId, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
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
    const updateIntegration = useCallback(async(webhookId: number, params: Omit<UpdateIntegrationParams, keyof AuthCallParams>) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await integration.update(webhookId, {...params, address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    const testIntegration = useCallback(async(webhookId: number) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !signature) {
            throw new UninitializedError();
        }

        let { address, message } = auth;
        let res = await integration.test(webhookId, {address, message, signature});
        if(typeof res === 'string') {
            return res;
        }
        await me();
        return res;
    }, [ user, auth, signature, me ]);

    // initialize
    const init = useCallback(async(customSignature?: string) => {
        if(!auth.address) {
            return;
        }

        let sigToVerify = customSignature ?? signature;
        if(!sigToVerify) {
            return;
        }

        setIsVerifying(true);

        let res = await me(customSignature);

        if(!res) {
            res = await createAccount(auth.address, customSignature);
        }

        setIsVerifying(false);
        setUser(res ?? DEFAULT_USER);
        return res;
    }, [ auth, createAccount, signature, me ]);

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
                    clear,
                    meContentPasses: meContentPasses,
                    create: createAccount,
                    update: updateAccount,
                    updateTags: updateAccountTags,
                    getHomepageUsers,
                    get: getUser,
                    search: searchUser,
                    searchAddress: searchUserAddress,
                },

                mail: {
                    get: getEmails,
                    getThread: getEmailThread,
                    setTiers: setMailTiers,
                    claim: claimMail,
                    claimAll: claimAllMail,
                    new: newMail,
                    onPayment: onMailPayment,
                },

                mailingList: {
                    create: newMailingList,
                    updateTiers: updateMailingListPriceTiers,
                    get: getUserMailingList,
                    retry: retryBroadcast,
                    resend: resendBroadcast,
                    broadcast: newBroadcast,
                    saveDraft: saveBroadcastDraft,
                    updateDraft: updateBroadcastDraft,
                    testDraft: testBroadcastDraft,
                    broadcastDraft: broadcastDraft,
                    getDraft: getBroadcastDraft,
                },

                content: {
                    create: createContent,
                    update: updateContent,
                    publish: publishContent,
                    unpublish: unpublishContent,
                    getDraft: getContentDraft,
                    get: getContent, // public
                    pay: payContent,
                },

                contentPass: {
                    create: createContentPass,
                    update: updateContentPass,
                    pay: payContentPass,
                },

                calendar: {
                    get: getUserCalendarSettings,
                    reserve: reserveUserCalendar,
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

export { useSollinked, Provider }