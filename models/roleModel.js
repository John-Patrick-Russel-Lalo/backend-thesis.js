

import pool from "../database/db.js";

export async function getRoleById(roleId) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [roleId]
    );

    return result.rows[0];
}

export default { getRoleById };
