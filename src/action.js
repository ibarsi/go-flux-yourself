/* ---------------------------------------------
    ACTION
---------------------------------------------- */

export default function Action(type) {
    return payload => {
        return {
            type,
            payload
        };
    };
}
