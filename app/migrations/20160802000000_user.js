migration.up = function(migrator) {
    migrator.db.execute('ALTER TABLE ' + migrator.table + ' ADD COLUMN corporation_email TEXT;');
};

// why would you ever want to go down?   
migration.down = function(migrator) {};
