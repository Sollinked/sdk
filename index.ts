import * as account from "./src/Account";
import * as mail from './src/Mail';
import * as github from './src/Github';
import * as calendar from './src/Calendar';
import { AuthCallParams } from "./types";
import { User, UserUpdateParams } from "./src/Account/types";

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
    setMailTiers = async() => {
        return await mail.setTiers();
    }

    // calendar functions
    setCalendarTiers = async() => {
        return await calendar.setTiers();
    }

    // github functions
    setGithubTiers = async() => {
        return await github.setTiers();
    }

    newGithubIssue = async() => {
        return await github.newIssue();
    }
}