require("fs").readdirSync("./src").forEach(function(file) {
    require("./src/" + file);
});