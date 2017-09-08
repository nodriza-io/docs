const env = require('node-env-file')
env('./env')
process.chdir('./manual') // <- Change dir to hack realive route for directory-tree
const fs = require('fs')
const async = require('async')
const PATH = require('path')
const colors = require('colors')
const dirTree = require('directory-tree')
const s3sync = require('s3-sync')
const AWS = require('aws-sdk')
const mime = require('mime')
const s3 = new AWS.S3()
const watch = require('node-watch')

const action = process.argv[2]

const appDir = './'
const jsonPath = appDir + 'index.json'

function ok (str) {
	console.log('> ' + str, '[ OK ]'.green)
}

function error (str) {
	console.log('> ' + str, '[ ERROR ]'.red)
}

function generateJson(callback) {
	let json
	let files = []
	const tasks = {
		scanFiles: (callback) => {
			dirTree(appDir, {extensions:/^(.*\.(?!(.DS_Store|git)$))?[^.]*$/i}, (file, PATH) => {
				files.push(file)
			})
			json = { index: files }
			callback()
		},
		writeJson: (callback) => {
			fs.writeFile(jsonPath, JSON.stringify(json, null, 2), (err) => {
				if (err) return callback(err)
				ok('JSON Index genetered')
				callback()
			})
		},	
	}
	async.series(tasks, (err, _results) => {
		if (err) return callback(err)
		callback(null, files)
	})
}

function uploadFiles(files, callback) {

	ok('Current upload Job: ' + files.length + ' files pending')

	async.timesLimit(files.length, 10, (i, callback) => {
		let file = files[i].path
		ok('Uploading -> ' + file)
		const fileStream = fs.createReadStream(file)
		const params = {
	    Bucket: process.env.BUCKET,
	    Key: file,
	    Body: fileStream,
	    ACL: 'public-read',
	    ContentType: mime.lookup(file)
		}
		s3.putObject(params, function(err, etag){
			if (err) return callback(err)
			ok('Done -> ' + file)
			callback()
		})
	}, (err) => {
		if (err) return callback(err)
		callback()
	})

}

if (action == 'upload') {

	var files = []
	const tasks = {
		generateJson: (callback) => {
			generateJson((err, _files) => {
				if (err) return callback(err)
				files = _files
				callback()
			})
		},
		uploadFiles: (callback) => {
			uploadFiles(files, (err) => {
				if (err) return callback(err)
				callback()
			})
		}
	}
	async.series(tasks, (err) => {
		if (err) return error(err)
		ok('Job Done, ' + files.length + ' files has been uploded successfully!')
	})

} else if (action == 'watch') {

	ok('Waiting for changes')

	watch('./', { recursive: true }, function(evt, name) {
		if (name != 'index.json') ok(name + ' -> Changed!')
		ok('Uploading: ' + name)
		var files = []
		const tasks = {
			generateJson: (callback) => {
				if (name == 'index.json') return callback() // Do not generate JSON index, or will loop
				generateJson(function(err, _files) {
					if (err) return callback(err)
					files = _files
					callback()
				})
			},
			uploadFiles: (callback) => {
				uploadFiles([{path: name}], function(err){
					if (err) return callback(err)
					callback()
				})
			}
		}
		async.series(tasks, (err, _results) => {
			if (err) return error(err)
			ok('Upload done')
			console.log('')
			ok('Waiting for changes')
		})
	})

} else {
	throw Error('You must specify an action e.g upload | watch')
}
