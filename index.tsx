import * as account from "./src/Account";
import * as mail from './src/Mail';
import * as github from './src/Github';
import * as calendar from './src/Calendar';
import { AuthCallParams, ProviderProps, SollinkedContextState } from "./types";
import { User, UserUpdateParams } from "./src/Account/types";
import { MailTier } from "./src/Mail/types";
import { UpdateUserReservationParams, UserReservationSetting } from "./src/Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams } from "./src/Github/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

class UninitializedError extends Error {
    constructor() {
      super(); // (1)
      this.name = "UninitializedError"; // (2)
    }
}

export class SollinkedAuthed {
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
    setCalendarPresetPrice = async(params: UserReservationSetting[]) => {
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
}

// react's version
export const SollinkedContext = createContext<SollinkedContextState>({
    user: undefined,
    updateAccount: undefined,
    setMailTiers: undefined,
    claimMail: undefined,
    claimAllMail: undefined,
    setCalendarPresetPrice: undefined,
    setCalendarCustomPrice: undefined,
    newGithubProfile: undefined,
    updateGithubProfile: undefined,
});

export const useSollinked = () => {
    return useContext(SollinkedContext);
}

export const Provider = ({
    children,
    auth,
}: ProviderProps) => {
    const [user, setUser] = useState<User>();

    // account functions
    const me = useCallback(async() => {
        if(!auth.address || !auth.message || !auth.signature) {
            return;
        }

        let { address, message, signature } = auth;
        return await account.me({ address, message, signature });
    }, [])


    // initialize
    const init = useCallback(async() => {
        let res = await me();
        if(!res) {
            return;
        }

        if(typeof res === "string") {
            return;
        }
        setUser(res.data.data);
    }, []);

    useEffect(() => {
        init();
    }, []);

    // update the account
    const updateAccount = async(params: Omit<UserUpdateParams, "address" | "message" | "signature">) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !auth.signature) {
            return;
        }

        let { address, message, signature } = auth;
        return await account.update(user.id, {address, message, signature, ...params});
    }

    // mail functinos
    const setMailTiers = useCallback(async(tiers: MailTier[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !auth.signature) {
            return;
        }

        let { address, message, signature } = auth;
        return await mail.setTiers(user.id, {address, message, signature, tiers});
    }, [ user ]);

    const claimMail = useCallback(async(id: number, claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !auth.signature) {
            return;
        }

        let { address, message, signature } = auth;
        return await mail.claim(user.id, {address, message, signature, mailId: id, claimToAddress });
    }, []);

    const claimAllMail = useCallback(async(claimToAddress?: string) => {
        if(!user) {
            throw new UninitializedError();
        }
        
        if(!auth.address || !auth.message || !auth.signature) {
            return;
        }

        let { address, message, signature } = auth;
        return await mail.claimAll(user.id, {address, message, signature, claimToAddress});
    }, []);

    // calendar functions
    const setCalendarPresetPrice = useCallback(async(params: UserReservationSetting[]) => {
        if(!user) {
            throw new UninitializedError();
        }
        return await calendar.setPresetPrice(user.id, params);
    }, [ user ]);

    const setCalendarCustomPrice = useCallback(async(params: UpdateUserReservationParams) => {
        if(!user) {
            throw new UninitializedError();
        }
        return await calendar.setCustomPrice(params);
    }, [ user ]);

    // github 
    const newGithubProfile = useCallback(async(params: CreateGitHubSettingParams) => {
        if(!user) {
            throw new UninitializedError();
        }
        return await github.create(params);
    }, [ user ]);

    const updateGithubProfile = useCallback(async(githubSettingId: number, params: UpdateGitHubSettingParams) => {
        if(!user) {
            throw new UninitializedError();
        }
        return await github.update(githubSettingId, params);
    }, [ user ]);

    const newGithubIssue = useCallback(async(params: NewGithubIssueParams) => {
        if(!user) {
            throw new UninitializedError();
        }
        return await github.newIssue(params);
    }, []);

    return (
        <SollinkedContext.Provider
            value={{
                user,
                updateAccount,
                setMailTiers,
                claimMail,
                claimAllMail,
                setCalendarPresetPrice,
                setCalendarCustomPrice,
                newGithubProfile,
                updateGithubProfile,
                newGithubIssue,
            }}
        >
            {children}
        </SollinkedContext.Provider>
    )
}