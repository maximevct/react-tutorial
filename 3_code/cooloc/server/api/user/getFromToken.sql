SELECT
  "User"."id",
  "User"."username",
  "User"."email",
  "User"."date_last_connect",
  "User"."date_subscribed",
  "User"."token",
  "Right"."name" AS "right"
FROM "User"
INNER JOIN "Right" ON "User"."id_right" = "Right"."id"
WHERE "token" LIKE($1::TEXT)
