

// query for inserting anonymous
const insertAnonymous = `
    INSERT INTO player (sign_up_date)
    VALUES (CURRENT_TIMESTAMP);
`;


// query for user inserted
const insert = `
    INSERT INTO player (username, sign_up_date)
    VALUES (?, CURRENT_TIMESTAMP);
`;

module.exports = {
    insertAnonymous, insert
}