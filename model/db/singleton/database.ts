import sqlite3 from "sqlite3";
import {open} from "sqlite"

const createScript: string = `
  CREATE TABLE if not exists rolesGroups
  (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    icon VARCHAR(25) NOT NULL,
    name VARCHAR(16) UNIQUE
  );

  INSERT INTO rolesGroups (id, name, icon)
  VALUES (1, 'visitor', 'iconamoon:home-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'visitor';

  INSERT INTO rolesGroups (id, name, icon)
  VALUES (2, 'user', 'mingcute:group-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'user';

  INSERT INTO rolesGroups (id, name, icon)
  VALUES (3, 'admin', 'ic:round-local-police')
  ON CONFLICT(id) DO UPDATE SET name = 'admin';

  CREATE TABLE if not exists roles
  (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(16) UNIQUE,
    icon VARCHAR(25) NOT NULL
  );

  INSERT INTO roles (id, name, icon)
  VALUES (1, 'visitor', 'iconamoon:home-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'visitor';

  INSERT INTO roles (id, name, icon)
  VALUES (2, 'user', 'mingcute:group-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'user';

  INSERT INTO roles (id, name, icon)
  VALUES (3, 'admin', 'ic:round-local-police')
  ON CONFLICT(id) DO UPDATE SET name = 'admin';

  CREATE TABLE if not exists rolesRolesGroups
  (
    roleId      INTEGER NOT NULL,
    roleGroupId INTEGER NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles (id),
    FOREIGN KEY (roleGroupId) REFERENCES rolesGroups (id),
    PRIMARY KEY (roleId, roleGroupId)
  );

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (1, 1)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (2, 1)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (2, 2)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (3, 1)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (3, 2)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  INSERT INTO rolesRolesGroups (roleId, roleGroupId)
  VALUES (3, 3)
  ON CONFLICT(roleId, roleGroupId) DO NOTHING;

  CREATE TABLE if not exists users
  (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    mail     VARCHAR(320) UNIQUE,
    name     VARCHAR(16)  NOT NULL,
    password VARCHAR(60)  NOT NULL
  );

  CREATE TABLE if not exists usersRoles
  (
    userId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles (id),
    FOREIGN KEY (userId) REFERENCES users (id),
    PRIMARY KEY (roleId, userId)
  );

  CREATE TABLE if not exists tokens
  (
    userId       INTEGER PRIMARY KEY,
    refreshToken VARCHAR(64) DEFAULT NULL,
    accessToken  VARCHAR(64) DEFAULT NULL,
    expireDate   DATE        DEFAULT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
  );

  CREATE TABLE if not exists favorites
  (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR(16) NOT NULL,
    icon       VARCHAR(25) NOT NULL,
    vueName    VARCHAR(40) NOT NULL,
    moduleId   INTEGER     NOT NULL,
    settingsId INTEGER     NOT NULL
  );

  CREATE TABLE if not exists pagesGroups
  (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR(16)   NOT NULL,
    uri      VARCHAR(16)   NOT NULL,
    icon     VARCHAR(25)   NOT NULL
  );

  INSERT INTO pagesGroups (id, uri, name, icon)
  VALUES (1, 'visitor', 'Visitor', 'iconamoon:home-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'Visitor';

  INSERT INTO pagesGroups (id, uri, name, icon)
  VALUES (2, 'user', 'User', 'mingcute:group-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'User';

  INSERT INTO pagesGroups (id, uri, name, icon)
  VALUES (3, 'admin', 'Admin', 'iconamoon:home-fill')
  ON CONFLICT(id) DO UPDATE SET name = 'Admin';

  CREATE TABLE if not exists pages
  (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR(16)   NOT NULL,
    uri      VARCHAR(16)   UNIQUE,
    icon     VARCHAR(25)   NOT NULL,
    markdown TEXT NOT NULL
  );

  CREATE TABLE if not exists pagesPagesGroups
  (
    pageId      INTEGER NOT NULL,
    pageGroupId INTEGER NOT NULL,
    FOREIGN KEY (pageId) REFERENCES pagesGroups (id),
    FOREIGN KEY (pageGroupId) REFERENCES pagesGroups (id),
    PRIMARY KEY (pageId, pageGroupId)
  );

  CREATE TABLE if not exists pagesRoles
  (
    pageId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    FOREIGN KEY (pageId) REFERENCES pagesGroups (id),
    FOREIGN KEY (roleId) REFERENCES roles (id),
    PRIMARY KEY (pageId, roleId)
  );

  CREATE TABLE if not exists pagesGroupsRolesGroups
  (
    pageGroupId INTEGER NOT NULL,
    roleGroupId INTEGER NOT NULL,
    FOREIGN KEY (pageGroupId) REFERENCES pagesGroups (id),
    FOREIGN KEY (roleGroupId) REFERENCES rolesGroups (id),
    PRIMARY KEY (pageGroupId, roleGroupId)
  );

  CREATE TABLE if not exists pagesRolesGroups
  (
    pageId      INTEGER NOT NULL,
    roleGroupId INTEGER NOT NULL,
    FOREIGN KEY (pageId) REFERENCES pages (id),
    FOREIGN KEY (roleGroupId) REFERENCES rolesGroups (id),
    PRIMARY KEY (pageId, roleGroupId)
  );

  CREATE TABLE if not exists pagesGroupsRoles
  (
    pageGroupId INTEGER NOT NULL,
    roleId      INTEGER NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles (id),
    FOREIGN KEY (pageGroupId) REFERENCES pagesGroups (id),
    PRIMARY KEY (pageGroupId, roleId)
  );
`

export const dbGetInstance = (() => {
  const databaseFile = `./db.db`
  let isRunning = false
  let db

  return async () => {
    if (!isRunning) {
      db = await open({
        filename: databaseFile,
        driver: sqlite3.Database
      })
      await db.exec(createScript)
      isRunning = true
    }

    return db
  }
})()