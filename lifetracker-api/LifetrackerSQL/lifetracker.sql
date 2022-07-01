\echo 'Delete and recreate the Lifetracker database?'
\prompt 'Press ENTER for yes or CTRL-C to cancel > ' answer
 
DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker
 
\i lifetracker-schema.sql