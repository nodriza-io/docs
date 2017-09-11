const env = require('node-env-file')
env('./env/env')
const fs = require('fs')
const async = require('async')
const PATH = require('path')
const colors = require('colors')
const dirTree = require('directory-tree')
const AWS = require('aws-sdk')
const mime = require('mime')
const s3 = new AWS.S3(new AWS.Config({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY}))
const dir = require('node-dir')
const watch = require('node-watch')

const generateIndex = require('../config/generateIndex')
let uploads = 0

const distPath = process.env.SOURCE_DIR
const action = process.argv[2]

if (!process.env.BUCKET || !process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
	throw Error('No enviroment vars present, please: cp ./env/env.template to ./env/env and set variables.')
}

function ok (str) {
	console.log('> ' + str, '[ OK ]'.green)
}

function error (str) {
	console.log('> ' + str, '[ ERROR ]'.red)
}

function uploadFiles(callback) {

	let files
	const opt = {
		// match: /.txt$/,
		exclude: /^\./
	}
	dir.readFiles(distPath, opt, function(err, content, cb) {
		if (err) return error(err)
		cb()
	}, (err, _files) => {
		if (err) return error(err)
		files = _files
		ok('Current upload Job: ' + files.length + ' files in queue')
		async.timesLimit(files.length, parseInt(process.env.PARALLEL), (i, callback) => {
			let file = files[i]
			const size = fs.statSync(file).size
			let key = file.slice(distPath.length + 1, file.length)
			var params = {
		    Bucket: process.env.BUCKET,
		    Key: key
			}
			s3.headObject(params, function(err, data) {
				// Check if file exist or modified
				if (data && data.ContentLength === size) {
					ok('Notihng changed, skipping -> ' + file)
					return callback()
				}
				ok('Uploading -> ' + file.blue + ' Size: ' + parseInt(size / 1024) + ' KB\'s')
				let key = file.slice(distPath.length + 1, file.length)
				const fileStream = fs.createReadStream(file)
				var params = {
			    Bucket: process.env.BUCKET,
			    Key: key,
			    Body: fileStream,
			    ACL: process.env.ACL,
			    ContentType: mime.lookup(file)
				}
				s3.putObject(params, (err, etag) => {
					if (err) return error(err.message)
					uploads++
					ok('Done -> ' + 'https://s3.amazonaws.com/' + process.env.BUCKET + '/' + key)
					callback()
				})
			}, (err) => {
				if (err) return callback(err)
				callback(null, files)
			})
		})
	})
}

if (action == 'upload') {
	var files
	const tasks = {
		uploadFiles: (callback) => {
			uploadFiles((err, _files) => {
				if (err) return callback(err)
				files = _files
				callback()
			})
		}
	}
	async.series(tasks, (err) => {
		if (err) return error(err)
		ok('Job Done, ' + uploads + ' files has been uploded, ' + (files.length - uploads) + ' has no changes.')
	})

} else if (action == 'watch') {

	ok('Waiting for changes')
	watch('./static/html', { recursive: true }, function(evt, name) {
		if (name != 'index.json') ok(name + ' -> Changed!')
		if (name.slice(0, 1) === '.') return console.log('Skipping ' + name)
		ok('Uploading: ' + name)
		var files = []
		const tasks = {
			generateJson: (callback) => {
				if (name == 'index.json') return callback() // Do not generate JSON index, or will loop
				generateIndex((err, success) => {
					if (err) return callback(err)
					console.log(success)
					callback()
				})
			},
			// uploadFiles: (callback) => {
			// 	uploadFiles([{path: name}], function(err){
			// 		if (err) return callback(err)
			// 		callback()
			// 	})
			// }
		}
		async.series(tasks, (err, _results) => {
			if (err) return error(err)
			console.log('')
			ok('Waiting for changes')
		})
	})

} else {
	throw Error('No action specified :(')
}
