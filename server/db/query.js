const conn = require('./conn');

async function runQuery(sql) {
    try {
        const query = await conn.execute(sql);
        return query[0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = runQuery;
