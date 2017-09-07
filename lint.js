const env = require('node-env-file')
env('./env')
const fs = require('fs')
const async = require('async')
const PATH = require('path')
const colors = require('colors')
// Change dir to allow directory-tree generate a relative path
process.chdir('./manual')
// console.log('->>> __dirname:', __dirname)
let appDir = './'
let jsonPath = appDir + 'index.json'
const dirTree = require('directory-tree')
let files = []
let json
const tasks = {
	generate: (callback) => {
		dirTree(appDir, {extensions:/\.html$/}, (file, PATH) => {
			files.push(file)
		})
		json = {index: files}
		callback()
	},
	writeJson: (callback) => {
		fs.writeFile(jsonPath, JSON.stringify(json, null, 2), function(err) {
			if (err) return callback(err)
			console.log('> Writing JSON', '[ OK ]'.green)
			callback()
		})
	},
	s3Sync: (callback) => {
		console.log('> Starting to sync files from: ' + __dirname + ' --> ' + process.env.BUCKET_MANUAL, '[ OK ]'.green)

		callback()
	}		
}
async.series(tasks, (err, _results) => {
	if (err) return console.error(err)
	console.log('--> Job Done!')
	// if (err) return callback(err)
	// callback()
})

// const tasks = {
// 	clearScreen: (callback) => {
// 		clear()
// 		console.log('********************************'.blue)
// 		console.log('*** NODRIZA MANUAL VALIDATOR ***'.blue)
// 		console.log('********************************\n'.blue)
// 		callback()
// 	},
// 	loadYaml: (callback) => {
// 		fs.readFile(yamlPath, function(err, _yaml) {
// 			if (err) return callback(err)
// 			console.log('> Loading YAML', '[ OK ]'.green)
// 			yaml = _yaml.toString()
// 			callback()
// 		})
// 	},
// 	// validateYaml: (callback) => {
// 	// 	yamlLint.lint(yaml).then(function () {
// 	// 		console.log('> Validating YAML', '[ OK ]'.green)
// 	// 		callback()
// 	// 	}).catch((err) => {
// 	// 	  callback(err)
// 	// 	})
// 	// },
// 	converToJson: (callback) => {
// 		// try {
// 			json = YAML.parse(yaml)
// 			console.log('> YAML to JSON', '[ OK ]'.green)
// 			callback()
// 		// } catch(e) {
// 		// 	callback(e)
// 		// }
		
// 	},
// 	xxx: (callback) => {


// 		let respuesta = findFiles(json.index)
// 		console.log('->>> respuesta:', respuesta)
// 		// callback()
// 			// console.log('->>> json:', Object.keys(json.index))
// 		// let res = findFiles('files', json.index)
// 			// console.log('->>> json:', json.index)
// 		// console.log(res)
// 		// try {
// 		// 	console.log('> Validating files', '[ OK ]'.green)
// 		// 	callback()
// 		// } catch(e) {
// 		// 	callback(e)
// 		// }
// 	},
// 	converingToJSON: (callback) => {
// 		fs.writeFile(jsonPath, JSON.stringify(json, null, 2), function(err) {
// 			if (err) return callback(err)
// 			console.log('> Writing JSON', '[ OK ]'.green)
// 			callback()
// 		})
// 	},
// 	// validatingIfFileExist: (callback) => {
// 	// 	console.log('> Coverting to JSON', '[ OK ]'.green)
// 	// 	fs.writeFile(jsonPath, JSON.stringify(json, null, 2), function(err) {
// 	// 		if (err) return callback(err)
// 	// 		console.log('> Writing JSON', '[ OK ]'.green)
// 	// 		callback()
// 	// 	})
// 	// },
// 	// s3Sync: (callback) => {
// 	// 	console.log('> Syncronizing changes', '[ OK ]'.green)
// 	// 	callback()
// 	// }
// }
// async.series(tasks, (err, _results) => {
// 	if (err) return console.log(err, '[ ERROR ]'.red)
// 	console.log('\n -> JOB DONE, WAITING FO CHANGES....'.blue)
// 	console.log('\n')
// })

// console.log(yaml)