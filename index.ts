import * as account from "./src/Account";
import * as mail from './src/Mail';
import * as github from './src/Github';
import * as calendar from './src/Calendar';
import { AuthCallParams } from "./types";
import { User, UserUpdateParams } from "./src/Account/types";
import { MailTier } from "./src/Mail/types";
import { UpdateUserReservationParams, UserReservation, UserReservationSetting } from "./src/Calendar/types";

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
        this.user = await this.me();
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
    newGithubProfile = async() => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.setTiers();
    }

    setGithubTiers = async() => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.setTiers();
    }

    newGithubIssue = async() => {
        if(!this.user) {
            throw new UninitializedError();
        }
        return await github.newIssue();
    }
}