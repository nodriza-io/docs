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
const cloudfront = new AWS.CloudFront()

const watch = require('node-watch')
const dir = require('node-dir')

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
	filter = []
	const tasks = {
		scanFiles: (callback) => {
			let files = []
			dirTree(appDir, {extensions:/\.html$/}, (file, PATH) => {
				files.push(file)
			})
			filter = []
			for (var i = 0; i < files.length; i++) {
				filter.push(files[i].path)
			}
			json = { manual: filter }
			callback()
		},
		writeJson: (callback) => {
			fs.writeFile(jsonPath, JSON.stringify(json, null, 2), (err) => {
				if (err) return callback(err)
				ok('JSON genetered indexing ' + filter.length)
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

	const opt = {
		// match: /.txt$/,
		exclude: /^\./
	}
	dir.readFiles(appDir, opt, function(err, content, callback) {
		if (err) return error(err)
		callback()
	},
	function(err, files){
		if (err) return error(err)
		// console.log('finished reading files:', files)
		async.timesLimit(files.length, 10, (i, callback) => {
			let file = files[i]
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
		if (name.slice(0, 1) === '.') return console.log('Skipping ' + name)
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
