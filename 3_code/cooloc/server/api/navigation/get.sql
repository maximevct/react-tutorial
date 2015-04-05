WITH user_right AS (
  SELECT
    MIN("level") AS "level"
  FROM (
    SELECT "Right"."level"
    FROM "Right"
    WHERE "name" LIKE('Anonymous')

    UNION ALL

    SELECT "Right"."level"
    FROM "Right"
    INNER JOIN "User" ON  "User"."id_right"  = "Right"."id"
                     AND  "User"."token" LIKE($1)
  ) AS users
)


SELECT
  "Navigation"."url",
  "Navigation"."icon_name",
  "Navigation"."name"
FROM "Navigation_Right"
INNER JOIN user_right  ON user_right."level"  = "Navigation_Right"."level_right"
INNER JOIN "Navigation" ON "Navigation"."id"  = "Navigation_Right"."id_navigation"
ORDER BY "Navigation_Right"."order"
