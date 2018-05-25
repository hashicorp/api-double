module.exports = (
    function(load)
    {
        return load.then(
            function(builder)
            {
                return builder.build(
                    __dirname + "/container.yaml"
                );
            }
        ).catch(
            function(e)
            {
                console.error(e);
            }
        );
    }
)(require("@gardenhq/o/builder.js")(function(o){return o(require)}));

