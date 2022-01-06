const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id AS id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2
`;

const cohortMonth = process.argv[2];
const limit = process.argv[3] || 5;

const values = [`%${cohortMonth}%`, limit];

pool.query(queryString, values)
.then(dbRes => {
  dbRes.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
})
.catch(dbErr => console.error('query error', dbErr.stack));