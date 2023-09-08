# Sollinked SDK

Sollinked is the Mail, Calendar, and Github Platform build on Solana. Users are able create @sollinked.com emails, schedule appointments through our Calendar feature, and manage Github issues all in one place!

With this SDK, you'll be able to integrate Sollinked into your app in a matter of minutes!

This app is constantly under development so be prepared to see exciting new features in the coming days!

## Integrating Sollinked

You will have to wrap your Component in the SollinkedProvider like so.

```jsx
import { Provider as SollinkedProvider } from '@sollinked/sdk';
...
return (
    <SollinkedProvider
        auth={{
            address, // publicKey.toBase58()
            message: "message you used to verify the address's ownership"
        }}
    >
        <Component/>
    </SollinkedProvider>
)
```

And that's it, really. Simple right?

If you wish to useSollinked anywhere in your web app, you'll have to wrap your App component.

## Initializing Sollinked

Before you start using Sollinked, you need to initialize it like so.

```jsx
const { init } = useSollinked();

useEffect(() => {
    const initSollinked = async() => {
        await init(signature); // signature you obtained from the user signing your verification message
    }

    initSollinked(); // if you wish to use await
    init(signature); // you can init like this too if you want to
}, []);
```

## How to useSollinked

In the components wrapped inside SollinkedProvider, you can call useSollinked() like any React hook. Example:

```jsx
...
const { user } = useSollinked();
...
```

## useSollinked Contents

```js
{
    user, // User object
    signature, // User's signature
    isVerified, // If user is registered on Sollinked
    isVerifying, // If useSollinked is still querying the backend

    // lines below are functions
    init, // initialize 

    account: { // may be undefined
        me, // updates User object
        create: createAccount, // creates Sollinked Account
        update: updateAccount, // updates Sollinked Account
    },

    mail: { // may be undefined
        setTiers: setMailTiers, // set User's email tiers
        claim: claimMail, // soon: claim a specific unclaimed email's contents
        claimAll: claimAllMail, // soon: claim all unclaimed emails' contents
    },

    calendar: { // may be undefined
        setPresetPrice: setCalendarPresetPrice, // set User's preset prices like Wednesday 10am 10USDC for meeting
        setCustomPrice: setCalendarCustomPrice, // Set a custom price to a date, example, 2023-09-08 6am 10USDC
    },

    github: { // may be undefined
        create: createGithubProfile, // creates a Sollinked Github Profile for the user
        update: updateGithubProfile,// updates the Sollinked Github Profile for the user
        toggle: toggleGitHubProfileStatus,// toggle User's Github Profile Bot Status
        get: getGithubDetails, // no verification needed: gets the Sollinked Github Profile's details
        newIssue: newGithubIssue, //  no verification needed: creates a Github issue after payment
        delete: deleteGithubProfile, // deletes User's github profile
    },

    integration: { // may be undefined
        update: updateIntegration, // Updates User's Discord / custom webhooks
        test: testIntegration, // Sends a test notification to the user's Discord / Custom webhooks
    }
}
```

## Examples and More Docs

Soon tm. 

Every component is typed, please refer to the typings while I make some examples.