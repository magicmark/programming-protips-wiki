module.exports = function (plop) {
    // controller generator
    plop.setGenerator('new package', {
        description: 'create a new protip',
        prompts: [{
            type: 'input',
            name: 'slug',
            message: 'shortname of the protip (used for the filename and slug)'
        }],
        actions: [{
            type: 'add',
            path: './protips/{{slug}}.md',
            templateFile: 'plop-templates/protip.md'
        }]
	});
	
};
