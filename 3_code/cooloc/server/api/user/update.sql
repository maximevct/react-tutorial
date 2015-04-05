

WITH updated_user AS (
  UPDATE "User"
  SET
    "username"  = $2::VARCHAR,
    "email"     = $3::VARCHAR,
    "password"  = $4::VARCHAR,
    "id_right"  = $5::INT
  WHERE "id" = $1::INT
  RETURNING *
)

SELECT
  updated_user."id",
  updated_user."username",
  updated_user."email",
  updated_user."date_last_connect",
  updated_user."date_subscribed",
  "Right"."name" AS "right"
FROM updated_user
INNER JOIN "Right" ON updated_user."id_right" = "Right"."id"
