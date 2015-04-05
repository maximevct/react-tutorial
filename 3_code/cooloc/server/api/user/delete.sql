DELETE FROM "User"
WHERE "id" = $1::INT
AND "id" != 1
RETURNING "id"
