import verificationButtonHandler from '../../../handlers/verificationButtons.js';

export default [
    {
        name: 'verify_user',
        execute: verificationButtonHandler.execute,
    },
    {
        name: 'welcome_verify',
        execute: verificationButtonHandler.execute,
    }
];