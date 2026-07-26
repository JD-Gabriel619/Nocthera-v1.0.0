export default {

    buttonId: "nocthera:verify",

    roleId: process.env.VERIFICATION_ROLE_ID ?? null,

    enabled: true,

    requireCaptcha: false,

    autoRestoreRole: true

};