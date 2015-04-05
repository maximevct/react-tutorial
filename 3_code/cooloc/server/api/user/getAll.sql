SELECT
  "User"."id",
  "User"."username",
  "User"."email",
  "User"."date_last_connect",
  "User"."date_subscribed",
  "Right"."name"  AS "right",
  "Right"."id"    AS "id_right"
FROM "User"
INNER JOIN "Right" ON "User"."id_right" = "Right"."id"
ORDER BY "User"."date_subscribed"
