module.exports = function(getVars, TemplateLiteral, fake, seed)
{
    if(typeof seed === "undefined") {
        seed = fake.random.number();
    } else {
        seed = parseInt(seed);
    }
    return function(vars)
    {
        const template = new TemplateLiteral(vars.content.toString());
        fake.seed(seed);
        const result = template.render(
            getVars(
                Object.assign(
                    {
                        fake: fake
                    },
                    vars
                )
            )
        );
        fake.seed(seed);
        return result;
    }
}
