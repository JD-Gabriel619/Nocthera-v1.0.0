import crypto from "crypto";

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const NUMBERS = "23456789";

export class CaptchaGenerator {

    /**
     * Random text captcha
     */
    static text(length = 6) {

        const chars = LETTERS + NUMBERS;

        let code = "";

        for (let i = 0; i < length; i++) {

            code += chars[
                crypto.randomInt(chars.length)
            ];

        }

        return code;

    }

    /**
     * Math captcha
     */
    static math() {

        const a = crypto.randomInt(1, 20);
        const b = crypto.randomInt(1, 20);

        return {
            question: `${a} + ${b}`,
            answer: String(a + b)
        };

    }

    /**
     * Emoji captcha
     */
    static emoji() {

        const emojis = [
            "🐱",
            "🐶",
            "🐸",
            "🐧",
            "🐼",
            "🐵",
            "🐰",
            "🦊"
        ];

        const answer = emojis[
            crypto.randomInt(emojis.length)
        ];

        return {

            question: `Click this emoji: ${answer}`,

            answer

        };

    }

    /**
     * Word captcha
     */
    static word() {

        const words = [

            "APPLE",
            "BANANA",
            "GALAXY",
            "DISCORD",
            "NOCTHERA",
            "PYTHON",
            "JAVASCRIPT",
            "GAMING"

        ];

        const answer =
            words[
                crypto.randomInt(words.length)
            ];

        return {

            question: `Type this word:\n${answer}`,

            answer

        };

    }

}