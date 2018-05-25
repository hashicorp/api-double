module.exports = function(app, port = 3000, dir = "./") {
	app.listen(
		port,
		function() {
			console.log(`Listening on port ${port}, using ${dir}`);
		}
	);
}
