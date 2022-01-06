const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS name, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY name;
`;

const cohortName = process.argv[2] || 'JUL02';

const values = [cohortName];

pool.query(queryString, values)
.then(dbRes => {
  dbRes.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.name}`);
  })
})
.catch(dbErr => console.error('query error', dbErr.stack));