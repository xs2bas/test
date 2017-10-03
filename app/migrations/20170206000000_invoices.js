migration.up = function(migrator) {
    migrator.db.execute('ALTER TABLE ' + migrator.table + ' ADD COLUMN translated_period_en TEXT;');
};

// why would you ever want to go down?   
migration.down = function(migrator) {};
