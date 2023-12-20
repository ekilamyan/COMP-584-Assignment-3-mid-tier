import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'example',
    database: 'assign',
    port: "13313"
}).promise()


export async function getBusinessBy(term, city, state, open, sortingMethod) {
    let query = `SELECT * FROM business WHERE `;
    let queryArray = [];

    if (term != 'null') {
        queryArray.push(`(name LIKE '%${term}%' OR categories LIKE '%${term}%')`)
    }
    if (city != 'null') {
        queryArray.push(`(city LIKE '%${city}%' OR postal_code LIKE '%${city}%')`)
    }
    if (state != 'null') {
        queryArray.push(`(state = '${state}')`)
    }
    if (open == 'open') {
        queryArray.push(`(is_open = '1')`)
    }

    for (let i = 0; i < queryArray.length; i++) {
        query = query + queryArray[i]
        if (i < queryArray.length - 1) {
            query = query + ' AND '
        }
    }

    if (sortingMethod == 'stars') {
        query = query + `ORDER BY stars DESC`
    }
    else if (sortingMethod == 'reviews') {
        query = query + `ORDER BY review_count DESC`
    }

    query = query + ` LIMIT 50`


    const [rows] = await pool.query(query);
    return rows
}

export async function getTenBusiness() {
    const [rows] = await pool.query("SELECT * FROM business LIMIT 10");
    return rows
}
