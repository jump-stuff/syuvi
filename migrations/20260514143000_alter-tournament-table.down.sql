-- 1. Recreate original table
CREATE TABLE tournament_old (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    class TEXT NOT NULL,
    diamond_map TEXT,
    plat_gold_map TEXT NOT NULL,
    silver_map TEXT NOT NULL,
    bronze_map TEXT NOT NULL,
    steel_map TEXT NOT NULL,
    wood_map TEXT,
    starts_at DATETIME NOT NULL,
    ends_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Copy data back, collapsing plat/gold back to plat_gold_map
INSERT INTO tournament_old (id, class, diamond_map, plat_gold_map, silver_map, bronze_map, steel_map, wood_map, starts_at, ends_at, created_at)
SELECT id, class, diamond_map, platinum_map, silver_map, bronze_map, steel_map, wood_map, starts_at, ends_at, created_at
FROM tournament;

-- 3. Swap tables
DROP TABLE tournament;
ALTER TABLE tournament_old RENAME TO tournament;