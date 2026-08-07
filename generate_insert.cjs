const fs = require('fs');

const games = JSON.parse(fs.readFileSync('public/games.json', 'utf8'));

let sql = `INSERT INTO games (id, title, platform, image, genres, description, price, year, developer, publisher, req_min, req_rec, trailer, link, is_parted) VALUES\n`;

const values = games.map(g => {
  const escapeSql = (val) => {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  return `(
    ${escapeSql(g.id)},
    ${escapeSql(g.title)},
    ${escapeSql(g.platform)},
    ${escapeSql(g.image)},
    ${escapeSql(g.genres)},
    ${escapeSql(g.description)},
    ${escapeSql(g.price)},
    ${escapeSql(g.year)},
    ${escapeSql(g.developer)},
    ${escapeSql(g.publisher)},
    ${escapeSql(g.req_min)},
    ${escapeSql(g.req_rec)},
    ${escapeSql(g.trailer)},
    ${escapeSql(g.link)},
    ${escapeSql(g.is_parted)}
  )`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('insert_data.sql', sql);
console.log('insert_data.sql generated!');
