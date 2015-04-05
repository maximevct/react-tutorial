BEGIN;

/**
 * Delete existing schema and create a new one
 */
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE FUNCTION make_token() RETURNS text AS $$
DECLARE
    new_token text;
    done bool;
BEGIN
    done := false;
    WHILE NOT done LOOP
        new_token := md5(''||now()::text||random()::text);
        done := NOT exists(SELECT 1 FROM "User" WHERE token=new_token);
    END LOOP;
    RETURN new_token;
END;
$$ LANGUAGE PLPGSQL VOLATILE;

CREATE TABLE "Right" (
  "id"    SERIAL        NOT NULL,
  "name"  VARCHAR(255)  NOT NULL,
  "level" INT2          NOT NULL,
  CONSTRAINT "Right_UK" UNIQUE       ("name"),
  CONSTRAINT "Right_PK" PRIMARY KEY  ("id")
);

INSERT INTO "Right"
("name"         , "level") VALUES
('Administrator', 0),
('User'         , 1),
('Anonymous'    , 2)
;

CREATE TABLE "Navigation" (
  "id"        SERIAL        NOT NULL,
  "url"       VARCHAR(255)  NOT NULL DEFAULT '/index',
  "name"     VARCHAR(255)  NOT NULL,
  "icon_name" VARCHAR(255)  NOT NULL DEFAULT 'file',
  CONSTRAINT "Navigation_PK" PRIMARY KEY ("id")
);

INSERT INTO "Navigation"
("id", "url"      , "name"     , "icon_name") VALUES
(1   , '/'        , 'Index'    , 'dashboard'),
(2   , '/login'   , 'Login'    , 'user'     ),
(3   , '/logout'  , 'Logout'   , 'power-off'),
(4   , '/'        , 'Dashboard', 'dashboard'),
(5   , '/admin'   , 'Admin'    , 'wrench'   ),
(6   , '/signin'  , 'SignIn'   , 'edit'     )
;

CREATE TABLE "Navigation_Right" (
  "id"            SERIAL  NOT NULL,
  "id_navigation" INT2    NOT NULL REFERENCES "Navigation" ("id"),
  "level_right"   INT2    NOT NULL,
  "order"         INT2    NOT NULL DEFAULT 1,
  CONSTRAINT "Navigation_Right_PK" PRIMARY KEY ("id")
);

INSERT INTO "Navigation_Right"
("id_navigation", "level_right", "order") VALUES
/*
  id    pages
  1     Index
  2     Login
  3     Logout
  4     Dashboard
  5     Admin
  6     SignIn
*/
/* Admins */
( 4             , 0             , 1      ),
( 5             , 0             , 2      ),
( 3             , 0             , 3      ),
/* Users signed in */
( 4             , 1             , 1      ),
( 3             , 1             , 2      ),
/* Users unsigned */
( 1             , 2             , 1      ),
( 6             , 2             , 2      ),
( 2             , 2             , 3      )
;

CREATE TABLE "Address" (
  "id" SERIAL NOT NULL,
  "street_name"   VARCHAR(255)  NOT NULL DEFAULT '',
  "street_number" VARCHAR(50)   NOT NULL DEFAULT '',
  "postal_code"   VARCHAR(50)   NOT NULL DEFAULT '',
  "city"          VARCHAR(255)  NOT NULL DEFAULT '',
  CONSTRAINT "Address_PK" PRIMARY KEY ("id")
);

INSERT INTO "Address"
("street_name") VALUES
('')
;

CREATE TABLE "Building" (
  "id"          SERIAL      NOT NULL,
  "name"        VARCHAR(50) NOT NULL DEFAULT '',
  "id_address"  INT2        NOT NULL REFERENCES "Address" ("id"),
  CONSTRAINT "Building_UK" UNIQUE       ("id_address"),
  CONSTRAINT "Building_PK" PRIMARY KEY  ("id")
);

INSERT INTO "Building"
("name"           , "id_address") VALUES
('admin_building' , 1           )
;

CREATE TABLE "Flat" (
  "id"          SERIAL      NOT NULL,
  "name"        VARCHAR(50) NOT NULL DEFAULT '',
  "id_building" INT2        NOT NULL REFERENCES "Building" ("id"),
  CONSTRAINT "Flat_UK" UNIQUE       ("id_building", "name"),
  CONSTRAINT "Flat_PK" PRIMARY KEY  ("id")
);

INSERT INTO "Flat"
("name"       , "id_building") VALUES
('admin_flat' , 1            )
;

