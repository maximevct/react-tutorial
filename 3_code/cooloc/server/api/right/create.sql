/**
 * TODO : Add verification to test if user already exists
 */

INSERT INTO "Right"
("name"   , "level") VALUES
($1::TEXT , $2::INT)
RETURNING *
