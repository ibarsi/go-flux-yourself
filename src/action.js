/* ---------------------------------------------
    ACTION
---------------------------------------------- */
// @flow

export type TAction = {
    type: string,
    payload: mixed
};

const Action = (type: string) =>
    (payload: mixed): TAction =>
        ({
            type,
            payload
        });

export default Action;
