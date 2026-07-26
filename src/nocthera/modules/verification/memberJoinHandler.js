import * as VerificationService from "./service.js";

export async function handleMemberJoin(member) {

    await VerificationService.memberJoin(member);

}