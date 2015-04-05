/**
 * TODO : Add verification to test if user already exists
 */

WITH inserted_user AS (
  INSERT INTO "User"
  ("username"     , "email"     , "password"     , "id_roommate", "id_right" ) VALUES
  (:username::TEXT, :email::TEXT, :password::TEXT, 1            , :id_right  )
  RETURNING *
)

SELECT
  inserted_user."id",
  inserted_user."username",
  inserted_user."email",
  inserted_user."date_last_connect",
  inserted_user."date_subscribed",
  inserted_user."token",
  "Right"."name" AS "right"
FROM inserted_user
INNER JOIN "Right" ON inserted_user."id_right" = "Right"."id"