CREATE TABLE "Roommate" (
  "id"      SERIAL      NOT NULL,
  "name"    VARCHAR(50) NOT NULL,
  "id_flat" INT2        NOT NULL REFERENCES "Flat" ("id"),
  CONSTRAINT "Roommate_UK" UNIQUE       ("id_flat", "name"),
  CONSTRAINT "Roommate_PK" PRIMARY KEY  ("id")
);

INSERT INTO "Roommate"
("name"         , "id_flat") VALUES
('admin_roomate', 1        )
;

CREATE TABLE "Task" (
  "id"          SERIAL      NOT NULL,
  "name"        VARCHAR(50) NOT NULL,
  "id_roommate" INT2        NOT NULL REFERENCES "Roommate" ("id"),
  CONSTRAINT "Task_UK" UNIQUE      ("name", "id_roommate"),
  CONSTRAINT "Task_PK" PRIMARY KEY ("id")
);

CREATE TABLE "Roommate_task" (
  "id"          SERIAL    NOT NULL,
  "id_task"     INT2      NOT NULL REFERENCES "Task" ("id"),
  "date"        TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "periodicity" INT2      NOT NULL DEFAULT 0,
  CONSTRAINT "Roommate_task_UK" UNIQUE      ("id_task", "date"),
  CONSTRAINT "Roommate_task_PK" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
  "id"                SERIAL        NOT NULL,
  "username"          VARCHAR(50)   NOT NULL,
  "email"             VARCHAR(50)   NOT NULL UNIQUE,
  "password"          VARCHAR(50)   NOT NULL,
  "token"             VARCHAR(255)  NOT NULL DEFAULT make_token(),
  "date_subscribed"   TIMESTAMP     NOT NULL DEFAULT current_timestamp,
  "date_last_connect" TIMESTAMP     NOT NULL DEFAULT current_timestamp,
  "id_roommate"       INT2          NOT NULL REFERENCES "Roommate"  ("id"),
  "id_right"          INT2          NOT NULL REFERENCES "Right"     ("id") DEFAULT (2),
  CONSTRAINT "User_Mail_UK"      UNIQUE      ("email"),
  CONSTRAINT "User_Username_UK"  UNIQUE      ("username"),
  CONSTRAINT "User_PK"           PRIMARY KEY ("id")
);

INSERT INTO "User"
("username", "email"              , "password"                                 , "id_roommate", "id_right" ) VALUES
('twiggeek', 'twiggeek@gmail.com' , '7c4a8d09ca3762af61e59520943dc26494f8941b' , 1            , 1          ) /* 123456 */
;

CREATE TABLE "Task_user" (
  "id" SERIAL NOT NULL,
  "id_roommate_task" INT2 NOT NULL REFERENCES "Roommate_task" ("id"),
  "id_user" INT2 NOT NULL REFERENCES "User" ("id"),
  CONSTRAINT "Task_user_PK" PRIMARY KEY ("id")
);

CREATE TABLE "Message" (
  "id"            SERIAL    NOT NULL,
  "id_user_from"  INT2      NOT NULL REFERENCES "User" ("id"),
  "id_user_to"    INT2      NOT NULL REFERENCES "User" ("id"),
  "date_send"     TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "date_read"     TIMESTAMP DEFAULT NULL,
  "text"          TEXT      NOT NULL,
  CONSTRAINT "Message_PK" PRIMARY KEY ("id")
);

CREATE TABLE "Purchase_type" (
  "id"            SERIAL        NOT NULL,
  "name"          VARCHAR(100)  NOT NULL,
  "date_created"  TIMESTAMP     NOT NULL DEFAULT current_timestamp,
  "date_updated"  TIMESTAMP     NOT NULL DEFAULT current_timestamp,
  CONSTRAINT "Purchase_type_UK" UNIQUE      ("name"),
  CONSTRAINT "Purchase_type_PK" PRIMARY KEY ("id")
);

CREATE TABLE "Purchase" (
  "id"                SERIAL        NOT NULL,
  "id_purchase_type"  INT2          NOT NULL REFERENCES "Purchase_type" ("id"),
  "description"       VARCHAR(255)  NOT NULL DEFAULT '',
  "price"             DECIMAL       NOT NULL DEFAULT 0,
  "id_user"           INT2          NOT NULL REFERENCES "User" ("id"),
  CONSTRAINT "Purchase_price_positive" CHECK("price" > 0),
  CONSTRAINT "Purchase_PK" PRIMARY KEY ("id")
);

COMMIT;
