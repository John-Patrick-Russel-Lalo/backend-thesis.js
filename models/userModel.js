import pool from "../database/db.js";

export async function findUserByProvider(provider, providerId) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE provider = $1
        AND provider_id = $2
        `,
        [provider, providerId]
    );

    return result.rows[0];
}

export async function createUser(user) {
    const result = await pool.query(
        `
        INSERT INTO users
        (
            provider,
            provider_id,
            email,
            username,
            display_name,
            avatar_url
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
            user.provider,
            user.providerId,
            user.email,
            user.username,
            user.displayName,
            user.avatar
        ]
    );

    return result.rows[0];
}

export async function findUserById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}


export async function deleteUserById(id) {
    await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
    );
}

