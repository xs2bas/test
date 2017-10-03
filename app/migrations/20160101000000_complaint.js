migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "id":"INTEGER PRIMARY KEY",
            "title":"text",
            "description":"text",
            "date":"text",
            "modified":"text",
            "status":"text",
            "pictures":"text",
            "last_status": 'integer',
            'access_allowed': 'integer'
        }
    });
};

// why would you ever want to go down?   
migration.down = function(migrator) {};
