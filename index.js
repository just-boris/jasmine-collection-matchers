require("fs").readdirSync(__dirname + "/src").forEach(function(file) {
    require(__dirname + "/src/" + file);
});
